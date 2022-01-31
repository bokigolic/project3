const config = require('../utils/config.js');
const authController = require('../controllers/auth-controller.js');
var User = require('../models/user-model.js');
const res_utils = require('../utils/res-utils.js');

// var userControler 


// CONTROLLERS

exports.getMyUserData = async (req, res, next) => {
  console.log('--- getMyUserData controller');
  console.log('req.headers');
  console.log(req.headers);
  try {
    let error = false;
    let error_type = '';

    // STEP
    const [is_logged_in, user_id, token] = await authController.checkIsLoggedInHelper(req);
    if (is_logged_in === true) {
      // user is logged in on backend
      // const user_id = session.user_id;
      console.log('user_id');
      console.log(user_id);
      if (user_id) {
        // STEP Mongoose model User reading from MongoDB
        // const user = await User.findOne({ _id: user_id });
        const user = await User.findById(user_id);
        console.log('user found');
        console.log(user);
        const response = res_utils.prepare_success_response({
          payload: {
            readme: 'this is response payload getMyUserData controller',
            token: token,
            user: {
              _id: user_id,
              username: user.username,
              activated: user.activated
            }
          }
        });
        console.log('test before res');
        res.status(200).json(response);
      } else {
        error = true;
        error_type = 'user not found';
      }
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
      error_type: 'CATCH_ERROR_INSIDE_CIONTROLLER getMyUserData'
    });
    res.status(500).json(response);
  }
};


exports.getUserList = async (req, res, next) => {
};


// module.exports = userControler;
