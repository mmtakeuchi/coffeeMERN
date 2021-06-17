const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeKey);

module.exports.getOrders = async (req, res) => {
  const userId = req.params.id;
  const order = await Order.find({ userId });

  if (order) {
    res.send(order);
  } else {
    res.status(400).send({ message: "No order was found." });
  }
};

module.exports.checkout = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.params);
    const { source } = req.body;
    const userId = req.params.id;
    let user = await User.findOne({ userId });
    let cart = await Cart.findOne({ _id: userId });
    console.log(user, cart);

    if (cart) {
      const charge = await stripe.charges.create({
        amount: cart.bill,
        currency: "usd",
        source: source,
        receipt_email: user.email,
      });
      if (!charge) throw Error("Payment failed.");
      if (charge) {
        const order = await Order.create({
          user: userId,
          products: cart.products,
          bill: cart.bill,
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
