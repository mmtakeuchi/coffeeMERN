const Cart = require("../models/Cart");
const Product = require("../models/Product");

module.exports.getCartItems = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (cart && cart.products.length > 0) {
      res.send(cart);
    } else {
      res.send(null);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

module.exports.addCartItem = async (req, res) => {
  const userId = req.user._id;
  const { productId, count } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });
    let item = await Product.findOne({ _id: productId });

    if (!item) {
      res.status(404).send("Item not found!");
    }
    const price = item.price;
    const title = item.title;
    const image = item.image;

    if (cart) {
      // if cart exists for the user
      cart.products.map((p) => console.log(p.product._id == productId));
      let itemIndex = cart.products.findIndex(
        (p) => p.product._id == productId
      );

      // Check if product exists or not
      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];

        productItem.quantity += parseInt(count);
        cart.products[itemIndex] = productItem;
      } else {
        cart.products.push({
          product: item._id,
          title,
          quantity: parseInt(count),
          price,
          image,
        });
      }
      cart.bill += parseInt(count) * price;
      cart.bill = parseFloat(cart.bill.toFixed(2));
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      // no cart exists, create one
      const newCart = await Cart.create({
        user: userId,
        products: [
          {
            product: productId,
            title,
            quantity: parseInt(count),
            price,
            image,
          },
        ],
        bill: parseFloat((parseInt(count) * price).toFixed(2)),
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

module.exports.deleteItem = async (req, res) => {
  const userId = req.user._id;
  const productId = req.params.productId;

  try {
    let cart = await Cart.findOne({ user: userId });

    let itemIndex = cart.products.findIndex((p) => p.product._id == productId);
    if (itemIndex > -1) {
      let productItem = cart.products[itemIndex];
      cart.bill -= parseFloat(productItem.quantity * productItem.price).toFixed(
        2
      );
      cart.products.splice(itemIndex, 1);
    }
    cart = await cart.save();

    return res.status(201).send(cart);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};
