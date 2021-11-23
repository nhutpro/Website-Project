const purchase = require("../models/Purchase")
const util = require("../../util/mongoose");
const ID = "61989c8c0aeccd72724b4abd"; //userID của người dùng đã đăng nhập

class PurchaseController {
    index(req, res, next) {
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
                let result = data[0];
                for (let item of result.list) {
                    item.optionID.color = item.optionID.color.filter((color) => {
                        return color.name === item.color;
                    });
                }

                res.render("purchase", {
                    itemList: result.list,
                    purchase: data,
                    // userInfo: result.userID,
                });
                //   res.send(data)
            })

    }

}
module.exports = new PurchaseController();
