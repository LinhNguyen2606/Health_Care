import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    isLoadingRole: false,
    isLoadingPosition: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
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
        default:
            return state;
    }
};

export default adminReducer;
