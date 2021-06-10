const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Cart",
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0.0,
  },
  date_added: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Order = mongoose.model("Order", OrderSchema);
