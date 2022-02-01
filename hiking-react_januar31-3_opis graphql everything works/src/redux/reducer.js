import { dummyReviews, dummyTours } from "../utils/dummy-data";
import { INITIALIZED, AUTH_FORMLOGIN_SUCCESS, AUTH_GET_MY_USER_DATA_SUCCESS, AUTH_LOGOUT, DRAWER_CLOSE, DRAWER_OPEN, ROUTE_SET, ROUTE_WITH_PARAMS_SET, TOUR_GET_ALL_FAIL, TOUR_GET_ALL_FETCHING, TOUR_GET_ALL_SUCCESS, AUTH_REGISTER_SUCCESS } from "./actions";

let counter = 0;

const initialState = {
  initialized: false,
  route: 'HOME',
  routeParams: {},
  routeFreshness: 0,
  drawerOpened: false,
  isLoggedIn: false,
  myUserId: null,
  myUserName: '',
  toursData: {
    // data: dummyTours,
    data: [],
    fetching: false
  },
  reviewsData: {
    // data: dummyReviews,
    data: [],
    fetching: false
  },
};

const rootReducer = (state = initialState, action) => {

  switch (action.type) {

    case INITIALIZED:
      counter++
      return {
        ...state,
        initialized: true,
        routeFreshness: counter,
      };

    case ROUTE_SET:
      counter++
      return {
        ...state,
        route: action.payload,
        routeParams: {},
        routeFreshness: counter,
        drawerOpened: false // also closing drawer when rout change
      };

    case ROUTE_WITH_PARAMS_SET:
      counter++
      return {
        ...state,
        route: action.payload.route,
        routeParams: action.payload.params,
        routeFreshness: counter,
        drawerOpened: false // also closing drawer when rout change
      };

    case DRAWER_OPEN:
      return {
        ...state,
        drawerOpened: true
      };

    case DRAWER_CLOSE:
      return {
        ...state,
        drawerOpened: false
      };

    case AUTH_LOGOUT:
      counter++
      return {
        ...state,
        isLoggedIn: false,
        myUserName: '',
        myUserId: null,
        route: 'HOME', // also go to HOME route after logout
        routeFreshness: counter,
      };

    case AUTH_FORMLOGIN_SUCCESS:
      counter++
      return {
        ...state,
        route: 'HOME', // also go to HOME route after login
        routeFreshness: counter,
      };

    case AUTH_REGISTER_SUCCESS:
      counter++
      return {
        ...state,
        route: 'LOGIN', // also go to LOGIN route after register
        routeFreshness: counter,
      };

    case AUTH_GET_MY_USER_DATA_SUCCESS:
      counter++
      return {
        ...state,
        isLoggedIn: true,
        myUserName: action.payload.user.username,
        myUserId: action.payload.user._id,
        routeFreshness: counter,
      };

    case TOUR_GET_ALL_FETCHING:
      return {
        ...state,
        toursData: {
          data: [],
          fetching: true
        }
      };

    case TOUR_GET_ALL_SUCCESS:
      return {
        ...state,
        toursData: {
          data: action.payload.tours,
          fetching: false
        }
      };

    case TOUR_GET_ALL_FAIL:
      return {
        ...state,
        toursData: {
          data: [],
          fetching: false
        }
      };

    default:
      return state
  }

};

export default rootReducer;