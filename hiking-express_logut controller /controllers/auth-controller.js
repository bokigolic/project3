const config = require('../utils/config.js');
const User = require('../models/user-model.js');
const AuthSession = require('../models/auth-session-model.js');
const jwt = require('jsonwebtoken');
const res_utils = require('../utils/res-utils.js');


const JWT_SECRET = 'super-secret-and-long-password-protection';
const JWT_COOKIE_EXPIRES = 90 * (24 * 60 * 60 * 1000); // 90 days

const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET);
};

const decodeToken = (token) => {
  const decoded = jwt.verify(token, JWT_SECRET);
  return decoded.id;
};





// CONTROLLERS

exports.registerController = async (req, res, next) => {
  console.log('registerController');
  console.log('req.body');
  console.log(req.body);
  console.log(req.body.formData);
  /*
  const newUser = await User.create({
    username: req.body.username,
    password: req.body.password,
    activated: true
  });
  */
  try {
    console.log('test');
    const newUser = await User.create({
      ...req.body.formData,
      activated: true
    });
    console.log(newUser);
    const token = createToken(newUser._id);
    console.log('test11');
    const cookieOptions = {
      expires: new Date(Date.now() + JWT_COOKIE_EXPIRES),
    };
    res.cookie('jwt', token, cookieOptions);
    console.log('test2');
    response = res_utils.prepare_success_response({
      payload: {
        readme: 'this is response payload',
        token: token,
        user: {
          username: newUser.username,
          activated: newUser.activated,
          _id: newUser._id
        }
      }
    });
    console.log('test3');
    res.status(200).json(response);
  } catch (err) {
    response = 'errorrrr';
    response = res_utils.prepare_error_response({
      error_type: 'CATCH_ERROR_INSIDE_CIONTROLLER'
    });
    res.status(500).json(response);
  }
};


exports.logoutController = async (req, res, next) => {
  console.log('--- logoutController');
  let response;
  try {
    console.log('test1')
    const TOKEN_HEADER_KEY = config.TOKEN_HEADER_KEY;
    const token = req.headers[TOKEN_HEADER_KEY];
    console.log('token', token);
    const user_id = decodeToken(token);
    console.log('user id from decoding token', user_id);
    if (user_id) {
      const results = await AuthSession.deleteMany({
        user_id: user_id
      });
      console.log(results);
      // now its time for frontend to delete token
      const response = res_utils.prepare_success_response({
        payload: {
          message: 'succesfuly logged out from backend'
        }
      });
      res.status(200).json(response);
    }
  } catch (err) {
    response = 'errorrrr';
    response = res_utils.prepare_error_response({
      error_type: 'CATCH_ERROR_INSIDE_CIONTROLLER'
    });
    res.status(500).json(response);
  }

  // await Character.deleteMany({ name: /Stark/, age: { $gte: 18 } });
};


exports.formLoginController = async (req, res, next) => {
  console.log('formLoginController');
  console.log(req.body.formData);
  try {
    const { username, password } = req.body.formData;
    console.log(username, password);
    console.log(username && password);
    if (username && password) {
      const user = await User.findOne({ username, password });
      if (user && user._id) {
        const token = createToken(user._id);
        const sessionSuccess = await AuthSession.create({
          user_id: user._id,
          token
        });
        if (sessionSuccess) {
          const cookieOptions = {
            expires: new Date(Date.now() + JWT_COOKIE_EXPIRES),
            Path: "/"
          }
          res.cookie('jwt', token, cookieOptions);
          const response = res_utils.prepare_success_response({
            payload: {
              token: token,
              user: user
            }
          });
          res.status(200).json(response);
        } else {
          response = res_utils.prepare_error_response({
            error_type: 'auth session creation fail'
          });
          res.status(500).json(response);
        }
      } else {
        console.log('incorect email or pass');
        response = res_utils.prepare_error_response({
          error_type: 'incorect email or pass'
        });
        res.status(500).json(response);
      }
    } else {
      console.log('incorect email or pass');
      response = res_utils.prepare_error_response({
        error_type: 'incorect email or pass'
      });
      res.status(500).json(response);
    }
  } catch (err) {
    response = 'errorrrr';
    response = res_utils.prepare_error_response({
      error_type: 'CATCH_ERROR_INSIDE_CIONTROLLER'
    });
    res.status(500).json(response);
  }
};


// module.exports = authController;
