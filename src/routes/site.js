const siteController = require('../app/Controllers/SiteController');
const express = require('express');
const router = express.Router();
const { userInfor } = require('../app/models/Users');

router.get('/flavors', siteController.flavors);
router.post('/customer-orders/:code/edit', siteController.HandleEditCustomerOrder);
router.get('/customer-orders/:code/edit', siteController.editCustomerOrder);
router.get('/customer-orders', userInfor, siteController.customerOrder);
router.get('/order-information/:code', userInfor, siteController.getInforOrder);
router.post('/order/checkout', userInfor, siteController.saveBill);
router.get('/order/checkout', userInfor, siteController.checkout);
router.post('/order', userInfor, siteController.saveProductOrder);
router.get('/order', userInfor, siteController.orderProduct);
router.get('/', siteController.home);
module.exports = router;
