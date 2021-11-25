const purchase = require("../models/Purchase")
const util = require("../../util/mongoose");
const ID = "61989c8c0aeccd72724b4abd"; //userID của người dùng đã đăng nhập

class PurchaseController {

    index(req, res, next) {
        res.render("purchase");
    }


    all(req, res, next) {
        purchase
            .find({ userID: ID })

            .populate('userID', 'name')
            .populate('list.optionID')
            .populate({
                path: 'list.optionID',
                populate: {
                    path: 'item',
                    select: "name type brand"
                }

            })

            .then((data) => {
                data = util.mutipleMongooseToObject(data);

                for (let result of data) {
                    for (let item of result.list) {
                        item.optionID.color = item.optionID.color.filter((color) => {
                            return color.name === item.color;
                        });
                    }
                }


                // res.render("purchase", {
                //     // itemList: result.list,
                //     purchase: data,
                //     // userInfo: result.userID,
                // });
                res.send(data)
            })

    }
    delivered(req, res, next) {
        purchase
            .find({ userID: ID })

            .populate('userID', 'name')
            .populate('list.optionID')
            .populate({
                path: 'list.optionID',
                populate: {
                    path: 'item',
                    select: "name type brand"
                }

            })
            .find({ status: "Đã giao" })
            .then((data) => {
                data = util.mutipleMongooseToObject(data);

                for (let result of data) {
                    for (let item of result.list) {
                        item.optionID.color = item.optionID.color.filter((color) => {
                            return color.name === item.color;
                        });
                    }
                }


                // res.render("purchase", {
                //     // itemList: result.list,
                //     purchase: data,
                //     // userInfo: result.userID,
                // });
                res.send(data)
            })
    }
    delivering(req, res, next) {
        purchase
            .find({ userID: ID })

            .populate('userID', 'name')
            .populate('list.optionID')
            .populate({
                path: 'list.optionID',
                populate: {
                    path: 'item',
                    select: "name type brand"
                }

            })
            .find({ status: "Đang giao" })
            .then((data) => {
                data = util.mutipleMongooseToObject(data);

                for (let result of data) {
                    for (let item of result.list) {
                        item.optionID.color = item.optionID.color.filter((color) => {
                            return color.name === item.color;
                        });
                    }
                }


                // res.render("purchase", {
                //     // itemList: result.list,
                //     purchase: data,
                //     // userInfo: result.userID,
                // });
                res.send(data)
            })
    }

}
module.exports = new PurchaseController();
