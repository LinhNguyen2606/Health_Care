export const path = {
    HOME: '/',
    HOMEPAGE: '/home',
    HOMEPAGEMANAGE: '/homepage/manage',
    REGISTER: '/register',
    LOGIN: '/login',
    LOG_OUT: '/logout',
    SYSTEM: '/system',
    ACTIVE_EMAIL: '/api/user/activate/:activation_token',
    CONFIRM_EMAIL: '/confirm',
    PAGE_NOT_FOUND: '/404',
    USER_MANAGE: '/system/user-manage',
    MANAGE_DOCTOR: '/system/manage-doctor',
    DETAIL_DOCTOR: '/detail-doctor/:id',
};

export const LANGUAGES = {
    VI: 'vi',
    EN: 'en',
};

export const CRUD_ACTIONS = {
    CREATE: 'CREATE',
    EDIT: 'EDIT',
    DELETE: 'DELETE',
    READ: 'READ',
};

export const dateFormat = {
    SEND_TO_SERVER: 'DD/MM/YYYY',
};

export const YesNoObj = {
    YES: 'Y',
    NO: 'N',
};

export const USER_ROLE = {
    ADMIN: 'R1',
    DOCTOR: 'R2',
    PATIENT: 'R3',
};
