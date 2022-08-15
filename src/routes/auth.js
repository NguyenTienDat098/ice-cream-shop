const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../app/Controllers/AuthController');
const { Users, isLoggedOut, userInfor } = require('../app/models/Users');
const session = require('express-session');

/*
	>> handle when user login >>
*/

router.get('/login', isLoggedOut, (req, res) => {
  const response = {
    title: 'Sign In',
    error: req.query.error,
  };
  authController.login(req, res, response);
});

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login?error=true',
  })
);

/*
	>> handle when user register
*/
router.post('/signup', authController.saveRegister);
router.get('/signup', authController.register);

/*
  >> admin create create delet update product >> 
*/
router.post('/add-product', authController.createProduct);
router.get('/add-product', authController.addProduct);

/*
  >> user logout 
*/
router.post('/logout', authController.logout);
module.exports = router;
