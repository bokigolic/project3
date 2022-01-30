export const json_utils = {};

json_utils.is_json = function (raw) {
  // argument must be json string
  let valid = true;
  let decoded; // undefined
  try {
    decoded = JSON.parse(raw);
    console.log('CONFIRMED VALID JSON STRING :) string can be converted into JS with JSON.parse()');
  } catch (error) {
    valid = false;
    console.log('ERORR Invalid JSON string! - NOT JSON');
  }
  return valid;
};

json_utils.decode_if_json = function (raw) {
  // argument must be json string
  let valid = true;
  let decoded; // undefined
  try {
    decoded = JSON.parse(raw);
  } catch (error) {
    valid = false;
    // console.log('Invalid JSON string!');
  }
  return decoded;
};