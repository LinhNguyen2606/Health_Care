import actionTypes from './actionTypes';

export const addUserSuccess = () => ({
    type: actionTypes.ADD_USER_SUCCESS,
});

export const userRegisterSuccess = (userInfo) => ({
    type: actionTypes.USER_REGISTER_SUCCESS,
    userInfo: userInfo,
});

export const userRegisterFail = () => ({
    type: actionTypes.USER_REGISTER_FAIL,
});

export const userLoginSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    userInfo: userInfo,
});

export const userLoginFail = () => ({
    type: actionTypes.USER_LOGIN_FAIL,
});

export const userLoginSocialSuccess = (userInfo) => ({
    type: actionTypes.USER_LOGIN_SOCIAL_SUCCESS,
    userInfo: userInfo,
});

export const userLoginSocialFail = () => ({
    type: actionTypes.USER_LOGIN_SOCIAL_FAIL,
});

export const processLogout = () => ({
    type: actionTypes.PROCESS_LOGOUT,
});
