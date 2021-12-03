const items = require("../models/Item");
const options = require("../models/Option");
class ItemController {
	detailItem(req, res, next) {
		let param = req.params.slug;
		let type = param.slice(0, param.search("-"));
		let route = "phone";
		let capacity = param.slice(param.search("-") + 1, param.length);
		items
			.aggregate([
				{ $match: { type: route } },
				{
					$lookup: {
						from: "options",
						localField: "slug",
						foreignField: "slug",
						as: "options",
					},
				},
			])
			.then((data) => {
				options
					.find({ detail: capacity, slug: type })
					.then((options) => {
						let path = [
							{ name: "Điện Thoại", href: "/phone" },
							{ name: data[0].name, href: "/phone/" + data[0].name },
						];
						let mainItem = options.filter((option) => {
							return (option.detail = capacity);
						});

						let item = data.filter((phone) => phone.slug == type)[0];
						console.log(data);
						let alloptions = item.options;
						let techinfo = item.techInfo;
						let demoinfo = [];
						let i = 0;
						for (let infoItem of techinfo) {
							for (let detailInfoItem of infoItem.infoDetail) {
								if (demoinfo.length < 7) demoinfo.push(detailInfoItem);
								i++;
								if (i == 6) break;
							}
						}
						items.find({ type: route }).then((itemPhone) => {
							console.log(itemPhone);
						});
						res.render("detailItem", {
							path: path,
							item: item,
							color: mainItem[0].color,
							idOption: mainItem[0]._id,
							capacity: capacity,
							demoinfo: demoinfo,
							options: alloptions,
							sameItem: data,
						});
					})
					.catch(next);
			})
			.catch(next);
	}
	detailItemLaptop(req, res, next) {
		let param = req.params.slug;
		let type = param.slice(0, param.search("-"));
		let route = "laptop";
		let capacity = param.slice(param.search("-") + 1, param.length);
		items
			.aggregate([
				{ $match: { type: route } },
				{
					$lookup: {
						from: "options",
						localField: "slug",
						foreignField: "slug",
						as: "options",
					},
				},
			])
			.then((data) => {
				options
					.find({ detail: capacity, slug: type })
					.then((options) => {
						let path = [
							{ name: "Laptop", href: "/laptop" },
							{ name: data[0].name, href: "/laptop/" + data[0].name },
						];
						let mainItem = options.filter((option) => {
							return (option.detail = capacity);
						});

						let item = data.filter((phone) => phone.slug == type)[0];
						console.log(data);
						let alloptions = item.options;
						let techinfo = item.techInfo;
						let demoinfo = [];
						let i = 0;
						for (let infoItem of techinfo) {
							for (let detailInfoItem of infoItem.infoDetail) {
								if (demoinfo.length < 7) demoinfo.push(detailInfoItem);
								i++;
								if (i == 6) break;
							}
						}
						items.find({ type: route }).then((itemPhone) => {
							console.log(itemPhone);
						});
						res.render("detailItem", {
							path: path,
							item: item,
							color: mainItem[0].color,
							idOption: mainItem[0]._id,
							capacity: capacity,
							demoinfo: demoinfo,
							options: alloptions,
							sameItem: data,
						});
					})
					.catch(next);
			})
			.catch(next);
	}
	detailItemTablet(req, res, next) {
		let param = req.params.slug;
		let type = param.slice(0, param.search("-"));
		let route = "tablet";
		let capacity = param.slice(param.search("-") + 1, param.length);
		items
			.aggregate([
				{ $match: { type: route } },
				{
					$lookup: {
						from: "options",
						localField: "slug",
						foreignField: "slug",
						as: "options",
					},
				},
			])
			.then((data) => {
				options
					.find({ detail: capacity, slug: type })
					.then((options) => {
						let path = [
							{ name: "Tablet", href: "/tablet" },
							{ name: data[0].name, href: "/tablet/" + data[0].name },
						];
						let mainItem = options.filter((option) => {
							return (option.detail = capacity);
						});

						let item = data.filter((phone) => phone.slug == type)[0];
						console.log(data);
						let alloptions = item.options;
						let techinfo = item.techInfo;
						let demoinfo = [];
						let i = 0;
						for (let infoItem of techinfo) {
							for (let detailInfoItem of infoItem.infoDetail) {
								if (demoinfo.length < 7) demoinfo.push(detailInfoItem);
								i++;
								if (i == 6) break;
							}
						}
						items.find({ type: route }).then((itemPhone) => {
							console.log(itemPhone);
						});
						res.render("detailItem", {
							path: path,
							item: item,
							color: mainItem[0].color,
							idOption: mainItem[0]._id,
							capacity: capacity,
							demoinfo: demoinfo,
							options: alloptions,
							sameItem: data,
						});
					})
					.catch(next);
			})
			.catch(next);
	}
	detailItemAccessory(req, res, next) {
		let param = req.params.slug;
		let type = param.slice(0, param.search("-"));
		let route = "accessory";
		let capacity = param.slice(param.search("-") + 1, param.length);
		items
			.aggregate([
				{ $match: { type: route } },
				{
					$lookup: {
						from: "options",
						localField: "slug",
						foreignField: "slug",
						as: "options",
					},
				},
			])
			.then((data) => {
				options
					.find({ detail: capacity, slug: type })
					.then((options) => {
						let path = [
							{ name: "Phụ Kiện", href: "/accessory" },
							{ name: data[0].name, href: "/accessory/" + data[0].name },
						];
						let mainItem = options.filter((option) => {
							return (option.detail = capacity);
						});

						let item = data.filter((phone) => phone.slug == type)[0];
						console.log(data);
						let alloptions = item.options;
						let techinfo = item.techInfo;
						let demoinfo = [];
						let i = 0;
						for (let infoItem of techinfo) {
							for (let detailInfoItem of infoItem.infoDetail) {
								if (demoinfo.length < 7) demoinfo.push(detailInfoItem);
								i++;
								if (i == 6) break;
							}
						}
						items.find({ type: route }).then((itemPhone) => {
							console.log(itemPhone);
						});
						res.render("detailItem", {
							path: path,
							item: item,
							color: mainItem[0].color,
							idOption: mainItem[0]._id,
							capacity: capacity,
							demoinfo: demoinfo,
							options: alloptions,
							sameItem: data,
						});
					})
					.catch(next);
			})
			.catch(next);
	}
}
module.exports = new ItemController();
