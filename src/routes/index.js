const phoneControler = require('../app/controllers/PhoneController');
const phonerouter = require('./phone');
function route(app) {
  app.use('/phone', phonerouter);
  app.get('/', (req, res) => {
    res.render('home');
  });
}
module.exports = route;
