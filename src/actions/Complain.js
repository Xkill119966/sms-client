import history from '../router/history';
import { noti } from '../utils/index';
import {
    FETCH_COMPLAINS,
} from './types';

import api from '../apis';

export const fetchComplain = () => async dispatch => {
    try {
        const res = await  api.get(`complains`)
        if (res.data) {
            dispatch({ type: FETCH_COMPLAINS, payload: res.data.data })
        } else {
            //Alert message
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}


export const putComplain = (data,id) => async dispatch => {
    try {
        const res = await api.put(`complains/${id}`, data);
        if (res.data.status=="success") {
                const dep=await api.get(`complains`)
                if(dep.data.status=="success"){
                dispatch({ type: FETCH_COMPLAINS, payload: dep.data.data })
                noti('success', 'Successfully!', 'Complain has been updated successfully.')   
                }      

        } else {
            noti('error', 'Unsuccessfully!', 'Fail to update.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }

}

export const postComplain = (data) => async dispatch => {
    try {
        const res = await api.post(`complains`, data)
        if (res.data.status=="success") {
            const disres = await api.get('complains')
            if (disres.data.status=='success') {
                dispatch({ type: FETCH_COMPLAINS, payload: disres.data.data })
                noti('success', 'Successfully!', 'Complain has been created Successfully.')
            }
        } else {
            noti('error', 'Unsuccessfully', 'Fail to create.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}

export const deleteComplain = (id) => async dispatch => {
    try {
        const res = await api.delete(`complains/${id}`)
        if (res.data.status=='success') {
            const disres = await  api.get('complains')
            if (disres.data.status=='success') {
                dispatch({ type: FETCH_COMPLAINS, payload: disres.data.data })
                noti('success', 'Successfully!', 'Complain has been deleted successfully.')
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

