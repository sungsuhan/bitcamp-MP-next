import {createAction, handleActions} from 'redux-actions'
import {call, delay, put, takeLatest, select, throttle, cancel} from 'redux-saga/effects';
import {HYDRATE} from "next-redux-wrapper"
import axios from 'axios'

const SERVER = 'http://127.0.0.1:5000'
const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege..."
}
export const initialState = {
    isLoggined: false
}

const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
const LOGIN_CANCELLED = 'auth/LOGIN_CANCELLED';
const LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAILURE = 'auth/LOGOUT_FAILURE';

export const loginRequest = createAction(LOGIN_REQUEST, data => data)
export const loginCancelled = createAction(LOGIN_CANCELLED, data => data)
export const logoutRequest = createAction(LOGOUT_REQUEST, data => data)

export function * loginSaga() {
    yield takeLatest(LOGIN_REQUEST, join);
}

function* join(action) {
    try {
        console.log(" **** 여기가 핵심 *** "+JSON.stringify(action))
        const response = yield call(loginAPI, action.payload)
        console.log(" 로그인 서버다녀옴: " + JSON.stringify(response.data))
        yield put({type: LOGIN_SUCCESS, payload: response.data})
    } catch (error) {
        yield put({type: LOGIN_FAILURE, payload: error.message})
    }
}

const loginAPI = payload => axios.post(
    `${SERVER}/user/login`,
    payload,
    {headers}
)

const login = handleActions({
    [HYDRATE] : (state, action) => ({
        ...state, ...action.payload
    })
}, initialState)

export default login