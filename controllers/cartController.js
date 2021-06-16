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
    console.log(err);
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

    if (cart) {
      // if cart exists for the user
      cart.products.map((p) => console.log(p.product._id == productId));
      let itemIndex = cart.products.findIndex(
        (p) => p.product._id == productId
      );
      console.log(itemIndex);

      // Check if product exists or not
      if (itemIndex > -1) {
        let productItem = cart.products[itemIndex];
        console.log(productItem);
        productItem.quantity += count;
        cart.products[itemIndex] = productItem;
      } else {
        cart.products.push({
          product: productId._id,
          title,
          quantity: count,
          price,
        });
      }
      cart.bill += count * price;
      cart = await cart.save();
      return res.status(201).send(cart);
    } else {
      // no cart exists, create one
      const newCart = await Cart.create({
        user: userId,
        products: [{ product: productId._id, title, quantity: count, price }],
        bill: count * price,
      });
      return res.status(201).send(newCart);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

module.exports.deleteItem = async (req, res) => {
  console.log(req.user, req.params);
  const userId = req.user._id;
  const productId = req.params.productId;

  try {
    let cart = await Cart.findOne({ user: userId });
    console.log(cart);
    let itemIndex = cart.products.findIndex((p) => p.product._id == productId);
    if (itemIndex > -1) {
      let productItem = cart.products[itemIndex];
      cart.bill -= productItem.quantity * productItem.price;
      cart.products.splice(itemIndex, 1);
    }
    cart = await cart.save();
    return res.status(201).send(cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};
