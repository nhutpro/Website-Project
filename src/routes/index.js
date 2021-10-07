const loginControler = require('../app/controllers/LoginController')
const loginrouter = require('./login')
function route(app){
    app.use('/login',loginrouter)
    app.get('/', (req,res)=>{
      res.render('home')
    })
}
module.exports = route ;