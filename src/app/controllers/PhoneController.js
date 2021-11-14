const { mutipleMongooseToObject } = require("../../util/mongoose");
const items = require("../models/Item");
const options = require("../models/Option");
class PhoneController {
	index(req, res, next) {
		items
			// .find({})
			// .find({
			//     slug: "iphone11"
			// })
			// .populate('slug')
			.aggregate([
				{
					$lookup: {
						from: "options",
						localField: "slug",
						foreignField: "slug",
						as: "slug",
					},
				},
			])
			.then((items) => {
				res.render("phone", {
					items: items,
				});
			})

			.catch(next);
	}
	show(req, res) {
		res.send("home" + req.params.id);
	}
}
module.exports = new PhoneController();
