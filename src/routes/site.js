const siteController = require('../app/Controllers/SiteController');
const express = require('express');
const router = express.Router();

router.get('/', siteController.home);
module.exports = router;