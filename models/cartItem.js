const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  productId: {
    type: Number,
    required: true,
  },

  quantity: {
    type: Number,
    default: 1,
    required: true,
  },
});

module.exports = mongoose.model("CartItem", cartItemSchema);
