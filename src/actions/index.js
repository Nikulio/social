import * as types from "./types";

export const createUser = (data) => {
  return {
    type: types.CREATE_USER,
    payload: data,
  };
};

export const acceptFriendship = (data) => {
  return {
    type: types.ACCEPT_FRIENDSHIP,
    payload: data
  }
}

export const fetchUserFriends = (data) => {
  console.log("--- data", data);
  return {
    type: types.FETCH_USER_FRIENDS,
    payload: data
  }
}

export const addFriendToList = (from, to) => {

  return {
    type: types.ADD_USER_TO_LIST,
    payload: {
      from,
      to
    },
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
