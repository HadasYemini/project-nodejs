const db = require("mongoose");

db.connect(
  "mongodb+srv://hadas:hy1234hy@cluster0.nefe6tn.mongodb.net/topAccessoriesDb"
);

const userSchema = db.Schema({
  name: String,
  email: String,
  password: String,
});

const usersModel = db.model("users", userSchema);

const productSchema = db.Schema({
  name: String,
  price: Number,
  select: Boolean,
});

const productsModel = db.model("products", productSchema);

const orderSchema = db.Schema({
  name: String,
  email: String,
  products: Array, //list {name,price} products[productSchema]
  confirm: Boolean,
});

const ordersModel = db.model("orders", orderSchema);

module.exports = {
    usersModel,
    productsModel,
    ordersModel
}