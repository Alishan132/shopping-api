const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const cartItemRoute = require("./routes/cartItem");
const authRouter = require("./routes/auth");
const favoritesRoute = require("./routes/favorites");
const productsRoute = require("./routes/products");

const app = express();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection successfull!"))
  .catch((err) => {
    console.log(err);
  });

// MIDDLEWARES
app.use(express.json());

// ROUTES
app.use("/api/favorites", favoritesRoute);
app.use("/api/cart", cartItemRoute);
app.use("/api/auth", authRouter);
app.use("/api/products", productsRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Backend server is running");
});
