const purchase = require("../models/Purchase")
const util = require("../../util/mongoose");
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
                        item.optionID.item.name = "tét"

                    }
                    let brandName = result.list.optionID.item.name
                    // let pos = brandName.search(queryParam)
                    // if (pos < 0) {
                    //     result.list == ""
                    // }
                    console.log(brandName)
                }
                res.send(data)
            })
    }

}
module.exports = new SearchController();
