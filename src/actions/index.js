import * as types from "./types";

export const createUser = (data) => {
    return {
        type : types.CREATE_USER,
        payload: data
    }
}

export const loginUser = (data) => {
    return {
        type : types.LOGIN_USER,
        payload: data
    }
}