import * as types from "./types";

export const createUser = (data) => {
  return {
    type: types.CREATE_USER,
    payload: data,
  };
};

export const initUser = (id) => {
  return {
    type: types.INIT_USER,
    payload: id,
  };
};

export const loginUser = (data) => {
  return {
    type: types.LOGIN_USER,
    payload: data,
  };
};

export const findUser = (data) => {
  return {
    type: types.FIND_USER,
    payload: data,
  };
};



export const newPost = (data, user) => {
  return {
    type: types.NEW_POST,
    payload: {
      data,
      user,
    },
  };
};
