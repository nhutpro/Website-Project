const address = require("../models/Address");

class Address {
	District(req, res, next) {
		console.log(req.query.province);
		address.find({ name: req.query.province }).then((data) => {
			data = data.map((item) => item.toObject());
			res.send(data[0].districts);
			console.log(data);
		});
	}

	Ward(req, res, next) {
		console.log(req.query);
		address
			.find({
				name: req.query.province,
			})
			.then((data) => {
				data = data.map((item) => item.toObject());
				let districts = data[0].districts;

				let districtSelected = districts.filter(
					(district) => district.name == req.query.district
				);
				console.log(districtSelected);
				let ward = districtSelected[0].wards;
				res.send(ward);
			})
			.catch((err) => {
				console.log(err);
			});
	}
}
module.exports = new Address();
