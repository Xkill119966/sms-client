import history from '../router/history';
import { noti } from '../utils/index';
import {
    FETCH_REPORTS,
} from './types';

import api from '../apis';

export const fetchReport = () => async dispatch => {
    try {
        const res = await  api.get(`reports`)
        if (res.data) {
            dispatch({ type: FETCH_REPORTS, payload: res.data.data })
        } else {
            //Alert message
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}


export const putReport = (data,id) => async dispatch => {
    try {
        const res = await api.put(`reports/${id}`, data);
        if (res.data.status=="success") {
                const dep=await api.get(`reports`)
                if(dep.data.status=="success"){
                dispatch({ type: FETCH_REPORTS, payload: dep.data.data })
                noti('success', 'Successfully!', 'Report has been updated successfully.')   
                }      

        } else {
            noti('error', 'Unsuccessfully!', 'Fail to update.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }

}

export const postReport = (data) => async dispatch => {
    try {
        const res = await api.post(`reports`, data)
        if (res.data.status=="success") {
            const disres = await api.get('reports')
            if (disres.data.status=='success') {
                dispatch({ type: FETCH_REPORTS, payload: disres.data.data })
                noti('success', 'Successfully!', 'Report has been created Successfully.')
            }
        } else {
            noti('error', 'Unsuccessfully', 'Fail to create.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}

export const deleteReport = (id) => async dispatch => {
    try {
        const res = await api.delete(`reports/${id}`)
        if (res.data.status=='success') {
            const disres = await  api.get('reports')
            if (disres.data.status=='success') {
                dispatch({ type: FETCH_REPORTS, payload: disres.data.data })
                noti('success', 'Successfully!', 'Report has been deleted successfully.')
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

