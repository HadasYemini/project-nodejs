const express = require("express");
const signUpRouter = require("./conrollers/signUp");
const signInRouter = require("./conrollers/signIn");
const productsRouter = require("./conrollers/products")
const buyRouter = require("./conrollers/buy")
const exitRouter = require("./conrollers/exit");
const adminRouter = require("./conrollers/admin");
const {seed} = require("./seed")

const app = express();

app.use(express.static("client"));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded());

// seed(productsModel)

app.use("/",signInRouter)
app.use("/",signUpRouter)
app.use("/",productsRouter)
app.use("/",buyRouter)
app.use("/",exitRouter)
app.use("/",adminRouter)

app.listen(3000, () => {
  console.log("server listen to 3000");
});

