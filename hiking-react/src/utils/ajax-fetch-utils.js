export const ajax_fetch = {};

ajax_fetch.response_json_smart = function (response) {
  if (response && typeof response.json === 'function') {
    // if this is fetch Respons object then extract json body
    return response.json();
  }
  return response;
};

// FETCHING

ajax_fetch.getmethod_send = async (url = '') => {

  let _getmethod_headers = new Headers();
  // _getmethod_headers.set(key, value);
  // Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource at http://ist.rit.edu/api/about. (Reason: CORS header ‘Access-Control-Allow-Origin’ missing).
  // Reason: CORS header 'Access-Control-Allow-Origin' missing
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/Errors/CORSMissingAllowOrigin
  // Access-Control-Allow-Origin: *
  // _getmethod_headers.set("Access-Control-Allow-Origin", "*");

  // FIX
  // https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9
  //

  // privremeno resio problem sa browser extension az Firefox: CORS Everywhere.
  // 


  // log
  console.log('ajax_fetch.getmethod_send() HEADERS: ', _getmethod_headers);
  for (var pair of _getmethod_headers.entries()) {
    console.log(pair[0] + ': ' + pair[1]); // log content of the headers
  }

  // Default options are marked with *
  return await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    redirect: "follow", // manual, *follow, error
    referrer: "no-referrer", // no-referrer, *client
    headers: _getmethod_headers
  })
  /*
    .catch(function (error) {
      console.log('catch ERROR GET ajax_fetch.getmethod_send() ');
      console.log(url);
      console.log(error);
    });
    */
};
