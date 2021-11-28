const { NULL } = require("node-sass");
const mongoose = require("../../util/mongoose");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const items = require("../models/Item");
const options = require("../models/Option");
class PhoneController {
	index(req, res, next) {
		let paramBrand = req.query.brand;
		let paramPrice = req.query.price;
		var sort = req.query.sort
		var temp
		if (sort != undefined) {
			if (sort == "asc") {
				temp = 1
			}
			else {
				temp = -1
			}
		}
		let to2 = 0;
		let from2 = -1;
		let to5 = 0;
		let from5 = -1;
		let to14 = 0;
		let from14 = 100000000000;

		if (paramBrand == undefined) {
			paramBrand = "";
		}
		if (paramPrice == undefined) {
			paramPrice = "";
		}

		if (paramBrand != "" || paramPrice != "") {
			console.log("querybrand: ", paramBrand);
			console.log("queryprice: ", paramPrice);
			if (paramPrice == "") {
				paramPrice = 0;
			} else {
				if (paramPrice.search("duoi-2-trieu") >= 0) {
					to2 = 2000000;
				}
				if (paramPrice.search("tu-2-5-trieu") >= 0) {
					from2 = 2000000;
					to5 = 5000000;
				}
				if (paramPrice.search("tu-5-14-trieu") >= 0) {
					from5 = 5000000;
					to14 = 14000000;
				}
				if (paramPrice.search("tren-14-trieu") >= 0) {
					from14 = 14000000;
				}
			}

			console.log("from5: ", from5);
			console.log("to14: ", to14);
			console.log("from14: ", from14);
			//  console.log("serach 5-14: ", paramPrice.search("tu-5-14-trieu"));

			//  paramPrice = parseFloat(paramPrice)
			let strParam = paramBrand.split(",");
			// strParam = strParam.StringSplitOptions.RemoveEmptyEntries;
			let brand1 = strParam[0];
			let brand2 = strParam[1];
			let brand3 = strParam[2];
			let brand4 = strParam[3];
			let brand5 = strParam[4];
			let brand6 = strParam[5];
			if (paramBrand == "" && paramPrice != "") {
				brand1 = "apple";
				brand2 = "samsung";
				brand3 = "vsmart";
				brand4 = "oppo";
				brand5 = "xiaomi";
				brand6 = "realme";
			} // for paramPrice still work when paramBrand is empty

			items
				.aggregate([
					{
						$match: {
							$or: [
								{
									brand: brand1,
								},
								{
									brand: brand2,
								},
								{
									brand: brand3,
								},
								{
									brand: brand4,
								},
								{
									brand: brand5,
								},
								{
									brand: brand6,
								},
							],
						},
					},

					{
						$lookup: {
							from: "options",
							localField: "slug",
							foreignField: "slug",
							// pipeline: [{ $match: { detail: "256GB" } }],
							as: "slug",
						},
					},

					{
						$match: {
							$or: [
								{
									slug: {
										$elemMatch: {
											color: { $elemMatch: { price: { $gte: paramPrice } } },
										},
									},
								},

								//               {"slug" : {$elemMatch: { "color":   {$elemMatch:{ "price":{$lt: to2}}}  }}, },

								//        {"slug" : {$elemMatch: { "color":   {$elemMatch:{ "price": {$elemMatch: {$gte: from2,$lt: to5} } }}  }}, },

								{
									slug: {
										$elemMatch: {
											color: {
												$elemMatch: { price: { $gte: from5, $lt: to14 } },
											},
										},
									},
								},

								{
									slug: {
										$elemMatch: {
											color: { $elemMatch: { price: { $gte: from14 } } },
										},
									},
								},
							],
						},
					},
				])
				.sort({
					"slug.color.price": temp

				})
				.then((items) => {
					res.render("phone", {
						items: items,
					});
				})

				.catch(next);
		} else {
			items
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
				.sort({
					"slug.color.price": temp

				})
				.then((items) => {

					res.render("phone", {
						items: items,
					});
				})

				.catch(next);
		}
	}
}
module.exports = new PhoneController();
