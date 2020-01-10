import { all, takeEvery, put, call } from 'redux-saga/effects';

import * as authActions from '../_action/authentication.action';
import * as authApi from '../_services/authentication.api';
import { authenticationConstants } from '../_constants/authentication.constants';

function* loginSaga(action){
    try {
        const response = yield call(authApi.login, action.authData);
        if (response.data.sessionId){
            yield localStorage.setItem("adnatSessionId", response.data.sessionId);
            yield put(authActions.loginSuccess(response.data.sessionId));
        }
    } catch (err) {
        if (err.response)
            yield put(authActions.loginFailed(err.response.data.error));
    }
}

function* signupSaga(action){
    try {
        const response = yield call(authApi.signup, action.authData);
        if (response.data.sessionId){
            yield localStorage.setItem("adnatSessionId", response.data.sessionId);
            yield put(authActions.signupSuccess(response.data.sessionId));
        }
    } catch (err) {
        if (err.response)
            yield put(authActions.signupFailed(err.response.data.error));
    }
}

function* logoutSaga(){
    yield call([localStorage, 'removeItem'], 'adnatSessionId');
    yield put(authActions.loginSuccess());
}

export default function* watchAuth(){
    yield all([
        yield takeEvery(authenticationConstants.AUTH_LOGIN, loginSaga),
        yield takeEvery(authenticationConstants.AUTH_SIGNUP, signupSaga),
        yield takeEvery(authenticationConstants.AUTH_INITIATE_LOGOUT, logoutSaga)
    ])
}