import { authenticationConstants } from '../_constants/authentication.constants';

const initialState = {
    sessionID: localStorage.getItem("adnatSessionId"),
    register_error: null,
    login_error: null
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case authenticationConstants.AUTH_SIGNUP_SUCCESS:
        case authenticationConstants.AUTH_LOGIN_SUCCESS:
            return { ...state, sessionID: action.sessionID, error: null };
        case authenticationConstants.AUTH_LOGIN_FAILED:
            return { ...state, sessionID: null, login_error: action.error }
        case authenticationConstants.AUTH_SIGNUP_FAILED:
            return { ...state, sessionID: null, register_error: action.error }
        default: return { ...state };
    }
};

export default reducer;