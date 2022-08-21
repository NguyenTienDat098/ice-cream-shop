const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const bcrypt = require('bcrypt');
const { Users } = require('../models/Users');
const { inforUser } = require('../models/Users');
const Flavors = require('../models/Flavors');
const Orders = require('../models/Order');
const Bill = require('../models/Bill');

class AuthController {
  /**
   * [ get login page]
   * @param  {[type]} req      [localhost:3000/auth/login]
   * @param  {[type]} res      [login.hbs]
   * @param  {[type]} response [description]
   * @return {[type]}          [description]
   */
  login(req, res, response) {
    res.render('../../resources/views/login/login', {
      title: response.title,
      error: response.error,
    });
  }

  /**
   * [get register page]
   * @param  {[type]} req [localhost:3000/auth/signup]
   * @param  {[type]} res [register.hbs]
   * @return {[type]}     [description]
   */
  register(req, res) {
    console.log(req.query.error);
    res.render('../../resources/views/register/register', {
      title: 'Sign Up',
      error: req.query.error,
    });
  }

  /**
   * [save user's infor when register from register page]
   * @param  {[type]}   req  [localhost:3000?username=?&email=?&password=?]
   * @param  {[type]}   res  [success: login page , failture: register page]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  async saveRegister(req, res, next) {
    const exists = await Users.exists({ username: req.body.username });
    if (exists) {
      res.redirect('/auth/signup?error=true');
      return;
    }
    bcrypt.genSalt(10, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(req.body.password, salt, function (err, hash) {
        if (err) return next(err);
        const newUser = new Users({
          username: req.body.username,
          email: req.body.email,
          password: hash,
        });
        newUser
          .save()
          .then((user) => {
            const UserID = user._id;
            const newCustomerOrder = new Orders({
              idCustomer: UserID,
            });
            const newBill = new Bill({
              idCustomer: UserID,
            })
            newCustomerOrder.save().then((customerOrder) => {
              newBill.save((bill) => {
                res.redirect('/auth/login');
              })
            });
          })
          .catch(next);
      });
    });
  }

  /**
   * [admin add new products from this page]
   * @param {[type]} req [description]
   * @param {[type]} res [description]
   */
  addProduct(req, res) {
    res.render('../../resources/views/setup/addProduct', {
      title: 'Create a new Product',
    });
  }

  /**
   * [handle when admin add new product]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  createProduct(req, res, next) {
    const newProduct = new Flavors({
      name: req.body.name,
      description: req.body.description,
      prices: req.body.prices,
      img: req.body.img,
      flavorsDaily: req.body.flavorsDaily,
    });
    newProduct
      .save()
      .then(() => {
        res.redirect('back');
      })
      .catch(next);
  }

  /**
   * [user logout]
   * @param  {[type]}   req  [description]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  logout(req, res) {
    console.log(res.locals);
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      console.log('LOGGED OUT !!!');
      res.redirect('/');
    });
  }

  getlogout(req, res) {
    res.send('');
  }
}
module.exports = new AuthController();
