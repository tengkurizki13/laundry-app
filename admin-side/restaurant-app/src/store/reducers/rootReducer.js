import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import categoryReducer from "./categoryReducer";
import ingredientReducer from "./ingredientReducer";

const rootReducer = combineReducers({
  item: itemReducer,
  category: categoryReducer,
  ingredient: ingredientReducer,
});

export default rootReducer;
