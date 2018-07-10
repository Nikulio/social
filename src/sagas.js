import { call, put, all, takeEvery, takeLatest } from 'redux-saga/effects'
import axios from "axios";

import history from "./history";
import * as types from "./actions/types";

const createUserApi = (data) => {
    return axios.post('/api/add/', data)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            throw new Error(error);
        })
};

const loginUserApi = (data) => {
    return axios.post('/api/login/', data)
        .then(response => {
            return response.json()
        })
        .catch(error => {
            throw error
        })
};

function* loginUser({payload}) {
    try {
        const user = yield call(loginUserApi, payload);
        yield put({type: types.CREATE_USER_SUCCESS, user: user});
    } catch (e) {
        yield put({type: types.CREATE_USER_FAILED, message: e.message});
    }
}


function* createUser({payload}) {
    try {
        const user = yield call(createUserApi, payload);
        yield put({type: types.CREATE_USER_SUCCESS, user: user});
    } catch (e) {
        yield put({type: types.CREATE_USER_FAILED, message: e.message});
    }
}

function* rootSaga() {
    yield all([
        takeEvery(types.CREATE_USER, createUser),
        takeEvery(types.LOGIN_USER, loginUser),
    ]);
}

export default rootSaga;