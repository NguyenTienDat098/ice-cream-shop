const mongoose = require('mongoose');
const url = 'mongodb + srv://NguyenTienDat098:hetmatkhauroi2442004@my_ice_cream_database.tiqp7q4.mongodb.net/?retryWrites=true&w=majority'
async function connect() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected databse successfully !');
  } catch (err) {
    console.log(`ERROR: ${err} !!!`);
  }
}
module.exports = { connect };
