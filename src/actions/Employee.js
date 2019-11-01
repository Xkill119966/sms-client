import history from '../router/history';
import { noti } from '../utils/index';
import {
    FETCH_EMPLOYEES,
} from './types';

import api from '../apis';
export const fetchEmployee = () => async dispatch => {
    try {
        const res = await api.get(`employees`)
        if (res.data) {
            dispatch({ type: FETCH_EMPLOYEES, payload: res.data.data })
        } else {
            //Alert message
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}


export const putEmployee = (data, id) => async dispatch => {
    try {
        const res = await api.put(`employees/${id}`, data);
        if (res.data.status == "success") {
            const dep = await api.get(`employees`)
            if (dep.data.status == "success") {
                dispatch({ type: FETCH_EMPLOYEES, payload: dep.data.data })
                noti('success', 'Successfully!', 'Employee has been updated successfully.')
            }

        } else {
            noti('error', 'Unsuccessfully!', 'Fail to update.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }

}

export const postEmployee = (data) => async dispatch => {
    try {
        const res = await api.post(`employees`, data)
        if (res.data.status == "success") {
            const disres = await api.get('employees')
            if (disres.data.status == 'success') {
                dispatch({ type: FETCH_EMPLOYEES, payload: disres.data.data })
                noti('success', 'Successfully!', 'Employee has been created Successfully.')
            }
        } else {
            noti('error', 'Unsuccessfully', 'Fail to create.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}

export const deleteEmployee = (id) => async dispatch => {
    try {
        const res = await api.delete(`employees/${id}`)
        if (res.data.status == 'success') {
            const disres = await api.get('employees')
            if (disres.data.status == 'success') {
                dispatch({ type: FETCH_EMPLOYEES, payload: disres.data.data })
                noti('success', 'Successfully!', 'Employee has been deleted successfully.')
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




