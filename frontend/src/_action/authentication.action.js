import { authenticationConstants } from '../_constants/authentication.constants';

export const loginSuccess = (sessionID) => ({ type: authenticationConstants.AUTH_LOGIN_SUCCESS, sessionID });
export const loginFailed = (error) => ({ type: authenticationConstants.AUTH_LOGIN_FAILED, error });
export const login = (authData) => ({ type: authenticationConstants.AUTH_LOGIN, authData });

export const signupSuccess = (sessionID) =>({ type: authenticationConstants.AUTH_SIGNUP_SUCCESS, sessionID });
export const signupFailed = (error) => ({ type: authenticationConstants.AUTH_SIGNUP_FAILED, error });
export const signup = (authData) => ({ type: authenticationConstants.AUTH_SIGNUP, authData });

export const logoutSuccess = () => ({ type: authenticationConstants.AUTH_LOGOUT_SUCCESS });
export const logout = () => ({ type: authenticationConstants.AUTH_INITIATE_LOGOUT });