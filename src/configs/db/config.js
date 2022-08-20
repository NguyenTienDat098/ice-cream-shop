const mongoose = require('mongoose');
async function connect() {
  try {
    await mongoose.connect('mongodb://0.0.0.0:27017/my_ice_cream_database', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected databse successfully !');
  } catch (err) {
    console.log(`ERROR: ${err} !!!`);
  }
}
module.exports = { connect };
