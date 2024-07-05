const Router = require("express").Router;
const adminRouter = Router();
const {ordersModel} = require("../db");

adminRouter.get("/all", middleExample, (req, res) => {
  res.sendFile("orders.html",{root :"client/"});
});

adminRouter.get("/getOrdersApprove", async (req, res) => {
  try {
    const orders = await ordersModel
      .find({ confirm: true })
      .select("-__v -confirm");
    if (orders.length === 0) {
      res.json({ error: "There are no orders" });
    } else {
      res.json({ orders });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function middleExample(req, res, next) {
  if (req.query.admin == "true") {
    next();
  } else {
    res.status(400).json({ error: "you are not admin" });
  }
}

module.exports = adminRouter;
