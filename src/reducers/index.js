import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
// import { postsReducer } from "./postsReducer";
import { userReducer } from "./userReducer";

export default combineReducers({
  form: formReducer,
  user: userReducer,
});
