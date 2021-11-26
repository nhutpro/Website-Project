const purchase = require("../models/Purchase")
const util = require("../../util/mongoose");
const { NULL } = require("node-sass");
const ID = "61989c8c0aeccd72724b4abd"; //userID của người dùng đã đăng nhập

class SearchController {

    index(req, res, next) {
        var queryParam = req.query.purchase;
        //res.send(req.query.purchase);
        purchase
            .find({ userID: ID })

            .populate('userID', 'name')
            .populate('list.optionID')
            .populate({
                path: 'list.optionID',
                populate: {
                    path: 'item',
                    select: "name type brand",
                    match: { name: { $regex: queryParam } }
                }

            })
            //   .find({ $eq: { "list.optionID.item": null } })
            .then((data) => {
                data = util.mutipleMongooseToObject(data);

                for (let result of data) {
                    for (let item1 of result.list) {
                        item1.optionID.color = item1.optionID.color.filter((color) => {
                            return color.name === item1.color;
                        });

                    }

                    result.list = result.list.filter((item) => {
                        return item.optionID.item !== null
                    })
                }

                res.send(data)
            })

    }
}
module.exports = new SearchController();
