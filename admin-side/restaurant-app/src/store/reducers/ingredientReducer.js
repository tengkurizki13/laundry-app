import { INGREDIENTS_FETCH_SUCCESS } from "../actions/actionType";

const inisialState = {
  ingredients: [],
};

function ingredientReducer(state = inisialState, action) {
  switch (action.type) {
    case INGREDIENTS_FETCH_SUCCESS:
      return {
        ...state,
        ingredients: action.payload,
      };
    default:
      return state;
  }
}

export default ingredientReducer;
