const express = require("express");
const app = express();

const bp = require("body-parser");
app.use(express.static("client"));
app.use(bp.json());
app.use(bp.urlencoded());

const db = require("mongoose");
db.connect(
  //"mongodb+srv://hadas:hy1234hy@cluster0.nefe6tn.mongodb.net/svshopDb"
  "mongodb+srv://ynon:ChyEqc7VUc7GbxfV@cluster0.kdysbnh.mongodb.net/svshopDb" //ynon
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
  name: String,
  email: String,
  products: Array, //list {name,price}
  confirm: Boolean,
});

const ordersModel = db.model("orders", orderSchema);

// ----------------- Sign In -------------------------
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/signIn.html");
});

app.post("/userValidation", async (req, res) => {
  let { email, password } = req.body;
  const result = await usersModel.find({ email, password }); // return array
  if (result.length === 0) {
    res.json({ Error: "Create account, click on signUp button" });
    //res.status(400).json({error:"No users found"})
  } else {
    //? goto prouducts list
    res.json({ url: "/products", name: result[0].name });
  }
});

// ----------------------- SIGN UP --------------------------------------/

app.get("/signUp", (req, res) => {
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
    name: "Set of 4 rings",
    price: "132",
  },
  {
    name: "Ring",
    price: "76",
  },
  {
    name: "Set of 3 bracelets",
    price: "215",
  },
  {
    name: "Bracelet",
    price: "113",
  },
  {
    name: "Set of 3 necklace",
    price: "300",
  },
  {
    name: "Necklace",
    price: "125",
  },
  {
    name: "Set of 4 earrings",
    price: "200",
  },
  {
    name: "Earrings",
    price: "90",
  },
  {
    name: "Gold chain",
    price: "200",
  },
  {
    name: "Silver chain",
    price: "250",
  },
  {
    name: "Leg bracelet",
    price: "75",
  },
  {
    name: "Set of 5 earrings",
    price: "220",
  },
  {
    name: "Bag",
    price: "200",
  },
  {
    name: "Choker necklace",
    price: "199",
  },
  {
    name: "Glasses",
    price: "175",
  },
  {
    name: "Sunglasses",
    price: "97",
  },
  {
    name: " Bead necklace",
    price: "163",
  },
  {
    name: "Scarf",
    price: "68",
  },
  {
    name: "Hair bands",
    price: "10",
  },
  {
    name: "Leather Wallet",
    price: "156",
  },
  {
    name: "Wallet",
    price: "123",
  },
];

app.get("/products", async (req, res) => {
  //await productsModel.insertMany(productsArr);
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

app.post("/getTotalOrder", async (req, res) => {
  let order = await ordersModel.findOne({_id:req.body.orderId}).select("-_id -__v");
  console.log(`order = ${order} => getTotalOrder`);
  const totalPrice = order.products.reduce(
    (accumulator, currentItem) => accumulator + Number(currentItem.price),
    0
  );
  const totalProducts = order.products.length;
  res.json({ totalPrice, totalProducts });
});

app.post("/saveOrder", async (req, res) => {
  const order = { name : req.body.name,email: req.body.email, products: req.body.order, confirm:false };
  const result = await ordersModel.insertMany(order);
  console.log('/saveorder=>',result)
  res.json({ url: "/buy" ,_id:result[0]._id});
});

app.post("/approveOrder", async(req,res) => {
    const result = await ordersModel.findOneAndUpdate(
        { _id: req.body.orderId }, // Filter: Find the document with the specified ID
        { confirm: true }   // Update: Set the 'name' field to the new value
    )
    console.log('/approveOrder=>',result)
    res.json({ url: "/exit"}); 
})
//======================= E X I T =============================/
app.get("/exit", (req, res) => {
    res.sendFile(__dirname + "/client/exit.html");
  });

//========================= A D M I N =========================/
app.get("/all", middleExample, (req, res) => {
  res.sendFile(__dirname + "/client/orders.html");
});

app.get("/getOrdersApprove", async (req, res) => {
    const orders = await ordersModel.find({confirm:true}).select("-_id -__v -confirm")
    if (orders.length === 0) {
        res.json({Error : 'error'})
    }else{
        res.json({orders})
    }
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
