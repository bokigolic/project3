const config = require('../utils/config.js');
const authController = require('../controllers/auth-controller.js');
var Tour = require('../models/tour-model.js');
const res_utils = require('../utils/res-utils.js');

// var tourControler 


// CONTROLLERS

exports.createTour = async (req, res, next) => {
  console.log('--- createTour controller');
  let response;
  try {
    let error = false;
    let error_type = '';

    // STEP
    const [is_logged_in, user_id, token] = await authController.checkIsLoggedInHelper(req);
    if (is_logged_in === true) {
      //
      // STEP Mongoose model Tour make changes in MongoDB
      const newTour = await Tour.create({
        name: req.body.formData.name,
        description: req.body.formData.description,
        date: req.body.formData.date,
        difficulty: req.body.formData.difficulty,
        trail_length: req.body.formData.trail_length,
        max_participants: req.body.formData.max_participants,
        user_created: user_id
      });
      console.log('newTour');
      console.log(newTour);
      console.log('test2');
      response = res_utils.prepare_success_response({
        payload: {
          readme: 'this is createTour response payload',
          tour: {
            ...newTour._doc
          }
        }
      });
      console.log('test3');
      res.status(200).json(response);

    } else {
      error = true;
      error_type = 'you are not logged in';
    }

    if (error === true) {
      response = res_utils.prepare_error_response({
        error_type: error_type
      });
      res.status(500).json(response);
    }

  } catch (err) {
    response = res_utils.prepare_error_response({
      error_type: 'CATCH_ERROR_INSIDE_CIONTROLLER'
    });
    res.status(500).json(response);
  }
};


exports.getToursAll = async (req, res, next) => {
  console.log('--- getToursAll controller');
  let response;
  try {
    let error = false;
    let error_type = '';

    //
    // STEP Mongoose model User reading from MongoDB
    const tours = await Tour.find({});
    console.log('tours');
    console.log(typeof tours);
    // console.log(tours);
    console.log('test2');
    response = res_utils.prepare_success_response({
      payload: {
        readme: 'this is getToursAll response payload',
        tours
      }
    });
    console.log('test3');
    res.status(200).json(response);

    if (error === true) {
      response = res_utils.prepare_error_response({
        error_type: error_type
      });
      res.status(500).json(response);
    }

  } catch (err) {
    response = res_utils.prepare_error_response({
      error_type: 'CATCH_ERROR_INSIDE_CIONTROLLER'
    });
    res.status(500).json(response);
  }
};


exports.updateTour = async (req, res, next) => {
  console.log('--- updateTour controller');
  let response;
  try {
    let error = false;
    let error_type = '';

    // STEP
    const [is_logged_in, user_id, token] = await authController.checkIsLoggedInHelper(req);
    if (is_logged_in === true) {
      //
      console.log('req.body');
      console.log(req.body);
      console.log(req.body.formData);
      const tour_id = req.body.formData._id;
      let formData = req.body.formData;
      // STEP Mongoose model Tour make changes in MongoDB
      const results = await Tour.findOneAndUpdate({
        _id: tour_id,
      }, {
        ...formData
      });
      console.log('results');
      console.log(results);
      console.log('test2');
      response = res_utils.prepare_success_response({
        payload: {
          readme: 'this is updateTour response payload',
          message: 'Tour updated',
          tour: {
            results
          }
        }
      });
      console.log('test3');
      res.status(200).json(response);

    } else {
      error = true;
      error_type = 'you are not logged in';
    }

    if (error === true) {
      response = res_utils.prepare_error_response({
        error_type: error_type
      });
      res.status(500).json(response);
    }

  } catch (err) {
    response = res_utils.prepare_error_response({
      error_type: 'CATCH_ERROR_INSIDE_CIONTROLLER'
    });
    res.status(500).json(response);
  }
};


exports.deleteTour = async (req, res, next) => {
  console.log('--- deleteTour controller');
  let response;
  try {
    let error = false;
    let error_type = '';

    // STEP
    const [is_logged_in, user_id, token] = await authController.checkIsLoggedInHelper(req);
    if (is_logged_in === true) {
      //
      console.log('req.body');
      console.log(req.body);
      console.log(req.body.formData);

      // STEP Mongoose model Tour make changes in MongoDB
      const results = await Tour.findOneAndDelete({
        _id: req.body.formData.tour_id,
        user_created: user_id
      });
      console.log('results');
      console.log(results);
      console.log('test2');
      response = res_utils.prepare_success_response({
        payload: {
          readme: 'this is deleteTour response payload',
          message: 'Tour deleted'
        }
      });
      console.log('test3');
      res.status(200).json(response);

    } else {
      error = true;
      error_type = 'you are not logged in';
    }

    if (error === true) {
      response = res_utils.prepare_error_response({
        error_type: error_type
      });
      res.status(500).json(response);
    }

  } catch (err) {
    response = res_utils.prepare_error_response({
      error_type: 'CATCH_ERROR_INSIDE_CIONTROLLER'
    });
    res.status(500).json(response);
  }
};


exports.getTourReviewsAll = async (req, res, next) => {
  console.log('--- getTourReviewsAll controller');
  let response;
  try {
    let error = false;
    let error_type = '';
    // dummy response
    response = res_utils.prepare_success_response({
      payload: {
        readme: 'this is dummy getTourReviewsAll response payload',
        reviews: []
      }
    });
    console.log('test3');
    res.status(200).json(response);

    if (error === true) {
      response = res_utils.prepare_error_response({
        error_type: error_type
      });
      res.status(500).json(response);
    }

  } catch (err) {
    response = res_utils.prepare_error_response({
      error_type: 'CATCH_ERROR_INSIDE_CIONTROLLER'
    });
    res.status(500).json(response);
  }
};


// module.exports = userControler;