const Product = require("../models/Product");
const { cloudinary } = require("../cloudinary/index");

module.exports.getProducts = async (req, res) => {
  const products = await Product.find({}).sort({ date: -1 });

  res.json(products);
};

module.exports.addProduct = async (req, res) => {
  const product = new Product(req.body);

  if (req.body.image !== "") {
    const file = req.body.image;

    const uploadedResponse = await cloudinary.uploader.upload(file, {
      upload_preset: "x4argbkt",
    });

    if (!uploadedResponse) {
      return res.status(500).json("Could not upload image.");
    } else {
      product.image = uploadedResponse.secure_url;
    }
  }

  const newProduct = await product.save();

  if (newProduct) {
    return res.status(201).json(newProduct);
  }
  return res.status(500).send({ message: " Error in Creating Product." });
};

module.exports.showProduct = async (req, res) => {
  const product = await Product.findOne({ _id: req.params.id });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product Not Found." });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const update = req.body;
    const query = { _id: productId };

    const updatedProduct = await Product.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      product: updatedProduct,
      message: "Product has been updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
};

module.exports.deleteProduct = async (req, res) => {
  const deletedProduct = await Product.findById(req.params.id);

  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ message: "Product Deleted" });
  } else {
    res.send("Error in Deletion.");
  }
};
