import {
  ITEMS_BY_ID_FETCH_SUCCESS,
  ITEMS_FETCH_SUCCESS,
} from "../actions/actionType";

const inisialState = {
  items: [],
  item: {},
};

function itemReducer(state = inisialState, action) {
  switch (action.type) {
    case ITEMS_FETCH_SUCCESS:
      return {
        ...state,
        items: action.payload,
      };
    case ITEMS_BY_ID_FETCH_SUCCESS:
      return {
        ...state,
        item: action.payload,
      };
    default:
      return state;
  }
}

export default itemReducer;
