import * as types from "../actions/types";

export function userReducer(state = {}, action) {
  switch (action.type) {
    case types.INIT_USER_SUCCESS:
      return action.payload;
    case types.CREATE_USER_SUCCESS :
      return {error: false}
    case types.CREATE_USER_FAILED :
      return {error: true}
    case types.NEW_POST_SUCCESS:
      const { payload } = action;
      return {
        ...state,
        posts: [payload, ...state.posts],
      };
    default:
      return state;
  }
}
