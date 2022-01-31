const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller.js');
const authController = require('../controllers/auth-controller.js');

router.route('/')
  .get(() => {
    console.log('user router he he he');
  });
router.route('/profile/me')
  .get(userController.getMyUserData);
router.route('/list')
  .get(userController.getUserList);
router.route('/update')


module.exports = router;
