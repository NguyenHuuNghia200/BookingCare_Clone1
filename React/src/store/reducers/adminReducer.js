import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    genders: [],
    role: [],
    positions: [],
    users: [],
    topDoctor: [],
    listDoctor: [],
    infoDoctor: [],
    listTime: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:

            state.isLoadingGender = true

            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            state.isLoadingGender = false

            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingGender = false
            state.genders = {}
            return {
                ...state,

            }


        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data
            return {
                ...state,

            }
        case actionTypes.FETCH_POSITION_FAILED:

            state.positions = {}
            return {
                ...state,

            }



        case actionTypes.FETCH_ROLE_SUCCESS:
            state.role = action.data

            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.role = {}

            return {
                ...state,

            }


        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users

            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = {}

            return {
                ...state,

            }


        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctor = action.datadoctor

            return {
                ...state,

            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.topDoctor = []

            return {
                ...state,

            }


        case actionTypes.FETCH_LIST_DOCTOR_SUCCESS:
            state.listDoctor = action.ListDoctor

            return {
                ...state,

            }
        case actionTypes.FETCH_LIST_DOCTOR_FAILED:
            state.listDoctor = []
            return {
                ...state,

            }





        case actionTypes.FETCH_GET_TIME_SUCCESS:
            state.listTime = action.data

            return {
                ...state,

            }
        case actionTypes.FETCH_GET_TIME_FAILED:
            state.listTime = []
            return {
                ...state,

            }


        case actionTypes.FETCH_GET_DOCTOR_SUCCESS:
            state.infoDoctor = action.infoDoctor

            return {
                ...state,

            }
        case actionTypes.FETCH_GET_DOCTOR_FAILED:
            state.infoDoctor = []
            console.log('failed')
            return {
                ...state,

            }
        default:
            return state;
    }
}

export default adminReducer;