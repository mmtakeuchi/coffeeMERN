const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Product",
      },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
      image: { type: String },
    },
  ],
  bill: {
    type: Number,
    required: true,
    default: 0,
  },
  date_added: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Cart = mongoose.model("Cart", CartSchema);
