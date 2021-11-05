const items = require('../models/Item');
const options = require('../models/Option');
class ItemController {
	detailItem(req, res, next) {
		let param = req.params.slug;
		let type = param.slice(0, param.search('-'));
		let capacity = param.slice(param.search('-') + 1, param.length);
		items
			.aggregate([
				{ $match: { slug: type } },
				{
					$lookup: {
						from: 'options',
						localField: 'slug',
						foreignField: 'slug',
						as: 'options',
					},
				},
			])
			.then((items) => {
				options
					.find({ detail: capacity })
					.then((options) => {
						let path = [
							{ name: 'Điện Thoại', href: '/phone' },
							{ name: 'Apple', href: '/phone/Apple' },
							{ name: items[0].name, href: '/phone/Apple/' + items[0].name },
						];
						let mainItem = options.filter((option) => {
							return (option.detail = capacity);
						});
						let item = items[0];
						let techinfo = item.techInfo;
						let demoinfo = [];
						let i = 0;
						for (let infoItem of techinfo) {
							for (let detailInfoItem of infoItem.infoDetail) {
								demoinfo.push(detailInfoItem);
								i++;
								if (i === 12) break;
							}
						}

						res.render('detailItem', {
							path: path,
							item: item,
							color: mainItem[0].color,
							capacity: capacity,
							demoinfo: demoinfo,
						});
					})
					.catch(next);
			})
			.catch(next);
	}
}
module.exports = new ItemController();
