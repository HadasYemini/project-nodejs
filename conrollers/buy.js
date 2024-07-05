const Router = require("express").Router;
const buyRouter = Router();
const {ordersModel} = require("../db")

buyRouter.get("/buy", (req, res) => {
  res.sendFile("buy.html", {root : "client/"});
});

buyRouter.post("/saveOrder", async (req, res) => {
  const order = {
    name: req.body.name,
    email: req.body.email,
    products: req.body.order,
    confirm: false,
  };
  try {
    const result = await ordersModel.insertMany(order);
    res.json({ url: "/buy", _id: result[0]._id });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

buyRouter.post("/approveOrder", async (req, res) => {
  try {
    const result = await ordersModel.findOneAndUpdate(
      { _id: req.body.orderId }, // Filter: Find the document with the specified ID
      { confirm: true } // Update: Set the 'name' field to the new value
    );
    res.json({ url: "/exit" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = buyRouter;
