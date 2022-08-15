const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const Flavors = require('../models/Flavors');
const { Users } = require('../models/Users');
const Orders = require('../models/Order');

class SiteController {
  /**
   * [get home page]
   * @param  {[type]}   req  [localhost:3000/]
   * @param  {[type]}   res  [return home.hbs file]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  home(req, res, next) {
    res.render('home', {
      title: 'Ice - Cream - Shop',
    });
  }

  /**
   * [get flavors page]
   * @param  {[type]}   req  [localhost:3000/flavors]
   * @param  {[type]}   res  [return flavors.hbs file]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  flavors(req, res, next) {
    var flavorsIceCream = [];
    var flavorsIceDaily = [];

    Flavors.find({})
      .then((flavors) => {
        flavors.map((e, i) => {
          if (e.flavorsDaily) {
            flavorsIceDaily.push(e);
          } else {
            flavorsIceCream.push(e);
          }
        });
        res.render('../../resources/views/flavors/flavors', {
          title: 'ICE - CREAM - FLAVORS',
          flavorsIceCream: mutipleMongooseToObject(flavorsIceCream),
          flavorsIceDaily: mutipleMongooseToObject(flavorsIceDaily),
        });
      })
      .catch(next);
  }

  /**
   * [get orders online page]
   * @param  {[type]}   req  [localhost:3000/order]
   * @param  {[type]}   res  [return order.hbs file]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  orderProduct(req, res, next) {
    var flavorsIceCream = [];
    var flavorsIceDaily = [];
    Flavors.find({})
      .then((flavors) => {
        flavors.map((e, i) => {
          if (e.flavorsDaily) {
            flavorsIceDaily.push(e);
          } else {
            flavorsIceCream.push(e);
          }
        });
        res.render('../../resources/views/order/orderProduct', {
          title: 'Order Now',
          flavors: mutipleMongooseToObject(flavors),
          flavorsIceCream: mutipleMongooseToObject(flavorsIceCream),
          flavorsIceDaily: mutipleMongooseToObject(flavorsIceDaily),
        });
      })
      .catch(next);
  }

  /**
   * [Save the product when the customer places an order in the customer's cart]
   * @param  {[type]}   req  [POST localhost:3000/order]
   * @param  {[type]}   res  [description]
   * @param  {Function} next [description]
   * @return {[type]}        [description]
   */
  saveProductOrder(req, res, next) {
    var inforUser = res.locals.user;
    Orders.findOne({ idCustomer: inforUser.userid })
      .then((order) => {
        var isExists = false;
        const listIdProductOrder = order.idProductOrder.split(
          /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        );
        listIdProductOrder.forEach((e, i) => {
          if (e === req.body.idProductOrder) {
            isExists = true;

            const currentAmounts = order.amountsProductOrder.split(
              /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
            )[i];
            const currentPrices = order.totalPrices.split(
              /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
            )[i];
            const listAmounts = order.amountsProductOrder.split(
              /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
            );
            const totalPrices = order.totalPrices.split(
              /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
            );

            const newPrices =
              parseFloat(currentPrices) +
              parseFloat(req.body.pricesProductOrder);
            const newAmounts =
              parseFloat(currentAmounts) +
              parseFloat(req.body.amountsProductOrder);

            listAmounts[i] = newAmounts.toString();
            totalPrices[i] = newPrices.toString();

            var updateListAmounts = '';
            var updateListPrices = '';

            for (var i = 0; i < listAmounts.length - 1; i++) {
              updateListAmounts += `${listAmounts[i]}&`;
              updateListPrices += `${totalPrices[i]}&`;
            }
            order
              .updateOne({
                amountsProductOrder: `${updateListAmounts}`,
                totalPrices: `${updateListPrices}`,
              })
              .then((order) => {
                res.redirect('/order');
              });
          }
        });
        if (!isExists) {
          order
            .updateOne({
              amountsProductAdded: order.amountsProductAdded + 1,
              idProductOrder: `${order.idProductOrder}${req.body.idProductOrder}&`,
              amountsProductOrder: `${order.amountsProductOrder}${req.body.amountsProductOrder}&`,
              totalPrices: `${order.totalPrices}${req.body.pricesProductOrder}&`,
              nameProductOrder: `${order.nameProductOrder}${req.body.nameProductOrder}&`,
            })
            .then((order) => {
              res.redirect('/order');
            });
        }
      })
      .catch(next);
  }

  checkout(req, res) {
    res.render('../../resources/views/order/checkout', {
      title: 'Check - Out',
    });
  }

  getBill(req, res) {
    var products = [];
    var inforUser = res.locals.user;

    Orders.findOne({ idCustomer: inforUser.userid }).then((order) => {
      const listIdProductOrder = order.idProductOrder.split(
        /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
      );
      for (let i = 0; i < listIdProductOrder.length - 1; i++) {
        Flavors.findOne({ _id: listIdProductOrder[i] }).then((flavors) => {
          var product = {
            id: flavors._id,
            name: flavors.name,
            amounts: order.amountsProductOrder.split(
              /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
            )[i],
            prices: order.totalPrices.split(
              /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
            )[i],
            img: flavors.img,
          };
          products.push(product);
        });
      }
    });
    console.log(products);
  }
}
module.exports = new SiteController();
