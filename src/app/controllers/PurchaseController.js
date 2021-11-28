const purchase = require("../models/Purchase")
const util = require("../../util/mongoose");
const cart = require("../models/Cart")
// const ID = req.session.user._id; //userID của người dùng đã đăng nhập

class PurchaseController {

    index(req, res, next) {
        res.render("purchase");
    }


    all(req, res, next) {
        purchase
            .find({ userID: req.session.user._id })

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
                    result.list = result.list.filter((list) => {
                        return list.optionID !== null;
                    });
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
            .find({ userID: req.session.user._id })

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
                    result.list = result.list.filter((list) => {
                        return list.optionID !== null;
                    });
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
            .find({ userID: req.session.user._id })

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
                    result.list = result.list.filter((list) => {
                        return list.optionID !== null;
                    });
                    for (let item of result.list) {
                        item.optionID.color = item.optionID.color.filter((color) => {
                            return color.name === item.color;
                        });
                    }

                }

                res.send(data)
            })
    }
    checkout(req, res, next) {
        purchase
            .findOne(
                { userID: req.session.user._id },
                { status: 0, date: 0, _id: 0 }
            )
            .populate('userID', 'name')
            .populate('list.optionID')
            .populate({
                path: 'list.optionID',
                populate: {
                    path: 'item',
                    select: "name type brand"

                },
                match: { _id: req.query.optionID }

            })
            .then((data) => {
                data = util.mongooseToObject(data);

                const c = new cart(data)
                c.save()
                    .then(() => res.redirect("/checkout"))
                    .catch(next);
                // for (let result of data.list) {

                //     result.optionID = result.optionID.filter((item) => {
                //         return item !== null
                //     })
                // }


                // res.send(data)
            })

    }
}
module.exports = new PurchaseController();
