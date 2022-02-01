export const js_utils = {};

js_utils.is_object = function (obj) {
  if (obj && typeof obj === 'object' && !Array.isArray(obj) && obj !== null) {
    return true;
  }
  return false;
};

js_utils.is_array = function (arr) {
  if (Array.isArray(arr)) {
    return true;
  }
  return false;
};

js_utils.is_number = function (n) {
  // let n = parseFloat(_n); 
  if (!isNaN(n)) {
    // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    if (!isNaN(parseFloat(n))) {
      // ...and ensure strings of whitespace fail
      return true;
    }
  }
  return false;
};

js_utils.is_string = function (str) {
  if (typeof str === 'string') {
    return true;
  }
  return false;
};