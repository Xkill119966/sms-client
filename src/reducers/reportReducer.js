import {
    CREATE_REPORT,
    FETCH_REPORT,
    EDIT_REPORT,
    DELETE_REPORT,
    FETCH_REPORTS
  } from "../actions/types";
  import _ from "lodash";
  const INTIAL_STATE = {
    list:[],
    report:{}
};

  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_REPORTS:
        return { ...state, list:action.payload, };
      case FETCH_REPORT:
        return { ...state, [action.payload.id]: action.payload };
      case CREATE_REPORT:
        return { ...state, [action.payload.id]: action.payload };
      case EDIT_REPORT:
        return { ...state, [action.payload.id]: action.payload };
      case DELETE_REPORT:
        return _.omit(state, action.payload);
      default:
        return state;
    }
  };
  