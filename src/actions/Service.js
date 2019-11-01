import { noti } from '../utils/index';
import {
    FETCH_SERVICES,
    // FETCH_DEPARTMENT_ID,
     FETCH_SERVICE
} from './types';

import api from '../apis';
import { encryptId } from '../utils'
import { checkServerIdentity } from 'tls';
export const fetchServices = () => async dispatch => {
    try {
        const res = await  api.get(`services`)
        if (res.data) {
            dispatch({ type: FETCH_SERVICES, payload: res.data.data })
        } else {
            //Alert message
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}