const express = require("express");
const app = express();

const bp = require("body-parser");
app.use(express.static("client"));
app.use(bp.json());
app.use(bp.urlencoded());

const db = require("mongoose");
db.connect(
  "mongodb+srv://hadas:hy1234hy@cluster0.nefe6tn.mongodb.net/svshopDb"
//  "mongodb+srv://ynon:ChyEqc7VUc7GbxfV@cluster0.kdysbnh.mongodb.net/" ynon
);

const userSchema = db.Schema({
  name: String,
  email: String,
  password: String,
});

const usersModel = db.model("users", userSchema);

const productSchema = db.Schema({
  name: String,
  price: String,
});

const productsModel = db.model("products", productSchema);

const orderSchema = db.Schema({
  email : String, //email
  products: Array, //list {name,price}
});

const ordersModel = db.model("orders", orderSchema);

// ----------------- Sign In -------------------------
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/signIn.html");
});

app.post("/userValidation", async (req, res) => {
  let { email, password } = req.body;
  let result = await usersModel.find({ email: email }); // return array
  console.log(`${email} ${password} sfsfsf ${result}`);
  if (result.length === 0) {
    res.json({ Error: "Create account, click on signUp button" });
    //res.status(400).json({error:"No users found"})
  } else {
    //? goto prouducts list
    res.json({ url: "/products" });
  }
});

// ----------------------- SIGN UP --------------------------------------/

// app.get("/signUp", (req, res) => {
//   res.sendFile(__dirname + "/client/signUp.html");
// });

app.post("/signUp", (req, res) => {
  res.sendFile(__dirname + "/client/signUp.html");
});

app.post("/addNewUser", async (req, res) => {
  let user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  let result = await usersModel.find({ email: user.email }); // return array
  if (result.length) {
    res.json({ Error: "המשתמש קיים במערכת" });
  } else {
    await usersModel.insertMany(user);
    //? goto prouducts list
    res.json({ url: "/products" });
  }

  console.log(result);
});

//====================== P R O D U C T S ===============================/

const productsArr = [
  {
    name: "apple",
    price: "12",
  },
  {
    name: "bread",
    price: "112",
  },
  {
    name: "banana",
    price: "15",
  },
  {
    name: "ring",
    price: "13",
  },
  {
    name: "shoes",
    price: "112",
  },
  {
    name: "book",
    price: "17",
  },
  {
    name: "pen",
    price: "5",
  },
];

app.get("/products", async (req, res) => {
  //    await productsModel.insertMany(productsArr);
  res.sendFile(__dirname + "/client/products.html");
});

app.get("/getProducts", async (req, res) => {
  let products = await productsModel.find({}).select("-_id -__v");
  console.log(`products = ${products} => get products`);
  res.json(products);
});

//====================== B U Y ===============================/
app.get("/buy", (req, res) => {
  res.sendFile(__dirname + "/client/buy.html");
});

app.get("/getTotalOrder", async (req, res) => {
  let order = await ordersModel.findOne({}).select("-_id -__v");
  console.log(`order = ${order} => getTotalOrder`);
  const totalPrice = order.products.reduce((accumulator, currentItem) => accumulator + Number(currentItem.price),0);
  const totalProducts = order.products.length;
  console.log(`totalPrice = ${totalPrice} totalProducts = ${totalProducts}`);
  res.json({ totalPrice, totalProducts });
});

app.post("/saveOrder", async (req, res) => {
  let order = { email: "hadass@comp.net", products: req.body.order };
  console.log( "saveOrder 0 0 = ",order);
  await ordersModel.insertMany(order);
  console.log( "saveOrder 1 1 = ",order);
  res.json({ url: "/buy" });
});

//============================================================/
app.get("/all", middleExample, (req, res) => {
  res.sendFile(__dirname + "/client/orders.html");
});

function middleExample(req, res, next) {
  if (req.query.admin == "true") {
    next();
  } else {
    res.json({ message: " you are not admin", error: 400 });
  }
}

app.listen(3000, () => {
  console.log("server listen to 3000");
});
