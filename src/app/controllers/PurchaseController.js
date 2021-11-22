
class PurchaseController {
    index(req, res, next) {
        res.render("purchase")
    }

}
module.exports = new PurchaseController();
