import { combineReducers } from 'redux';
// import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import streamReducer from './streamReducer';
import locale from './localeReducer'
import positionReducer from './postionReducer';
import modelReducer from './modelReducer';
import loadingReducer from './loadingReducer'
import departmentReducer from './departmentReducer';
import machineReducer from './machineReducer';
import scheduleReducer from './scheduleReducer';
import employeeReducer from './employeeReducer';
import serviceReducer from './serviceReducer';
import complainReducer from './complainReducer';
import reportReducer from './reportReducer';
import roleReducer from './roleReducer';
import userReducer from './userReducer'
import permissionReducer from './getPermissionReducer'
import moduleReducer from './moduleReducer'
export default combineReducers({
    auth: authReducer,
    streams: streamReducer,
    position: positionReducer,
    department: departmentReducer,
    model: modelReducer,
    machine: machineReducer,
    employee: employeeReducer,
    schedule: scheduleReducer,
    service: serviceReducer,
    complain: complainReducer,
    report:reportReducer,
    role : roleReducer,
    user: userReducer,
    permission: permissionReducer,
    module: moduleReducer,
    locale,
    loading: loadingReducer
});