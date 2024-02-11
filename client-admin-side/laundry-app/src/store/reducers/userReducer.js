import {
  USERS_FETCH_SUCCESS,
} from "../actions/actionType";

const inisialState = {
  users: [],
};

function userReducer(state = inisialState, action) {
  switch (action.type) {
    case USERS_FETCH_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
}

export default userReducer;
