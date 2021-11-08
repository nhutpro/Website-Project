class CheckoutController {
  index(req, res) {
    res.render("checkout");
  }
}
module.exports = new CheckoutController();
