const cart = require("../models/Cart");
const util = require("../../util/mongoose");
const ID = "617eb09800e1ef444ae6d3eb"; //userID của người dùng đã đăng nhập
class CheckoutController {
  index(req, res, next) {
    cart
      .find({ userID: ID })
      .populate("userID", "email address phone name")
      .populate("list.optionID", "detail color.name color.image color.price")
      .populate({
        path: "list.optionID",
        populate: {
          path: "item",
          select: "name type",
        },
      })
      .then((data) => {
        // lọc chỉ lấy option có màu trùng đúng với color
        data = util.mutipleMongooseToObject(data);
        let result = data[0];
        for (let item of result.list) {
          item.optionID.color = item.optionID.color.filter((color) => {
            return color.name === item.color;
          });
        }
        result.userID.address = result.userID.address.split(", ").reverse();
        // render màn hình
        res.render("checkout", {
          itemList: result.list,
          userInfo: result.userID,
        });
        // res.send(result);
      })
      .catch(next);
  }
}
module.exports = new CheckoutController();
