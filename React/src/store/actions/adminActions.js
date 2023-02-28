import {
    getAllCodeService, CreateUserApi, GetAllUserApi, DeleteUserApi, EditUserApi, getTopDoctorService,
    getListDoctor, getSaveinFoDoctor, getInfoFoDoctor
} from '../../services/UserService';
import actionTypes from './actionTypes';
import { toast, Toast } from 'react-toastify';
// export const adminLoginSuccess = (adminInfo) => ({
//     type: actionTypes.ADMIN_LOGIN_SUCCESS,
//     adminInfo: adminInfo
// })

// export const adminLoginFail = () => ({
//     type: actionTypes.ADMIN_LOGIN_FAIL
// })

// export const processLogout = () => ({
//     type: actionTypes.PROCESS_LOGOUT
// })
// 
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            //dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService('gender')

            if (res.data && res.data.errCode == 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailed())
            }
        } catch (error) {
            dispatch(fetchGenderFailed())
        }
    }

    // type: actionTypes.FETCH_GENDER_START
}
export const fetchGenderSuccess = (genderdata) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderdata
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})




export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService('position')

            if (res.data && res.data.errCode == 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailed())
            }
        } catch (error) {
            dispatch(fetchPositionFailed())
        }
    }

    // type: actionTypes.FETCH_GENDER_START
}
export const fetchPositionSuccess = (positiondata) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positiondata
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchROLEStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCodeService('role')

            if (res.data && res.data.errCode == 0) {
                dispatch(fetchROLESuccess(res.data))
            } else {
                dispatch(fetchROLEFailed())
            }
        } catch (error) {
            dispatch(fetchROLEFailed())
        }
    }

    // type: actionTypes.FETCH_GENDER_START
}
export const fetchROLESuccess = (roledata) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roledata
})
export const fetchROLEFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})


export const createNewUser = (datainput) => {
    return async (dispatch, getState) => {
        try {

            let res = await CreateUserApi(datainput)

            if (res.message.errCode === 0) {

                toast.success('create user success')
                dispatch(createNewUserSuccess())
                dispatch(fetchAllUserStart())

            } else {
                dispatch(createNewUserFailed())
            }
        } catch (error) {
            dispatch(createNewUserFailed())
        }
    }
}

export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,

})
export const createNewUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})



export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await GetAllUserApi('ALL')

            if (res && res.errCode == 0) {
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            } else {
                dispatch(fetchAllUserFailed())
            }
        } catch (error) {
            dispatch(fetchAllUserFailed())
        }
    }

    // type: actionTypes.FETCH_GENDER_START
}
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUserFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})


export const deleteUser = (dataId) => {
    return async (dispatch, getState) => {
        try {

            let res = await DeleteUserApi(dataId)

            if (res.message.errCode === 0) {
                toast.error('delete user complete1')
                dispatch(deleteNewUserSuccess())
                dispatch(fetchAllUserStart())

            } else {
                dispatch(deleteNewUserFailed())
            }
        } catch (error) {
            dispatch(deleteNewUserFailed())
        }
    }
}

export const deleteNewUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,

})
export const deleteNewUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})




export const EditUser = (datainput) => {
    return async (dispatch, getState) => {
        try {

            let res = await EditUserApi(datainput)
            if (res.message.errCode === 0) {
                toast.success('update user success')
                dispatch(EditUserSuccess())
                dispatch(fetchAllUserStart())

            } else {
                dispatch(EditUserFailed())
            }
        } catch (error) {
            dispatch(EditUserFailed())
        }
    }
}

export const EditUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,

})
export const EditUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})


export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let data = await getTopDoctorService('10')
            console.log('data', data.errCode)
            if (data.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    datadoctor: data
                })

            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
                })
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTOR_FAILED
            })
        }
    }

    // type: actionTypes.FETCH_GENDER_START
}
export const fetchTopDoctorSuccess = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,

})
export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAILED
})



export const fetchListDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let data = await getListDoctor()

            if (data.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_LIST_DOCTOR_SUCCESS,
                    ListDoctor: data.data
                })

            } else {
                console.log('failed1')
                dispatch({
                    type: actionTypes.FETCH_LIST_DOCTOR_FAILED
                })
            }
        } catch (error) {
            console.log('failed2')
            dispatch({

                type: actionTypes.FETCH_LIST_DOCTOR_FAILED
            })
        }
    }

    // type: actionTypes.FETCH_GENDER_START
}
// export const fetchListDoctorSuccess = (data) => ({
//     type: actionTypes.FETCH_LIST_DOCTOR_SUCCESS,
//     ListDoctor: data.data
// })
// export const fetchListDoctorFailed = () => ({
//     type: actionTypes.FETCH_LIST_DOCTOR_FAILED
// })



export const fetchSaveDoctor = (datainput) => {
    return async (dispatch, getState) => {
        try {
            let data = await getSaveinFoDoctor(datainput)
            console.log('datainput', datainput, data)
            if (data.errCode === 0) {
                toast.success('save info doctor complete')
                dispatch({
                    type: actionTypes.FETCH_SAVE_DOCTOR_SUCCESS,
                })

            } else {
                console.log('failed1')
                toast.error(data.errMessage)
                dispatch({
                    type: actionTypes.FETCH_SAVE_DOCTOR_FAILED
                })
            }
        } catch (error) {
            console.log('failed2', error)
            toast.error('save info doctor complete')
            dispatch({

                type: actionTypes.FETCH_SAVE_DOCTOR_FAILED
            })
        }
    }

    // type: actionTypes.FETCH_GENDER_START
}

// export const fetchGetDoctor = (datainput) => {
//     return async (dispatch, getState) => {
//         try {
//             let data = await getInfoFoDoctor(datainput)

//             if (data.errCode === 0) {
//                 dispatch({
//                     type: actionTypes.FETCH_GET_DOCTOR_SUCCESS,
//                     infoDoctor:data
//                 })

//             } else {
//                 console.log('failed1')
//                 dispatch({
//                     type: actionTypes.FETCH_GET_DOCTOR_FAILED
//                 })
//             }
//         } catch (error) {
//             console.log('failed2',error)
//             toast.error('save info doctor complete')
//             dispatch({

//                 type: actionTypes.FETCH_GET_DOCTOR_FAILED
//             })
//         }
//     }

//     // type: actionTypes.FETCH_GENDER_START
// }


export const fetchGetTimeStart = () => {
    return async (dispatch, getState) => {
        try {
            //dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCodeService('time')

            if (res.data && res.data.errCode == 0) {
                dispatch({
                    type: actionTypes.FETCH_GET_TIME_SUCCESS,
                    data: res.data.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_GET_TIME_FAILED
                })
            }
        } catch (error) {
            dispatch({
                type: actionTypes.FETCH_GET_TIME_FAILED
            })
        }
    }

    // type: actionTypes.FETCH_GENDER_START
}