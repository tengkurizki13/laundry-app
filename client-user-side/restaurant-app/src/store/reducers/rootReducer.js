import { combineReducers } from "redux";
import requestReducer from "./requestReducer";
import trackReducer from "./trackReducer";

const rootReducer = combineReducers({
  request: requestReducer,
  track: trackReducer,
});

export default rootReducer;
