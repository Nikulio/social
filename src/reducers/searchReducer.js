import * as actions from "../actions/types";

export function searchReducer(state = {}, action) {
  switch (action.type) {
    case actions.FIND_USER_SUCCESS:
      return {
        ...state,
        search_friends: [action.payload.data],
      };

    default:
      return state;
  }
}
