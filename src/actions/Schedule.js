import history from '../router/history';
import { noti } from '../utils/index';
import {
    FETCH_SCHEDULES,
    // FETCH_DEPARTMENT_ID,
     FETCH_SCHEDULE
} from './types';

import api from '../apis';
import { encryptId } from '../utils'
import { checkServerIdentity } from 'tls';
export const fetchSchedules = () => async dispatch => {
    try {
        const res = await  api.get(`schedules`)
        if (res.data) {
            dispatch({ type: FETCH_SCHEDULES, payload: res.data.data })
        } else {
            //Alert message
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}

export const fetchSchedule = (id) => async dispatch => {
    try {
        const res = await  api.get(`schedules/${id}`)
        if (res.data) {
            dispatch({ type: FETCH_SCHEDULES, payload: res.data.data })
        } else {
            //Alert message
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}

export const putSchedule = (data,id) => async dispatch => {
    try {
        const res = await api.put(`schedules/${id}`, data);
        if (res.data.status=="success") {
                const dep=await api.get(`schedules`)
                if(dep.data.status=="success"){
                dispatch({ type: FETCH_SCHEDULES, payload: dep.data.data })
                noti('success', 'Successfully!', 'Schedule has been updated successfully.')   
                }      

        } else {
            noti('error', 'Unsuccessfully!', 'Fail to update.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }

}

export const postSchedule = (data) => async dispatch => {
    try {
        const res = await api.post(`schedules`, data)
        if (res.data.status=="success") {
            const disres = await api.get('schedules')
            if (disres.data.status=='success') {
                dispatch({ type: FETCH_SCHEDULES, payload: disres.data.data })
                noti('success', 'Successfully!', 'Schedule has been created Successfully.')
            }
        } else {
            noti('error', 'Unsuccessfully', 'Fail to create.')
        }
    }
    catch (error) {
        noti('error', 'Error', 'Cannot get data from server!!!')
    }
}

export const deleteSchedule = (id) => async dispatch => {
    try {
        const res = await api.delete(`schedules/${id}`)
        if (res.data.status=='success') {
            const disres = await  api.get('schedules')
            if (disres.data.status=='success') {
                dispatch({ type: FETCH_SCHEDULES, payload: disres.data.data })
                noti('success', 'Successfully!', 'Schedule has been deleted successfully.')
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
// export const fetchContractId = (Id) => async dispatch => {
//     try {
//         const res = await api.get(/Contract/${Id})
//         if (res.data) {
//             dispatch({ type: FETCH_CONTRACT_ID, payload: res.data.data })

//         } else {
//             //Alert message

//         }
//     }
//     catch (error) {
//         console.log(error);
//         noti('error', 'Error', 'Cannot get data from server!!!')
//     }
// }


// export const postContract = (data) => async dispatch => {
//     try {
//         const res = await api.post(/Contract, data)
//         if (res.data) {
//             const disres = await api.get('/Contract')
//             if (disres.data) {
//                 dispatch({ type: FETCH_CONTRACT, payload: disres.data.data })
//                 noti('success', 'Successfully!', 'Contract has been created Successfully.')
//             }
//             history.push('/Contract/Detail/' + encryptId(res.data.data.id));
//         } else {
//             noti('error', 'Unsuccessfully', 'Fail to create.')
//         }
//     }
//     catch (error) {
//         console.log(error);
//         noti('error', 'Error', 'Cannot get data from server!!!')
//     }
// }


