const purchase = require("../models/Purchase")
const util = require("../../util/mongoose");
const { NULL } = require("node-sass");
const ID = "61989c8c0aeccd72724b4abd"; //userID của người dùng đã đăng nhập
const mongoose = require("../../util/mongoose");
const { mutipleMongooseToObject } = require("../../util/mongoose");
const items = require("../models/Item");
const options = require("../models/Option");

class SearchController {
    //search global

    global(req, res, next) {
        var keyword = req.query.key
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

        items
            .aggregate([
                {
                    $match: {
                        name: { $regex: keyword }
                    }
                },
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
                res.render("search", {
                    items: items,
                });
                // res.send(items)
            })

            .catch(next);
    }


    // search for purchase
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
