const  Router = require("express").Router
const signUpRouter = Router();
const { usersModel } = require("../db")
const path = require('path');

signUpRouter.get("/signUp", (req, res) => {
  //res.sendFile(path.resolve(__dirname + "/../client/signUp.html"));

  res.sendFile('signUp.html', {root: 'client/'});
});

signUpRouter.post("/addNewUser", async (req, res) => {
  let user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    let result = await usersModel.find({ email: user.email }); // return array
    if (result.length) {
      res.json({ error: "The user exists in the system" });
    } else {
      await usersModel.insertMany(user);
      //? goto products list
      res.json({ url: "/products" });
    }
  } catch {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = signUpRouter
