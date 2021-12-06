const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect successfully!!!");
  } catch (error) {
    console.log("Failed !!!!");
  }
}
module.exports = { connect };
