import { call, put, all, takeEvery, takeLatest } from "redux-saga/effects";
import axios from "axios";

import history from "./history";
import * as types from "./actions/types";

const createUserApi = (data) => {
  return axios
    .post("/api/add", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw new Error(error);
    });
};

const loginUserApi = (data) => {
  return axios
    .post("/api/login", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

const newPostApi = (data) => {
  return axios
    .post("/api/newpost", data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};
const initUserApi = (id) => {
  return axios
    .post("/api/user", {id: id})
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
};

function* loginUser({ payload }) {
  try {
    const user = yield call(loginUserApi, payload);
    yield put({ type: types.LOGIN_USER_SUCCESS, user: user });
  } catch (e) {
    yield put({ type: types.LOGIN_USER_FAILED, message: e.message });
  }
}

function* newPost({ payload }) {
  try {
    const newPost = yield call(newPostApi, payload);
    yield put({
      type: types.NEW_POST_SUCCESS,
      payload: newPost.data.posts[0],
    });
  } catch (e) {
    yield put({ type: types.NEW_POST_FAILED, message: e.message });
  }
}

function* createUser({ payload }) {
  try {
    const user = yield call(createUserApi, payload);
    yield put({ type: types.CREATE_USER_SUCCESS, user: user });
  } catch (e) {
    yield put({ type: types.CREATE_USER_FAILED, message: e.message });
  }
}

function* fetchPosts(id) {
  try {
    const user = yield call(createUserApi, id);
    yield put({ type: types.CREATE_USER_SUCCESS, user: user });
  } catch (e) {
    yield put({ type: types.CREATE_USER_FAILED, message: e.message });
  }
}

function* initUser(data) {
  try {
    const user = yield call(initUserApi, data.payload);
    yield put({ type: types.INIT_USER_SUCCESS, payload : user.data[0] });
  } catch (e) {
    yield put({ type: types.INIT_USER_FAILED, message: e.message });
  }
}

function* rootSaga() {
  yield all([
    takeEvery(types.CREATE_USER, createUser),
    takeEvery(types.LOGIN_USER, loginUser),
    takeEvery(types.NEW_POST, newPost),
    takeEvery(types.NEW_POST, fetchPosts),
    takeEvery(types.INIT_USER, initUser),
  ]);
}

export default rootSaga;
