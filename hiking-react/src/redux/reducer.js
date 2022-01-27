import { dummy_reviews, dummy_tours } from "../utils/dummy-data";

let counter = 0;

const initialState = {
  routeKey: 'HOME',
  routeFreshness: 0,
  toursData: {
    data: dummy_tours,
    fetching: false
  },
  reviewsData: {
    data: dummy_reviews,
    fetching: false
  },
};

const rootReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'ROUTE_SET':
      counter++
      return {
        ...state,
        route_key: action.payload,
        route_freshness: counter
      };

    default:
      return state
  }

};

export default rootReducer;