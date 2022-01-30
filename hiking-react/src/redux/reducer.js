import { dummyReviews, dummyTours } from "../utils/dummy-data";

let counter = 0;

const initialState = {
  route: 'HOME',
  routeFreshness: 0,
  drawerOpened: false,
  isLoggedIn: false,
  myUserId: null,
  myUserName: '',
  toursData: {
    data: dummyTours,
    fetching: false
  },
  reviewsData: {
    data: dummyReviews,
    fetching: false
  },
};

const rootReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'ROUTE_SET':
      counter++
      return {
        ...state,
        route: action.payload,
        routeFreshness: counter
      };

    case 'DRAWER_OPEN':
      return {
        ...state,
        drawerOpened: true
      };

    case 'DRAWER_CLOSE':
      return {
        ...state,
        drawerOpened: false
      };

    case 'AUTH_LOGOUT':
      counter++
      return {
        ...state,
        isLoggedIn: false,
        myUserName: '',
        myUserId: null,
        route: 'HOME',
        routeFreshness: counter,
      };

    case 'AUTH_FORMLOGIN_SUCCESS':
      counter++
      return {
        ...state,
        route: 'HOME',
        routeFreshness: counter,
      };

    case 'AUTH_GET_MY_USER_DATA_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        myUserName: action.payload.user.username,
        myUserId: action.payload.user._id,
      };

    default:
      return state
  }

};

export default rootReducer;