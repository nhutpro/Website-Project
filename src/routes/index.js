const phoneControler = require("../app/controllers/PhoneController");
const phonerouter = require("./phone");
const accountrouter = require("./account");
const checkoutrouter = require("./checkout");
const purchaserouter = require("./purchase")
const searchrouter = require("./search")

function route(app) {
	app.use("/search", searchrouter)
	app.use("/purchase", purchaserouter)
	app.use("/account", accountrouter);
	app.use("/checkout", checkoutrouter);
	app.use("/phone", phonerouter);
	app.get("/", (req, res) => {
		res.render("home");
	});
}
module.exports = route;
