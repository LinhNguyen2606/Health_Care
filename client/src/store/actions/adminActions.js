import actionTypes from './actionTypes';
import {
    getAllCodeService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
} from '../../services/userService';
import {
    getTopDoctorHomeService,
    getAllDoctorsService,
    saveDetailDoctorService,
    deleteDoctorService,
} from '../../services/doctorService';
import {
    createSpecialtyService,
    editSpecialtyService,
    deleteSpecialtyService,
    getAllSpecialties,
} from '../../services/specialtyService';
import {
    createClinicService,
    editClinicService,
    deleteClinicService,
    getAllClinics,
} from '../../services/clinicService';
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
                    dataDr: res.data.reverse(),
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
                toast.success('Create Infor Detail Doctor succeeded');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                });
            } else {
                console.log('Error: ', res);
                toast.error('Create Infor Detail Doctor error!');
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                });
            }
        } catch (e) {
            toast.error('Create Infor Detail Doctor error!');
            console.log('SAVE_DETAIL_DOCTOR_FAILED', e);
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            });
        }
    };
};

export const deleteDoctor = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            const res = await deleteDoctorService(doctorId);
            if (res && res.errCode === 0) {
                toast.success('Delete doctor successfully');
                dispatch({ type: actionTypes.DELETE_DOCTOR_SUCCESS });
                dispatch(fetchAllDoctors());
            } else {
                dispatch({ type: actionTypes.DELETE_DOCTOR_FAILED });
                toast.error('Delete doctor unsuccessfully');
            }
        } catch (e) {
            dispatch({ type: actionTypes.DELETE_DOCTOR_FAILED });
            console.log('DELETE_DOCTOR_FAILED error', e);
            toast.error('Delete doctor unsuccessfully');
        }
    };
};

export const fetchAllScheduleTime = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllCodeService('TIME');
            if (res && res.errCode === 0) {
                dispatch({
                    //action
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data,
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
                });
            }
        } catch (e) {
            console.log('FETCH_ALLCODE_SCHEDULE_TIME_FAILED: ', e);
            dispatch({
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
            });
        }
    };
};

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START });
            const resPrice = await getAllCodeService('PRICE');
            const resPayment = await getAllCodeService('PAYMENT');
            const resProvince = await getAllCodeService('PROVINCE');
            const resSpecialty = await getAllSpecialties();
            const resClinic = await getAllClinics();
            if (
                resPrice &&
                resPrice.errCode === 0 &&
                resPayment &&
                resPayment.errCode === 0 &&
                resProvince &&
                resProvince.errCode === 0 &&
                resSpecialty &&
                resSpecialty.errCode === 0 &&
                resClinic &&
                resClinic.errCode === 0
            ) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                    resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data,
                };
                dispatch(fetchRequiredDoctorInforSuccess(data));
            } else {
                dispatch(fetchRequiredDoctorInforFailed());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailed());
            console.log('fetchRequiredDoctorInforFailed error', e);
        }
    };
};

export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: allRequiredData,
});

export const fetchRequiredDoctorInforFailed = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});

export const createSpecialty = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createSpecialtyService(data);
            if (res && res.errCode === 0) {
                toast.success('Create specialty succeeded');
                dispatch({
                    type: actionTypes.CREATE_SPECIALTY_SUCCESS,
                });
                dispatch(fetchAllSpecialties());
            } else {
                toast.error('Create specialty error!');
                dispatch({
                    type: actionTypes.CREATE_SPECIALTY_FAILED,
                });
            }
        } catch (e) {
            toast.error('Create specialty error!');
            console.log('CREATE_SPECIALTY_FAILED', e);
            dispatch({
                type: actionTypes.CREATE_SPECIALTY_FAILED,
            });
        }
    };
};

export const editSpecialty = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await editSpecialtyService(data);
            if (res && res.errCode === 0) {
                toast.success('Edit specialty successfully');
                dispatch({
                    type: actionTypes.EDIT_SPECIALTY_SUCCESS,
                });
                dispatch(fetchAllSpecialties());
            } else {
                toast.error('Edit specialty unsuccessfully');
                dispatch({
                    type: actionTypes.EDIT_SPECIALTY_FAILED,
                });
            }
        } catch (e) {
            toast.error('Edit specialty unsuccessfully');
            console.log('EDIT_SPECIALTY_FAILED error', e);
            dispatch({
                type: actionTypes.EDIT_SPECIALTY_FAILED,
            });
        }
    };
};

export const deleteSpecialty = (specialtyId) => {
    return async (dispatch, getState) => {
        try {
            const res = await deleteSpecialtyService(specialtyId);
            if (res && res.errCode === 0) {
                toast.success('Delete specialty successfully');
                dispatch({ type: actionTypes.DELETE_SPECIALTY_SUCCESS });
                dispatch(fetchAllSpecialties());
            } else {
                dispatch({ type: actionTypes.DELETE_SPECIALTY_FAILED });
                toast.error('Delete specialty unsuccessfully');
            }
        } catch (e) {
            dispatch({ type: actionTypes.DELETE_SPECIALTY_FAILED });
            console.log('DELETE_SPECIALTY_FAILED error', e);
            toast.error('Delete specialty unsuccessfully');
        }
    };
};

export const fetchAllSpecialties = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllSpecialties();
            if (res && res.errCode === 0) {
                dispatch({
                    //action
                    type: actionTypes.FETCH_ALL_SPECIALTIES_SUCCESS,
                    dataSpecialty: res.data.reverse(),
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_SPECIALTIES_FAILED,
                });
            }
        } catch (e) {
            console.log('FETCH_ALL_SPECIALTIES_FAILED: ', e);
            dispatch({
                type: actionTypes.FETCH_ALL_SPECIALTIES_FAILED,
            });
        }
    };
};

export const createClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createClinicService(data);
            if (res && res.errCode === 0) {
                toast.success('Create clinic succeeded');
                dispatch({
                    type: actionTypes.CREATE_CLINIC_SUCCESS,
                });
                dispatch(fetchAllClinics());
            } else {
                toast.error('Create clinic error!');
                dispatch({
                    type: actionTypes.CREATE_CLINIC_FAILED,
                });
            }
        } catch (e) {
            toast.error('Create clinic error!');
            console.log('CREATE_CLINIC_FAILED', e);
            dispatch({
                type: actionTypes.CREATE_CLINIC_FAILED,
            });
        }
    };
};

export const editClinic = (data) => {
    return async (dispatch, getState) => {
        try {
            const res = await editClinicService(data);
            if (res && res.errCode === 0) {
                toast.success('Edit clinic successfully');
                dispatch({
                    type: actionTypes.EDIT_CLINIC_SUCCESS,
                });
                dispatch(fetchAllClinics());
            } else {
                toast.error('Edit clinic unsuccessfully');
                dispatch({
                    type: actionTypes.EDIT_CLINIC_FAILED,
                });
            }
        } catch (e) {
            toast.error('Edit clinic unsuccessfully');
            console.log('EDIT_CLINIC_FAILED error', e);
            dispatch({
                type: actionTypes.EDIT_CLINIC_FAILED,
            });
        }
    };
};

export const deleteClinic = (clinicId) => {
    return async (dispatch, getState) => {
        try {
            const res = await deleteClinicService(clinicId);
            if (res && res.errCode === 0) {
                toast.success('Delete clinic successfully');
                dispatch({ type: actionTypes.DELETE_CLINIC_SUCCESS });
                dispatch(fetchAllClinics());
            } else {
                dispatch({ type: actionTypes.DELETE_CLINIC_FAILED });
                toast.error('Delete clinic unsuccessfully');
            }
        } catch (e) {
            dispatch({ type: actionTypes.DELETE_CLINIC_FAILED });
            console.log('DELETE_CLINIC_FAILED error', e);
            toast.error('Delete clinic unsuccessfully');
        }
    };
};

export const fetchAllClinics = () => {
    return async (dispatch, getState) => {
        try {
            const res = await getAllClinics();
            if (res && res.errCode === 0) {
                dispatch({
                    //action
                    type: actionTypes.FETCH_ALL_CLINICS_SUCCESS,
                    dataClinic: res.data.reverse(),
                });
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_CLINICS_FAILED,
                });
            }
        } catch (e) {
            console.log('FETCH_ALL_CLINICS_FAILED: ', e);
            dispatch({
                type: actionTypes.FETCH_ALL_CLINICS_FAILED,
            });
        }
    };
};
