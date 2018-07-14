import * as types from "../actions/types";


export function postsReducer(state = {}, action) {
    switch (action.type) {
        case types.NEW_POST_SUCCESS :
            console.log("--- action", action.payload);
            const {payload} = action
            return {...state, payload}
        default:
            return state
    }
}