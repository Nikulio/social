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

export const newPost = (data, user) => {
    return {
        type : types.NEW_POST,
        payload: {
            data,
            user
        }
    }
}