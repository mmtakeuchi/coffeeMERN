const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeKey);

module.exports.getOrders = async (req, res) => {
  const userId = req.params.id;
  const orders = await Order.find({ user: userId });

  console.log(orders);
  if (orders) {
    res.send(orders);
  } else {
    res.status(400).send({ message: "No order was found." });
  }
};

module.exports.checkout = async (req, res) => {
  try {
    console.log(req.user);
    console.log(req.body);
    console.log(req.params.id);
    const { source } = req.body;
    const userId = req.params.id;
    let user = await User.findOne({ _id: userId });
    let cart = await Cart.findOne({ user: userId });

    console.log(user, cart);

    if (cart) {
      const charge = await stripe.charges.create({
        amount: cart.bill * 100,
        currency: "usd",
        source: source,
        receipt_email: user.email,
      });
      if (!charge) throw Error("Payment failed.");
      if (charge) {
        const order = await Order.create({
          user: userId,
          cart: cart._id,
          products: cart.products.map((product) => ({
            product: product._id,
            title: product.title,
            quantity: product.quantity,
            price: product.price,
            image: product.image,
          })),
          totalPrice: cart.bill,
        });
        console.log(order);
        const data = await Cart.findByIdAndDelete({ _id: cart.id });
        return res.status(201).send(order);
      }
    } else {
      res.status(500).send({ message: "Could not retrieve cart." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong with checking out.");
  }
};
