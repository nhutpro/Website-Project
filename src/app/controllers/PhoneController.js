const { mutipleMongooseToObject } = require("../../util/mongoose");
const items = require("../models/Item");

class PhoneController {
    index(req, res, next) {
        items
            .find({})
            .then((items) => {

                res.render("phone", {
                    items: mutipleMongooseToObject(items)
                });

            })
            .catch(next);

    }
    show(req, res) {
        res.send("home" + req.params.id);
    }

}
module.exports = new PhoneController();