const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const favoritesRoute = require("./routes/favoriteItem");
const cartItemRoute = require("./routes/cartItem");

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
// app.use("/api/auth");
// app.use("/api/users");
app.use("/api/cart", cartItemRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("Backend server is running");
});
