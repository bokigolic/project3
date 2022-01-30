feature/frontend
const express = require('express');
const arouter = express.Router();
const authController = require('../controllers/auth-controller.js');


arouter.route('/')
  .get(() => {
    console.log('he he he')
  });
arouter.route('/logout')
  .post(authController.logoutController);
arouter.route('/formlogin')
  .post(authController.formLoginController);
arouter.route('/register')
  .post(authController.registerController);
  /*
arouter.route('/autologin')
  .get(authController.autoLoginController);
  */

module.exports = arouter;

const express = require('express');
const arouter = express.Router();
const authController = require('../controllers/auth-controller.js');


arouter.route('/')
  .get(() => {
    console.log('he he he')
  });
arouter.route('/logout')
  .post(authController.logoutController);
arouter.route('/formlogin')
  .post(authController.formLoginController);
arouter.route('/register')
  .post(authController.registerController);
  /*
arouter.route('/autologin')
  .get(authController.autoLoginController);
  */

module.exports = arouter;
 main
