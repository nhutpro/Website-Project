const mongoose = require('mongoose')
async function connect() {
try {
    await mongoose.connect('mongodb://localhost:27017/Website_13Team',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Connect successfully!!!')
} catch (error) {
    console.log('faile !!!!')
}
}
module.exports = { connect };