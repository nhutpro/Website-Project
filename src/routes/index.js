const phoneControler = require("../app/controllers/PhoneController");
const phonerouter = require("./phone");
const checkoutrouter = require("./checkout");
function route(app) {
  app.use("/checkout", checkoutrouter);
  app.use("/phone", phonerouter);
  app.get("/", (req, res) => {
    res.render("home");
  });
}
module.exports = route;
