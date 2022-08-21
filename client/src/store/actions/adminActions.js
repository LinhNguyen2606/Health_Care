import actionTypes from './actionTypes';
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctorHomeService,
    getAllDoctorsService,
    saveDetailDoctorService,
} from '../../services/userService';
import { toast } from 'react-toastify';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            const res = await getAllCodeService('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log('fetchGenderFailed error', e);
        }
    };
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData,
});

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllCodeService('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log('fetchPositionFailed error', e);
        }
    };
};

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData,
});

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllCodeService('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log('fetchRoleFailed error', e);
        }
    };
};

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData,
});

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                dispatch(saveUserSuccess());
                dispatch(fetchAllUsersStart());
                toast.success('Create new user successfully');
            } else {
                dispatch(saveUserFailed());
                toast.error('Create new user unsuccessfully');
            }
        } catch (e) {
            toast.error('Create new user unsuccessfully');
            dispatch(saveUserFailed());
            console.log('saveUserFailed error', e);
        }
    };
};

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                toast.error('Fetch all users unsuccessfully');
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error('Fetch all users unsuccessfully');
            dispatch(fetchAllUsersFailed());
            console.log('fetchAllUsersFailed error', e);
        }
    };
};

const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data,
});

const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            const res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
                toast.success('Delete user successfully');
            } else {
                dispatch(deleteUserFailed());
                toast.error('Delete user unsuccessfully');
            }
        } catch (e) {
            dispatch(deleteUserFailed());
            console.log('deleteUserFailed error', e);
            toast.error('Delete user unsuccessfully');
        }
    };
};

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,
});

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await editUserService(data);
            if (res && res.errCode === 0) {
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
                toast.success('Edit user successfully');
            } else {
                dispatch(editUserFailed());
                toast.error('Edit user unsuccessfully');
            }
        } catch (e) {
            dispatch(editUserFailed());
            console.log('editUserFailed error', e);
            toast.error('Edit user unsuccessfully');
        }
    };
};

export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getTopDoctorHomeService('');
            if (res && res.errCode === 0) {
                dispatch({
                    //action
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
                });
            }
        } catch (e) {
            console.log('FETCH_TOP_DOCTORS_FAILED: ', e);
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
            });
        }
    };
};

export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllDoctorsService();
            if (res && res.errCode === 0) {
                dispatch({
                    //action
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
                });
            }
        } catch (e) {
            console.log('FETCH_ALL_DOCTORS_FAILED: ', e);
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
            });
        }
    };
};

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            if (res && res.errCode === 0) {
                toast.success('Save Infor Detail Doctor succeeded');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                });
            } else {
                toast.error('Save Infor Detail Doctor error!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                });
            }
        } catch (e) {
            toast.error('Save Infor Detail Doctor error!');
            console.log('SAVE_DETAIL_DOCTOR_FAILED', e);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            });
        }
    };
};
