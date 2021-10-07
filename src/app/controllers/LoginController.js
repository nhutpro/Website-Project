const Item = require('../models/Item')
class LoginController {
    index(req, res) {
    Item.find({}, function(err,itemlist){
        if(!err) res.json(itemlist)
        else
        res.status(400).json({errro: 'ERROR !!!!'})
    })
   } 
   show(req, res){
       res.send('home' + req.params.id);
   }
}
module.exports = new LoginController ;