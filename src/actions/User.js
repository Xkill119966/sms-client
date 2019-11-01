import history from '../router/history';
import {
    FETCH_USERS,
} from './types';

import api from '../apis';
import { noti, setUserInfo, getUserInfo, setUserToken, getUserToken } from '../utils';

export const fetchUsers = () => async dispatch => {
    try {
        var saveToken = getUserToken()
        api.defaults.headers.common['Authorization'] = `Bearer ${saveToken}`
        const res = await api.get(`users`)
        if (res.data) {
            dispatch({ type: FETCH_USERS, payload: res.data.data })
        } else {
            //Alert message
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}


export const putUser = (data, id) => async dispatch => {
    try {
        var saveToken = getUserToken()
        api.defaults.headers.common['Authorization'] = `Bearer ${saveToken}`
        const res = await api.put(`users/${id}`, data);
        if (res.data.status == "success") {
            const dep = await api.get(`users`)
            if (dep.data.status == "success") {
                dispatch({ type: FETCH_USERS, payload: dep.data.data })
                noti('success', 'Successfully!', 'Model has been updated successfully.')
            }

        } else {
            noti('error', 'Unsuccessfully!', 'Fail to update.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }

}

// export const postUser = (data) => async dispatch => {
//     try {
//         const res = await api.post(`complains`, data)
//         if (res.data.status == "success") {
//             const disres = await api.get('complains')
//             if (disres.data.status == 'success') {
//                 dispatch({ type: FETCH_COMPLAINS, payload: disres.data.data })
//                 noti('success', 'Successfully!', 'Model has been created Successfully.')
//             }
//         } else {
//             noti('error', 'Unsuccessfully', 'Fail to create.')
//         }
//     }
//     catch (error) {
//         noti('error', 'Error', 'Cannot get data from server!!!')
//     }
// }

export const deleteUsers = (id) => async dispatch => {
    try {
        const res = await api.delete(`users/${id}`)
        if (res.data.status == 'success') {
            const disres = await api.get('users')
            if (disres.data.status == 'success') {
                dispatch({ type: FETCH_USERS, payload: disres.data.data })
                noti('success', 'Successfully!', 'User has been deleted successfully.')
            }
        } else {
            //Alert message
            noti('error', 'Unsuccessfully!', 'Fail to delete.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}

