const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tour-controller.js');


router.route('/')
  .get(() => {
    console.log('he he he')
  });

// CRUD (CREATE READ UPDATE DELETE)

router.route('/create')
  .post(tourController.createTour);
router.route('/get/all')
  .get(tourController.getToursAll);
router.route('/update')
  .post(tourController.updateTour);
router.route('/delete')
  .post(tourController.deleteTour);
router.route('/reviews/get/all')
  .get(tourController.getTourReviewsAll);


module.exports = router;
