const cart = require("../models/Cart");
const util = require("../../util/mongoose");
const purchase = require("../models/Purchase");
var ID = ""; //userID of logged-in user
// ID = "6183af961471cfc8166fe492"; //UserID for testing purpose, plz comment out when not needed
class CheckoutController {
  index(req, res, next) {
    // ID = req.session.user._id;
    cart
      .find({ userID: req.session.user._id })
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
        data = util.mutipleMongooseToObject(data);
        let result = data[0];
        let subTotal = 0;
        for (let item of result.list) {
          item.optionID.color = item.optionID.color.filter((color) => {
            return color.name === item.color;
          });
          subTotal += item.optionID.color[0].price * item.num;
        }
        result.userID.address = result.userID.address.split(", ").reverse();
        // render màn hình
        res.render("checkout", {
          itemList: result.list,
          emptyCart: !result.list.length,
          userInfo: result.userID,
          subTotal: subTotal,
          total: subTotal + 30000,
        });
        // res.send(result.list);
      })
      .catch((next) => {
        res.render("checkout", {
          error: true,
        });
      });
  }
  addItem(req, res, next) {
    cart
      .updateOne(
        {
          userID: req.session.user._id,
          "list.optionID": req.body.itemID,
        },
        { $inc: { "list.$.num": 1 } }
      )
      .then(() => res.sendStatus(200))
      .catch(next);
  }
  subtractItem(req, res, next) {
    cart
      .updateOne(
        {
          userID: req.session.user._id,
          "list.optionID": req.body.itemID,
        },
        { $inc: { "list.$.num": -1 } }
      )
      .then(() => res.sendStatus(200))
      .catch(next);
  }
  removeItem(req, res, next) {
    cart
      .updateOne(
        {
          userID: req.session.user._id,
        },
        { $pull: { list: { optionID: req.params.id } } }
      )
      .then(() => res.redirect("back"))
      .catch(next);
  }
  purchaseCart(req, res, next) {
    cart
      .findOneAndUpdate(
        { userID: req.session.user._id },
        { $set: { list: [] } }
      )
      .then((data) => {
        data = util.mongooseToObject(data);
        data.status = "Đang giao";
        data.date = new Date();
        // res.send(data);
        const p = new purchase(data);
        p.save()
          .then(() => res.redirect("/purchase"))
          .catch(next);
      })
      .catch(next);
  }
}
module.exports = new CheckoutController();
