import {
  CATEGORIES_FETCH_SUCCESS,
  CATEGORY_BY_ID_FETCH_SUCCESS,
} from "../actions/actionType";

const inisialState = {
  categories: [],
  category: {},
};

function categoryReducer(state = inisialState, action) {
  switch (action.type) {
    case CATEGORIES_FETCH_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };
    case CATEGORY_BY_ID_FETCH_SUCCESS:
      return {
        ...state,
        category: action.payload,
      };
    default:
      return state;
  }
}

export default categoryReducer;
