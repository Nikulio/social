import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { userReducer } from "./userReducer";
import { searchReducer } from "./searchReducer";

export default combineReducers({
  form: formReducer,
  user: userReducer,
  search: searchReducer
});
