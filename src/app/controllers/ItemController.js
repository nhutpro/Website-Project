const items = require('../models/Item');
const options = require('../models/Option');
class ItemController {
	detailItem(req, res, next) {
		let param = req.params.slug;
		let type = param.slice(0, param.search('-'));
		let capacity = param.slice(param.search('-') + 1, param.length);
		items
			.find({ slug: type })
			.then((items) => {
				options
					.find({ detail: capacity })
					.then((options) => {
						items = items.map((item) => item.toObject());
						options = options.map((option) => option.toObject());
						let path = [
							{ name: 'Điện Thoại', href: '/phone' },
							{ name: 'Apple', href: '/phone/Apple' },
							{ name: items[0].name, href: '/phone/Apple/' + items[0].name },
						];
						let mainItem = options.filter((option) => {
							return (option.detail = capacity);
						});
						res.render('detailItem', {
							path: path,
							item: items[0],
							color: mainItem[0].color,
						});
					})
					.catch(next);
			})
			.catch(next);

		/*
		items
			.find({ slug: req.params.slug.slice(0,reqparams.slug.search('-')) })
			.then((items) => {
				items = items.map((item) => item.toObject());
				let path = [
					{ name: 'Điện Thoại', href: '/phone' },
					{ name: 'Apple', href: '/phone/Apple' },
					{ name: items[0].name, href: '/phone/Apple/' + items[0].name },
				];
				res.render('detailItem', {
					item: items[0],
					path: path,
				}); 
			})
			.catch(next);*/
	}
}
module.exports = new ItemController();
