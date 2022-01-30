const express = require('express');
const arouter = express.Router();
const tourController = require('../controllers/tour-controller.js');


arouter.route('/')
  .get(() => {
    console.log('he he he')
  });
arouter.route('/create')
  .post(tourController.createTour);


module.exports = arouter;
