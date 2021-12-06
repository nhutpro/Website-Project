const purchase = require("../models/Purchase")
const util = require("../../util/mongoose");
const cart = require("../models/Cart")
// const ID = req.session.user._id; //userID của người dùng đã đăng nhập

class PurchaseController {

    index(req, res, next) {
        res.render("purchase");
    }

    EmptyList(req, res, next) {
        purchase.deleteOne({
            userID: req.session.user._id,
            list: { $size: 0 }
        })
            .then((data) => {
                res.send(data)
            })
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
                    var diff = Math.abs(new Date() - result.date);
                    diff = diff / 60000
                    console.log("time by milis: ", diff);
                    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                    var dateFormated = result.date.toLocaleDateString("vi-VN", options)
                    result.date = dateFormated;
                    if (diff >= 1) {
                        purchase.updateOne({
                            userID: req.session.user._id,
                            _id: result._id,
                        },
                            {
                                $set: { status: "Đã giao" }
                            }
                        )
                            .then(() => {

                            })

                    }
                }
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
                    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                    var dateFormated = result.date.toLocaleDateString("vi-VN", options)
                    result.date = dateFormated;
                }
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
                    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
                    var dateFormated = result.date.toLocaleDateString("vi-VN", options)
                    result.date = dateFormated;
                }

                res.send(data)
            })
    }
    checkout(req, res, next) {

        cart.find({ userID: req.session.user._id },)

            .then((data) => {
                var object = { optionID: req.query.optionID, num: req.query.num, color: req.query.color }
                let count = 0
                for (let item of data[0].list) {

                    if (item.optionID.toString() == object.optionID.toString()) {
                        cart.updateOne({
                            userID: req.session.user._id,
                            "list.optionID": object.optionID,

                        },
                            {
                                $inc: { "list.$.num": object.num }
                            })
                            .then((info) => {
                                res.redirect("/checkout")
                            })
                        break;
                    }
                    ++count;
                }
                if (count.toString() == data[0].list.length.toString()) {

                    cart.updateOne({ userID: req.session.user._id },
                        {
                            $push: { list: object }
                        }
                    )
                        .then((info) => {
                            res.redirect("/checkout")
                        })
                }
                // res.send(data)
            })


    }
    removeItem(req, res, next) {
        purchase
            .updateOne({ userID: req.session.user._id },
                { $pull: { list: { optionID: req.params.id } } })
            .then(() => res.redirect("back"))
            .catch(next)
    }
}
module.exports = new PurchaseController();
