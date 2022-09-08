import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    isLoadingRole: false,
    isLoadingPosition: false,
    isLoadingAllRequiredData: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],

    allRequiredDoctorInfor: [],
    allSpecialties: [],
};

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            const copyState = { ...state };
            copyState.isLoadingGender = true;
            return {
                ...copyState,
            };
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingGender = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = true;
            state.genders = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_START:
            const copyPositionState = { ...state };
            copyPositionState.isLoadingPosition = true;
            return {
                ...copyPositionState,
            };
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            state.isLoadingPosition = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_POSITION_FAILED:
            state.isLoadingPosition = true;
            state.positions = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_START:
            const copyRoleState = { ...state };
            copyRoleState.isLoadingRole = true;
            return {
                ...copyRoleState,
            };
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            state.isLoadingRole = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_ROLE_FAILED:
            state.isLoadingRole = true;
            state.roles = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            };
        case actionTypes.FETCH_TOP_DOCTORS_FAILED:
            state.topDoctors = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_DOCTORS_FAILED:
            state.allDoctors = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START:
            const copyAllRequiredDataState = { ...state };
            copyAllRequiredDataState.isLoadingAllRequiredData = true;
            return {
                ...copyAllRequiredDataState,
            };
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;
            state.isLoadingAllRequiredData = false;
            return {
                ...state,
            };
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.isLoadingAllRequiredData = true;
            state.allRequiredDoctorInfor = [];
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_SPECIALTIES_SUCCESS:
            state.allSpecialties = action.dataSpecialty;
            return {
                ...state,
            };
        case actionTypes.FETCH_ALL_SPECIALTIES_FAILED:
            state.allSpecialties = [];
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default adminReducer;
