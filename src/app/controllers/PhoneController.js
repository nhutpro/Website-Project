const items = require("../models/Item");

class PhoneController {
    index(req, res, next) {
        items
            .find({})
            .then((items) => {
                items = items.map((item) => item.toObject());
                res.render("phone", { items });
            })
            .catch(next);
    }
    show(req, res) {
        res.send("home" + req.params.id);
    }
}
module.exports = new PhoneController();
