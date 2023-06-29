const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", async (req, res) => {
  const { page, category, priceMin, priceMax, brand } = req.query;

  const perPage = 10;
  const startIdx = (page - 1) * perPage;
  const endIdx = startIdx + perPage;

  fs.readFile("./data/products.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    } else {
      let products = JSON.parse(data)["products"];

      // FILTERING
      if (category)
        products = products.filter((product) => product.category === category);

      if (brand)
        products = products.filter((product) => product.brand === brand);

      if (priceMin && priceMax)
        products = products.filter(
          (product) =>
            product.price >= parseInt(priceMin) &&
            product.price <= parseInt(priceMax)
        );

      // PAGINATION
      const paginatedProducts = products.slice(startIdx, endIdx);

      return res.status(200).json({
        total: products.length,
        perPage,
        currPage: parseInt(page),
        data: paginatedProducts,
      });
    }
  });
});

router.get("/:id", async (req, res) => {
  const products = JSON.parse(
    await fs.promises.readFile("./data/products.json", "utf-8")
  )["products"];

  const product = products.filter(
    (product) => product.id === parseInt(req.params.id)
  );
  res.json(product);
});

module.exports = router;
