const mongoose = require('mongoose');
const url = `mongodb+srv://NguyenTienDat098:hetpass123@cluster0.tiqp7q4.mongodb.net/my_ice_cream_database?retryWrites=true&w=majority`
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
