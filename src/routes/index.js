const phoneControler = require("../app/controllers/PhoneController");
const phonerouter = require("./phone");
const accountrouter = require("./account");
const checkoutrouter = require("./checkout");
function route(app) {
	app.use("/account", accountrouter);
	app.use("/checkout", checkoutrouter);
	app.use("/phone", phonerouter);
	app.get("/", (req, res) => {
		res.render("home");
	});
}
module.exports = route;
