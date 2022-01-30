const js_utils = require('./js-utils-be.js');

// RESPONSE UTILS

const res_utils = {}; //

res_utils.prepare_error_response = (obj) => {
  // pack ERF error response
  let res = {
    error: true,
    is_error_response: true,
    readme: 'this is error response'
  };
  if (js_utils.is_object(obj)) {
    if (obj.error_type) {
      res.error_type = obj.error_type;
    }
    if (obj.payload || obj.payload === false) {
      res.payload = obj.payload;
    }
    if (js_utils.is_object(obj.meta)) {
      res.meta = { ...obj.meta };
    }
  }
  // return ERROR RESPONSE
  return res;
};

res_utils.prepare_success_response = (obj) => {
  // pack SRF success response
  let res = {
    success: true,
    is_success_response: true,
    readme: 'this is success response'
  };
  if (obj.success || obj.success === false) {
    res.success = obj.success;
  }
  if (js_utils.is_object(obj)) {
    if (obj.payload || obj.payload === false) {
      res.payload = obj.payload;
    }
    if (js_utils.is_object(obj.meta)) {
      res.meta = { ...obj.meta };
    }
  }
  // return SUCCESS RESPONSE
  return res;
};


// exports.res_utils = res_utils; 
module.exports = res_utils; // default ecport