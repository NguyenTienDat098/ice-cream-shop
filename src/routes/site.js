const siteController = require('../app/Controllers/SiteController');
const express = require('express');
const router = express.Router();
const { userInfor } = require('../app/models/Users');

router.post('/order-information/:code/edit', userInfor, siteController.HandleEditCustomerOrder);
router.get('/order-information/:code/edit', userInfor, siteController.editCustomerOrder);
router.get('/order-information/:code', userInfor, siteController.getInforOrder);
router.post('/order/checkout', userInfor, siteController.saveBill);
router.get('/order/checkout', userInfor, siteController.checkout);
router.get('/customer-orders', userInfor, siteController.customerOrder);
router.post('/order', userInfor, siteController.saveProductOrder);
router.get('/order', userInfor, siteController.orderProduct);
router.get('/flavors', siteController.flavors);
router.get('/', siteController.home);
module.exports = router;
