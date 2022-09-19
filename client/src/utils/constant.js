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
    PAGE_NOT_FOUND: '*',
    USER_MANAGE: '/system/user-manage',
    MANAGE_DOCTOR: '/system/manage-doctor',
    DOCTOR: '/doctor/',
    DETAIL_DOCTOR: '/detail-doctor/:id',
    DETAIL_SPECIALTY: '/detail-specialty/:id',
    DETAIL_ClINIC: '/detail-clinic/:id',
    MANAGE_SCHEDULE: '/doctor/manage-schedule',
    VERIFY_EMAIL_BOOKING: '/verify-booking',
    MANAGE_SPECIALTY: '/system/manage-specialty',
    MANAGE_CLINIC: '/system/manage-clinic',
    MANAGE_PATIENT: '/doctor/manage-patient',
    MESSENGER: '/messenger',
    VIDEO_CALL: '/video-call',
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
