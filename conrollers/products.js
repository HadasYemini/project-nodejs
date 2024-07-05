const Router = require("express").Router;
const productsRouter = Router();
const { productsModel } = require("../db");

productsRouter.get("/products", async (req, res) => {
    res.sendFile("products.html", { root: "client/" });
});

productsRouter.get("/getProducts", async (req, res) => {
  try {
    let products = await productsModel.find({}).select("-_id -__v");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = productsRouter