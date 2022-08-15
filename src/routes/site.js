const siteController = require('../app/Controllers/SiteController');
const express = require('express');
const router = express.Router();
const { userInfor } = require('../app/models/Users');

router.get('/flavors', siteController.flavors);
router.post('/order/checkout', userInfor, siteController.getBill);
router.get('/order/checkout', userInfor, siteController.checkout);
router.post('/order/:item', userInfor, siteController.saveProductOrder);
router.post('/order', userInfor, siteController.saveProductOrder);
router.get('/order', siteController.orderProduct);
router.get('/', siteController.home);
module.exports = router;
