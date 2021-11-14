const phoneControler = require("../app/controllers/PhoneController");
const phonerouter = require("./phone");
const accountrouter = require("./account");
function route(app) {
	app.use("/account", accountrouter);
	app.use("/phone", phonerouter);
	app.get("/", (req, res) => {
		res.render("home");
	});
}
module.exports = route;
