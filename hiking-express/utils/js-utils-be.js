// JavaScript UTILS

const js_utils = {};

js_utils.is_object = function (obj) {
  if (obj && typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
    return true;
  }
  return false;
};


// export { js_utils };
module.exports = js_utils; // default export
