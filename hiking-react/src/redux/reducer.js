
let counter = 0;

const initialState = {
  dev_mode: false,
  drawer_opened: false,
  route_key: 'about',
  route_freshness: 0,
};

const rootReducer = (state = initialState, action) => {

  switch (action.type) {

    case 'ROUTE_SET':
      counter++
      return {
        ...state,
        route_key: action.payload,
        route_freshness: counter,
        drawer_opened: false
      };

    case 'DRAWER_OPEN':
      return {
        ...state,
        drawer_opened: true
      };

    case 'DRAWER_CLOSE':
      return {
        ...state,
        drawer_opened: false
      };

    case 'DRAWER_TOGGLE':
      if (state.drawer_opened) {
        return {
          ...state,
          drawer_opened: false
        };
      } else {
        return {
          ...state,
          drawer_opened: true
        };
      }

    case 'DEV_MODE_TOGGLE':
      if (state.dev_mode) {
        return {
          ...state,
          dev_mode: false
        };
      } else {
        return {
          ...state,
          dev_mode: true
        };
      }

    default:
      return state
  }

};

export default rootReducer;