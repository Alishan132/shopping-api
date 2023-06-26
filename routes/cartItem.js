const express = require("express");
const router = express.Router();
const CartItem = require("../models/cartItem");

// ADD item to cart
router.post("/", async (req, res) => {
  const { userId, productId, quantity } = req.body;

  const cartItem = new CartItem({
    userId: userId,
    productId: productId,
    quantity: quantity,
  });

  try {
    const savedCartItem = await cartItem.save();
    res.status(200).json(savedCartItem);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE cart item quantity
router.put("/:cartItemId", async (req, res) => {
  const { quantity } = req.body;

  try {
    const updatedCart = await CartItem.findByIdAndUpdate(
      req.params.cartItemId,
      { $set: { quantity } },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE item from cart
router.delete("/:cartItemId", async (req, res) => {
  try {
    await CartItem.findByIdAndDelete(req.params.cartItemId);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET user cart
router.get("/:userId", async (req, res) => {
  try {
    const cart = await CartItem.find({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500);
  }
});

module.exports = router;
