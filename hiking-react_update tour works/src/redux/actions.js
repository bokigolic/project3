
import ajax from "../utils/ajax-adapter";
import { ajax_fetch } from "../utils/ajax-fetch";
import { local_token_delete, local_token_get, local_token_set } from "../utils/auth-utils";
import config from "../utils/config";

export const ROUTE_SET = 'ROUTE_SET';
export const ROUTE_WITH_PARAMS_SET = 'ROUTE_WITH_PARAMS_SET';
export const DRAWER_OPEN = 'DRAWER_OPEN';
export const DRAWER_CLOSE = 'DRAWER_CLOSE';
export const AUTH_LOGOUT_FETCHING = 'AUTH_LOGOUT_FETCHING';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_REGISTER_FETCHING = 'AUTH_REGISTER_FETCHING';
export const AUTH_REGISTER_SUCCESS = 'AUTH_REGISTER_SUCCESS';
export const AUTH_REGISTER_FAIL = 'AUTH_REGISTER_FAIL';
export const AUTH_FORMLOGIN_FETCHING = 'AUTH_FORMLOGIN_FETCHING';
export const AUTH_FORMLOGIN_SUCCESS = 'AUTH_FORMLOGIN_SUCCESS';
export const AUTH_FORMLOGIN_FAIL = 'AUTH_FORMLOGIN_FAIL';
export const AUTH_GET_MY_USER_DATA_FETCHING = 'AUTH_GET_MY_USER_DATA_FETCHING';
export const AUTH_GET_MY_USER_DATA_SUCCESS = 'AUTH_GET_MY_USER_DATA_SUCCESS';
export const TOUR_CREATE_FETCHING = 'TOUR_CREATE_FETCHING';
export const TOUR_CREATE_SUCCESS = 'TOUR_CREATE_SUCCESS';
export const TOUR_CREATE_FAIL = 'TOUR_CREATE_FAIL';
export const TOUR_GET_ALL_FETCHING = 'TOUR_GET_ALL_FETCHING';
export const TOUR_GET_ALL_SUCCESS = 'TOUR_GET_ALL_SUCCESS';
export const TOUR_GET_ALL_FAIL = 'TOUR_GET_ALL_FAIL';
export const TOUR_DELETE_FETCHING = 'TOUR_DELETE_FETCHING';
export const TOUR_DELETE_SUCCESS = 'TOUR_DELETE_SUCCESS';
export const TOUR_DELETE_FAIL = 'TOUR_DELETE_FAIL';
export const TOUR_UPDATE_FETCHING = 'TOUR_UPDATE_FETCHING';
export const TOUR_UPDATE_SUCCESS = 'TOUR_UPDATE_SUCCESS';
export const TOUR_UPDATE_FAIL = 'TOUR_UPDATE_FAIL';


const errCatched = (error) => {
  console.log('errCatched');
  console.error(error);
}


export const actionRouteSet = (route) => {
  return {
    type: ROUTE_SET,
    payload: route
  }
};

export const actionRouteWithParamsSet = (route, params) => {
  return {
    type: ROUTE_WITH_PARAMS_SET,
    payload: {
      route,
      params
    }
  }
};

export const actionDrawerOpen = () => {
  return {
    type: DRAWER_OPEN
  }
};

export const actionDrawerClose = () => {
  return {
    type: DRAWER_CLOSE
  }
};


// AUTH ACTIONS

export const actionAuthLogout = () => {
  // THUNK
  return (dispatch) => {
    dispatch({
      type: AUTH_LOGOUT_FETCHING
    });

    // korak 2 - fetchujemo podatke
    ajax.postAuthLogout()
      .then(response => ajax_fetch.response_json_smart(response))
      .then((response) => {
        if (response && response.is_success_response === true) {
          // BACKEND LOGOUT FINISHED
          // now we do frontend logout procedure
          const res_payload = response.payload;
          console.log(res_payload);
          // delete token
          local_token_delete()
            .then(() => {
              // tell redux we logged out
              dispatch({
                type: AUTH_LOGOUT,
                payload: res_payload
              });
            })

        }
      })

  };
};


export const actionAuthRegister = (entbox) => {
  // THUNK
  return (dispatch) => {
    // korak 1 - dispetchujemo akciju uz prikaz spinera
    dispatch({
      type: AUTH_REGISTER_FETCHING
    });

    // korak 2 - fetchujemo podatke
    ajax.postAuthRegister(entbox)
      .then(response => {
        console.log(response);
        return response;
      })
      .then(response => ajax_fetch.response_json_smart(response))
      .then((response) => {
        // korak 3 - zavrseno fetcovanje
        // if (response.success === true) {
        console.log(response);
        if (response && response.is_success_response === true) {
          // console.log(response);
          const res_payload = response.payload;
          console.log(res_payload);
          dispatch({
            type: AUTH_REGISTER_SUCCESS,
            payload: res_payload
          });
          /*
          // KORAK cuvanje lokalnog tokena
          let token = res_payload.token;
          authUtils.localTokenSet(token)
            .then(() => {
              authUtils.ajaxTokenSet(token);
              dispatch(actionAuthAutologin()); // AUTOLOGIN...
            });
            */

          //
        } else {
          dispatch({ type: AUTH_REGISTER_FAIL });
          console.log(response);
        }
      })
      .catch(errCatched)

  }
};


export const actionAuthFormLogin = (entbox) => {
  // THUNK
  return (dispatch) => {
    // korak 1 - dispetchujemo akciju uz prikaz spinera
    dispatch({
      type: AUTH_FORMLOGIN_FETCHING
    });

    // korak 2 - fetchujemo podatke
    ajax.postAuthFormLogin(entbox)
      .then(response => {
        console.log(response);
        return response;
      })
      .then(response => ajax_fetch.response_json_smart(response))
      .then((response) => {
        // korak 3 - zavrseno fetcovanje
        // if (response.success === true) {
        console.log(response);
        if (response && response.is_success_response === true) {
          // console.log(response);
          const res_payload = response.payload;
          console.log(res_payload);
          dispatch({
            type: AUTH_FORMLOGIN_SUCCESS,
            payload: res_payload
          });
          // dispatch(actionShowToast('Sucess! DOBILI SMO TOKEN :)', tc.GREEN));
          // KORAK cuvanje lokalnog tokena
          let token = res_payload.token;
          // const TOKEN_LOCAL_KEY = config.TOKEN_LOCAL_KEY;
          const TOKEN_HEADER_KEY = config.TOKEN_HEADER_KEY;
          local_token_set(token)
            .then((token) => {
              // configure ajax headers
              ajax.ajaxHeadersConfigurator.setHeader(TOKEN_HEADER_KEY, token);
              console.log('testing autologin');
              ajax.getAuthMyUserData()
                .then(response => ajax_fetch.response_json_smart(response))
                .then((response) => {
                  if (response && response.is_success_response === true) {
                    // console.log(response);
                    const res_payload = response.payload;
                    console.log(res_payload);
                    if (res_payload && res_payload.user && res_payload.user.username) {
                      dispatch({
                        type: AUTH_GET_MY_USER_DATA_SUCCESS,
                        payload: res_payload
                      });
                    }
                  }
                })
            })

          //
        } else {
          dispatch({
            type: AUTH_FORMLOGIN_FAIL,
            payload: response
          });
          // dispatch(actionShowToast('Greska! :('));
          console.log(response);
        }
      })
      .catch(errCatched)

  }
};


export const actionAuthGetMyUserData = () => {
  // THUNK
  return (dispatch) => {
    dispatch({
      type: AUTH_GET_MY_USER_DATA_FETCHING
    });
    local_token_get()
      .then((token) => {
        console.log(token);
        const TOKEN_HEADER_KEY = config.TOKEN_HEADER_KEY;
        ajax.ajaxHeadersConfigurator.setHeader(TOKEN_HEADER_KEY, token);
        console.log('we set headers... now try getAuthMyUserData');
        ajax.getAuthMyUserData()
          .then(response => ajax_fetch.response_json_smart(response))
          .then((response) => {
            if (response && response.is_success_response === true) {
              console.log(response);
              const res_payload = response.payload;
              console.log(res_payload);
              if (res_payload && res_payload.user && res_payload.user.username) {
                dispatch({
                  type: AUTH_GET_MY_USER_DATA_SUCCESS,
                  payload: res_payload
                });
              }
            }
          })

      })

  };
};


// TOUR ACTIONS

export const actionTourCreate = (entbox) => {
  // THUNK
  return (dispatch) => {
    // korak 1 - dispetchujemo akciju uz prikaz spinera
    dispatch({
      type: TOUR_CREATE_FETCHING
    });

    // korak 2 - fetchujemo podatke
    ajax.postTourCreate(entbox)
      .then(response => {
        console.log(response);
        return response;
      })
      .then(response => ajax_fetch.response_json_smart(response))
      .then((response) => {
        // korak 3 - zavrseno fetcovanje
        // if (response.success === true) {
        console.log(response);
        if (response && response.is_success_response === true) {
          // console.log(response);
          const res_payload = response.payload;
          console.log(res_payload);
          dispatch({
            type: TOUR_CREATE_SUCCESS,
            payload: res_payload
          });
          // after creating go to my tours page
          dispatch({
            type: ROUTE_SET,
            payload: 'MY_TOURS'
          });

          //
        } else {
          dispatch({ type: TOUR_CREATE_FAIL });
          console.log(response);
        }
      })
      .catch(errCatched)

  }
};

export const actionToursDataNeeded = () => {
  // THUNK
  return (dispatch) => {
    // korak 1 - dispetchujemo akciju uz prikaz spinera
    dispatch({
      type: TOUR_GET_ALL_FETCHING
    });

    // korak 2 - fetchujemo podatke
    ajax.getTourAll()
      .then(response => {
        console.log(response);
        return response;
      })
      .then(response => ajax_fetch.response_json_smart(response))
      .then((response) => {
        // korak 3 - zavrseno fetcovanje
        // if (response.success === true) {
        console.log(response);
        if (response && response.is_success_response === true) {
          // console.log(response);
          const res_payload = response.payload;
          console.log(res_payload);
          dispatch({
            type: TOUR_GET_ALL_SUCCESS,
            payload: res_payload
          });

          //
        } else {
          dispatch({ type: TOUR_GET_ALL_FAIL });
          console.log(response);
        }
      })
      .catch(errCatched)

  }
};

export const actionTourDelete = (entbox) => {
  // THUNK
  return (dispatch) => {
    // korak 1 - dispetchujemo akciju uz prikaz spinera
    dispatch({
      type: TOUR_DELETE_FETCHING
    });

    // korak 2 - fetchujemo podatke
    ajax.postTourDelete(entbox)
      .then(response => {
        console.log(response);
        return response;
      })
      .then(response => ajax_fetch.response_json_smart(response))
      .then((response) => {
        // korak 3 - zavrseno fetcovanje
        // if (response.success === true) {
        console.log(response);
        if (response && response.is_success_response === true) {
          // console.log(response);
          const res_payload = response.payload;
          console.log(res_payload);
          dispatch({
            type: TOUR_DELETE_SUCCESS,
            payload: res_payload
          });
          // after deleting go to my tours page
          dispatch({
            type: ROUTE_SET,
            payload: 'MY_TOURS'
          });

          //
        } else {
          dispatch({ type: TOUR_DELETE_FAIL });
          console.log(response);
        }
      })
      .catch(errCatched)

  }
};

export const actionTourUpdate = (entbox) => {
  // THUNK
  return (dispatch) => {
    // korak 1 - dispetchujemo akciju uz prikaz spinera
    dispatch({
      type: TOUR_UPDATE_FETCHING
    });

    // korak 2 - fetchujemo podatke
    ajax.postTourUpdate(entbox)
      .then(response => {
        console.log(response);
        return response;
      })
      .then(response => ajax_fetch.response_json_smart(response))
      .then((response) => {
        // korak 3 - zavrseno fetcovanje
        // if (response.success === true) {
        console.log(response);
        if (response && response.is_success_response === true) {
          // console.log(response);
          const res_payload = response.payload;
          console.log(res_payload);
          dispatch({
            type: TOUR_UPDATE_SUCCESS,
            payload: res_payload
          });
          // after updating go to my tours page
          dispatch({
            type: ROUTE_SET,
            payload: 'MY_TOURS'
          });

          //
        } else {
          dispatch({ type: TOUR_UPDATE_FAIL });
          console.log(response);
        }
      })
      .catch(errCatched)

  }
};


// REVIEWS

export const actionReviewsDataNeeded = () => {
  return {
    type: 'REVIEWS_DATA_NEEDED'
  }
};