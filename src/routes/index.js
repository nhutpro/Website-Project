const phoneControler = require("../app/controllers/PhoneController");
const phonerouter = require("./phone");
const accountrouter = require("./account");
const checkoutrouter = require("./checkout");
const purchaserouter = require("./purchase");
const searchrouter = require("./search");
const userrouter = require("./user");
const addressrouter = require("./address");
const laptoprouter = require("./laptop");
const tabletrouter = require("./tablet");

function route(app) {
	app.use("/search", searchrouter);
	app.use("/laptop", laptoprouter);
	app.use("/tablet", tabletrouter);
	app.use("/address", addressrouter);
	app.use("/purchase", purchaserouter);
	app.use("/account", accountrouter);
	app.use("/checkout", checkoutrouter);
	app.use("/phone", phonerouter);
	app.use("/user", userrouter);
	app.get("/", (req, res) => {
		res.render("home");
	});
}
module.exports = route;
