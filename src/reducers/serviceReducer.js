import {
    FETCH_SERVICES
  } from "../actions/types";
  import _ from "lodash";
  const INTIAL_STATE = {
    list:[],
    service:{}
};

  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_SERVICES:
        return { ...state, list:action.payload, };
      // case FETCH_SERVICE:
      //   return { ...state, [action.payload.id]: action.payload };
      // case CREATE_SERVICE:
      //   return { ...state, [action.payload.id]: action.payload };
      // case EDIT_SERVICE:
      //   return { ...state, [action.payload.id]: action.payload };
      // case DELETE_SERVICE:
      //   return _.omit(state, action.payload);
      default:
        return state;
    }
  };
  