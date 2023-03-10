const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGES: 'CHANGE_LANGUAGES',
    //admin
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAILED: 'FETCH_GENDER_FAILED',

    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAILED: 'FETCH_POSITION_FAILED',

    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILED: 'FETCH_ROLE_FAILED',

    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',


    FETCH_ALL_USERS_SUCCESS: 'FETCH_ALL_USERS_SUCCESS',
    FETCH_ALL_USERS_FAILED: 'FETCH_ALL_USERS_FAILED',


    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILED: 'DELETE_USER_FAILED',


    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILED: 'EDIT_USER_FAILED',


    FETCH_TOP_DOCTOR_SUCCESS: 'FETCH_TOP_DOCTOR_SUCCESS',
    FETCH_TOP_DOCTOR_FAILED: 'FETCH_TOP_DOCTOR_FAILED',

    FETCH_LIST_DOCTOR_SUCCESS: 'FETCH_LIST_DOCTOR_SUCCESS',
    FETCH_LIST_DOCTOR_FAILED: 'FETCH_LIST_DOCTOR_FAILED',


    FETCH_SAVE_DOCTOR_SUCCESS: 'FETCH_SAVE_DOCTOR_SUCCESS',
    FETCH_SAVE_DOCTOR_FAILED: 'FETCH_SAVE_DOCTOR_FAILED',

    FETCH_GET_DOCTOR_SUCCESS: 'FETCH_GET_DOCTOR_SUCCESS',
    FETCH_GET_DOCTOR_FAILED: 'FETCH_GET_DOCTOR_FAILED',



    FETCH_GET_TIME_SUCCESS: 'FETCH_GET_TIME_SUCCESS',
    FETCH_GET_TIME_FAILED: 'FETCH_GET_TIME_FAILED',

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'ADMIN_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',
})

export default actionTypes;