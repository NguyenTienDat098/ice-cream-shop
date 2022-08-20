const { mutipleMongooseToObject } = require('../../util/mongoose');
const { mongooseToObject } = require('../../util/mongoose');
const Flavors = require('../models/Flavors');
const { Users } = require('../models/Users');
const Orders = require('../models/Order');
const Bill = require('../models/Bill');

class SiteController {
  home(req, res, next) {
    res.render('home', {
      title: 'Ice - Cream - Shop',
    });
  }

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

  orderProduct(req, res, next) {
    var flavorsIceCream = [];
    var flavorsIceDaily = [];
    var orderInfor = [];
    const userInfor = res.locals.user;
    Flavors.find({})
      .then((flavors) => {
        flavors.map((e, i) => {
          if (e.flavorsDaily) {
            flavorsIceDaily.push(e);
          } else {
            flavorsIceCream.push(e);
          }
        });
        Bill.find({ idCustomer: userInfor.userid }).then((bill) => {
          bill.forEach((e, i) => {
            if (e.code !== 0) {
              orderInfor.push(e);
            }
          });
          res.render('../../resources/views/order/orderProduct', {
            title: 'Order Now',
            flavors: mutipleMongooseToObject(flavors),
            flavorsIceCream: mutipleMongooseToObject(flavorsIceCream),
            flavorsIceDaily: mutipleMongooseToObject(flavorsIceDaily),
            orderInfor: mutipleMongooseToObject(orderInfor),
            userInfor,
          });
        });
      })
      .catch(next);
  }

  saveProductOrder(req, res, next) {
    const userInfor = res.locals.user;
    Orders.findOne({ idCustomer: userInfor.userid })
      .then((order) => {
        const listIdProductOrder = order.idProductOrder.split(
          /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        );
        order
          .updateOne({
            amountsProductAdded: order.amountsProductAdded + 1,
            idProductOrder: `${req.body.idProductOrder}`,
            amountsProductOrder: `${req.body.amountsProductOrder}`,
            totalPrices: `${req.body.pricesProductOrder}`,
            nameProductOrder: `${req.body.nameProductOrder}`,
          })
          .then((order) => {
            res.redirect('/order/checkout');
          });
      })
      .catch(next);
  }

  checkout(req, res, next) {
    var productsOrder = [];
    var orderInfor = [];
    var currentInforCustomer = {};
    const userInfor = res.locals.user;
    Orders.findOne({ idCustomer: userInfor.userid })
      .then((order) => {
        const listIdProductOrder = order.idProductOrder.split(
          /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        );
        Bill.find({ idCustomer: userInfor.userid }).then((bill) => {
          bill.forEach((e, i) => {
            if (i === bill.length - 1) {
              currentInforCustomer = {
                firstName: e.firstName,
                lastName: e.lastName,
                address: e.address,
                phoneNumber: e.phoneNumber,
              };
            }
            if (e.code !== 0) {
              orderInfor.push(e);
            }
          });
          for (let i = 0; i < listIdProductOrder.length - 1; i++) {
            Flavors.findById(listIdProductOrder[i]).then((flavors) => {
              var product = {
                name: flavors.name,
                amounts: order.amountsProductOrder.split(
                  /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
                )[i],
                prices: order.totalPrices.split(
                  /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
                )[i],
                img: flavors.img,
              };
              productsOrder.push(product);
            });
          }
          res.render('../../resources/views/order/checkout', {
            title: 'Check - Out',
            productsOrder,
            currentInforCustomer,
            orderInfor: mutipleMongooseToObject(orderInfor),
            userInfor,
          });
        });
      })
      .catch(next);
  }

  saveBill(req, res, next) {
    const userInfor = res.locals.user;
    if (
      (req.body.firstname &&
        req.body.lastname &&
        req.body.address &&
        req.body.phonenumber) !== ''
    ) {
      const codeOrder = Math.random() * (99999999 - 2442004) + 2442004;
      const bill = new Bill({
        idCustomer: userInfor.userid,
        firstName: req.body.firstname,
        lastName: req.body.lastname,
        address: req.body.address,
        phoneNumber: req.body.phonenumber,
        deliveryMethod: req.body.deliveryMethod,
        paymentMethod: req.body.paymentMethod,
        code: codeOrder,
      });
      bill
        .save()
        .then((bill) => {
          res.redirect(`/order-information/${bill.code}`);
        })
        .catch(next);
    }
  }

  getInforOrder(req, res, next) {
    var productsOrder = [];
    var bills = [];
    var paymentMethod = false; // true is pay when receive '2',  false is pay now '1'
    var deliveryMethod = false; // true is home delivery '2',  false is pick up form store '1'
    const userInfor = res.locals.user;

    Orders.findOne({ idCustomer: userInfor.userid })
      .then((order) => {
        const listIdProductOrder = order.idProductOrder.split(
          /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
        );
        Bill.findOne({ code: req.params.code }).then((bill) => {
          bills.push(bill);
          switch (bills[0].paymentMethod) {
            case '1':
              paymentMethod = false;
              break;
            case '2':
              paymentMethod = true;
              break;
            default:
              break;
          }

          switch (bills[0].deliveryMethod) {
            case '1':
              deliveryMethod = false;
              break;
            case '2':
              deliveryMethod = true;
              break;
            default:
              break;
          }
          for (let i = 0; i < listIdProductOrder.length - 1; i++) {
            Flavors.findById(listIdProductOrder[i]).then((flavors) => {
              var product = {
                name: flavors.name,
                amounts: order.amountsProductOrder.split(
                  /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
                )[i],
                prices: order.totalPrices.split(
                  /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
                )[i],
                img: flavors.img,
              };
              productsOrder.push(product);
            });
          }
          res.render('../../resources/views/order/inforOrder', {
            title: 'Order - Information',
            productsOrder,
            bills: mongooseToObject(bills[0]),
            paymentMethod,
            deliveryMethod,
            userInfor,
          });
        });
      })
      .catch(next);
  }
  customerOrder(req, res, next) {
    Bill.find().then((bills) => {
      res.render('../../resources/views/order/customerOrder', {
        title: 'View - Customer - Orders',
        bills: mutipleMongooseToObject(bills),
      });
    });
  }

  editCustomerOrder(req, res, next) {
    Bill.findOne({ code: req.params.code })
      .then((bill) => {
        res.render('../../resources/views/order/editCustomerOrder', {
          title: 'Edit - Customer - Order',
          bill: mongooseToObject(bill),
        });
      })
      .catch(next);
  }

  HandleEditCustomerOrder(req, res, next) {
    Bill.findOne({ code: req.body.code })
      .then((bill) => {
        bill
          .updateOne({
            processDelivery: req.body.processDelivery,
          })
          .then((bill) => {
            res.redirect('/customer-orders');
          });
      })
      .catch(next);
  }
}
module.exports = new SiteController();
