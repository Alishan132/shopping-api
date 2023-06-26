const mongoose = require("mongoose");

const favoriteItemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },

  productId: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("FavoriteItem", favoriteItemSchema);
