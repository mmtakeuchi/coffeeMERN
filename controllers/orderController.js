const Order = require("../models/Order");
const Cart = require("../models/Cart");
const User = require("../models/User");
const keys = require("../config/keys");
const stripe = require("stripe")(keys.stripeKey);

module.exports.getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  console.log(order);
  if (order) {
    res.send(order);
  } else {
    res.status(400).send({ message: "No order was found." });
  }
};

module.exports.checkout = async (req, res) => {
  try {
    const { source } = req.body;
    const userId = req.params.id;
    let user = await User.findById(userId);
    let cart = await Cart.findById(userId);

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
          userId,
          products: cart.items,
          bill: cart.bill,
        });
        const data = await Cart.findByIdAndDelete(card.id);
        return res.status(201).send(order);
      }
    } else {
      res.status(500).send({ message: "Could not retrieve cart." });
    }
  } catch (err) {
    res.status(500).send("Something went wrong with checking out.");
  }
};
