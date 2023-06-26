const express = require("express");
const router = express.Router();
const favoriteItem = require("../models/favoriteItem");

// ADD item to favorites
router.post("/", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const newFavoriteItem = new favoriteItem({
    userId: userId,
    productId: productId,
  });

  try {
    const savedFavoriteItem = await newFavoriteItem.save();
    res.status(200).json(savedFavoriteItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE item from favorites
router.delete("/:favoriteItemId", async (req, res) => {
  try {
    await favoriteItem.findByIdAndDelete(req.params.favoriteItemId);
    res.status(200).json("Item has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET user favorites
router.get("/:userId", async (req, res) => {
  try {
    const cart = await favoriteItem.find({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
