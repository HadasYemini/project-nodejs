const Router = require("express").Router;
const signInRouter = Router();
const { usersModel } = require("../db")

signInRouter.get("/", (req, res) => {
  res.sendFile("signIn.html", { root: "client/" });
});

signInRouter.post("/userValidation", async (req, res) => {
  let { email, password } = req.body;
  try {
    let result = await usersModel.find({ email, password }); // return array
    if (result.length === 0) {
      result = await usersModel.find({ email });
      if (result.length) {
        res.json({ error: "You entered an incorrect password" });
      } else {
        res.json({
          error:
            "No users found, please create an account, click on signUp button",
        });
      }
    } else {
      //? goto prouducts list
      res.json({ url: "/products", name: result[0].name });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports =  signInRouter ;
