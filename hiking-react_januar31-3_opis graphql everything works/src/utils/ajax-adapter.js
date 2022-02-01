import { ajax_fetch } from "./ajax-fetch";
import config from "./config";
import { apiLib } from "./url-lib";


const CONTENT_TYPE_JSON = 'application/json';
const CONTENT_TYPE_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8';

const convert_to_json = (obj) => {
  const json = JSON.stringify(obj);
  return json;
};


const ajax = {};

ajax.ajaxHeadersConfigurator = {};
ajax.ajaxHeadersConfigurator.headers = {};
ajax.ajaxHeadersConfigurator.setHeader = (key, value) => {
  // default headers for use with ajax requests
  // real backend
  // ajax_fetch.log();
  const initial_getmethod_headers_arr = [
    [key, value]
  ];
  const initial_postmethod_headers_arr = [
    [key, value],
    ['Content-Type', CONTENT_TYPE_JSON]
  ];
  ajax_fetch.getmethod_headers_set_arr(initial_getmethod_headers_arr);
  ajax_fetch.postmethod_headers_set_arr(initial_postmethod_headers_arr);
  ajax_fetch.log();
  return true;
};


ajax.init = () => {
  // pravi backend
  ajax_fetch.init(); // INIT HEADERS FOR AJAX REQUESTS
  ajax_fetch.log();
  // const CONTENT_TYPE_JSON = CONTENT_TYPE_JSON; // 'application/json';
  const header_token_key = config.TOKEN_HEADER_KEY;
  const test_token = config.initial_token_value; // 'none_token_placeholder';
  const initial_getmethod_headers_arr = [
    [header_token_key, test_token]
  ];
  const initial_postmethod_headers_arr = [
    [header_token_key, test_token],
    ['Content-Type', CONTENT_TYPE_JSON]
  ];
  ajax_fetch.getmethod_headers_set_arr(initial_getmethod_headers_arr);
  ajax_fetch.postmethod_headers_set_arr(initial_postmethod_headers_arr);
  ajax_fetch.log();
  console.log('**** AJAX ADAPTER INIT finished')
  return true;
};


// AJAX REQUESTS

ajax.postAuthLogout = async () => {
  // real backend
  /*
  // OLD SCHOOL
  const data_prepared = convert_to_json({}); // ENCODE...
  const response = await ajax_fetch.postmethod_send(apiLib.postAuthLogout(), data_prepared);
  return response;
  */
  // GRAPHQL
  const graphql_query = {
    query: '{ authLogout(something: "something") }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await ajax_fetch.postmethod_send(apiLib.postGraphql(), data_prepared);
  return response;
};

ajax.postAuthFormLogin = async (formData) => {
  // real backend
  /*
  // OLD SCHOOL
  const data_prepared = convert_to_json({ formData }); // ENCODE...
  const response = await ajax_fetch.postmethod_send(apiLib.postAuthFormLogin(), data_prepared);
  return response;
  */
  // GRAPHQL
  /*
  {
    rollWithArguments(numDice: 3, numSides: 6)
  }
  */
  // GRAPHQL
  const graphql_query = {
    query: '{ authFormLogin( username: "' + formData.username + '" password: "' + formData.password + '") }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await ajax_fetch.postmethod_send(apiLib.postGraphql(), data_prepared);
  return response;
};

ajax.postAuthRegister = async (formData) => {
  // real backend
  /*
  // OLD SCHOOL
  const data_prepared = convert_to_json({ formData }); // ENCODE...
  const response = await ajax_fetch.postmethod_send(apiLib.postAuthRegister(), data_prepared);
  return response;
  */
  // GRAPHQL
  const graphql_query = {
    query: '{ authRegister( username: "' + formData.username + '" password: "' + formData.password + '") }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await ajax_fetch.postmethod_send(apiLib.postGraphql(), data_prepared);
  return response;
};

ajax.getAuthMyUserData = async () => {
  // real backend
  /*
  // OLD SCHOOL
  const response = await ajax_fetch.getmethod_send(apiLib.getAuthMyUserData());
  return response;
  */
  // GRAPHQL
  // const graphql_query = { query: '{ hello }' };
  // const graphql_query = { query: '{ testContext }' };
  // const graphql_query = { query: '{ myUserProfileData: {_id} }' };
  /*
  const graphql_query = gql`
  {
    myUserProfileData {
      name
      activated
    }
  }
`;
*/
  const graphql_query = {
    query: '{ myUserProfileData { _id username activated } }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await ajax_fetch.postmethod_send(apiLib.postGraphql(), data_prepared);
  return response;
};

ajax.postTourCreate = async (formData) => {
  // real backend
  /*
  // OLD SCHOOL
  const data_prepared = convert_to_json({ formData }); // ENCODE...
  const response = await ajax_fetch.postmethod_send(apiLib.postTourCreate(), data_prepared);
  return response;
  */
  // GRAPHQL
  const graphql_query = {
    query: '{ tourCreate( name: "' + formData.name + '" description: "' + formData.description + '" date: "' + formData.date + '" difficulty: "' + formData.difficulty + '" trail_length: ' + formData.trail_length + ' max_participants: ' + formData.max_participants + ') }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await ajax_fetch.postmethod_send(apiLib.postGraphql(), data_prepared);
  return response;
};

ajax.getTourAll = async () => {
  // real backend
  /*
  // OLD SCHOOL
  const response = await ajax_fetch.getmethod_send(apiLib.getTourAll());
  return response;
  */
  // GRAPHQL
  /*
  const graphql_query = {
    query: '{ tours { name description } }'
  };
  const graphql_query = {
    query: '{ tours { name description } }'
  };
  */
  const graphql_query = {
    query: '{ tours(something: "something") { _id name description date difficulty trail_length max_participants user_created date_created } }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE...
  const response = await ajax_fetch.postmethod_send(apiLib.postGraphql(), data_prepared);
  return response;
};

ajax.postTourUpdate = async (formData) => {
  // real backend
  /*
  // OLD SCHOOL
  const data_prepared = convert_to_json({ formData }); // ENCODE...
  const response = await ajax_fetch.postmethod_send(apiLib.postTourUpdate(), data_prepared);
  return response;
  */
  // GRAPHQL
  const graphql_query = {
    query: '{ tourUpdate( _id: "' + formData._id + '" name: "' + formData.name + '" description: "' + formData.description + '" date: "' + formData.date + '" difficulty: "' + formData.difficulty + '" trail_length: ' + formData.trail_length + ' max_participants: ' + formData.max_participants + ') }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await ajax_fetch.postmethod_send(apiLib.postGraphql(), data_prepared);
  return response;
};

ajax.postTourDelete = async (formData) => {
  // real backend
  /*
  // OLD SCHOOL
  const data_prepared = convert_to_json({ formData }); // ENCODE...
  const response = await ajax_fetch.postmethod_send(apiLib.postTourDelete(), data_prepared);
  return response;
  */
  // GRAPHQL
  /*
  {
    rollWithArguments(numDice: 3, numSides: 6)
  }
  */
  const graphql_query = {
    query: '{ tourDelete( tour_id: "' + formData.tour_id + '") }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await ajax_fetch.postmethod_send(apiLib.postGraphql(), data_prepared);
  return response;
};

ajax.getTourReviewsAll = async () => {
  // ....wil be finished in the future
  // GRAPHQL
  const graphql_query = {
    query: '{ reviews(something: "something") } }'
  };
  const data_prepared = convert_to_json(graphql_query); // ENCODE..
  const response = await ajax_fetch.postmethod_send(apiLib.postGraphql(), data_prepared);
  return response;
};

export default ajax;