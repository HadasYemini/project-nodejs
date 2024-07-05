const Router = require("express").Router
const exitRouter = Router()

exitRouter.get("/exit", (req, res) => {
    res.sendFile("exit.html",{root : "client/"});
});
  
module.exports = exitRouter