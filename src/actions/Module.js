import history from '../router/history';
import { noti } from '../utils/index';
import {
    FETCH_MODULES,
} from './types';

import api from '../apis';

export const fetchModules = () => async dispatch => {
    try {
        const res = await  api.get(`module`)
        if (res.data) {
            dispatch({ type: FETCH_MODULES, payload: res.data.data })
        } else {
            //Alert message
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}





export const putModule = (data,id) => async dispatch => {
    try {
        const res = await api.put(`module/${id}`, data);
        if (res.data.status=="success") {
                const dep=await api.get(`module`)
                if(dep.data.status=="success"){
                dispatch({ type: FETCH_MODULES, payload: dep.data.data })
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

export const postModule = (data) => async dispatch => {
    try {
        const res = await api.post(`module`, data)
        if (res.data.status=="success") {
            const disres = await api.get('module')
            if (disres.data.status=='success') {
                dispatch({ type: FETCH_MODULES, payload: disres.data.data })
                noti('success', 'Successfully!', 'Model has been created Successfully.')
            }
        } else {
            noti('error', 'Unsuccessfully', 'Fail to create.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}

export const deleteModule = (id) => async dispatch => {
    try {
        const res = await api.delete(`module/${id}`)
        if (res.data.status=='success') {
            const disres = await  api.get('module')
            if (disres.data.status=='success') {
                dispatch({ type: FETCH_MODULES, payload: disres.data.data })
                noti('success', 'Successfully!', 'Model has been deleted successfully.')
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

