const items = require('../models/Item');

class PhoneController {
	index(req, res, next) {
		items
			.find({})
			.then((items) => {
				items = items.map((item) => item.toObject());
				res.send(items);
			})
			.catch(next);
	}
	showItem(req, res) {
		res.send('home ' + req.query.hai + req.query.name);
	}
}
module.exports = new PhoneController();
