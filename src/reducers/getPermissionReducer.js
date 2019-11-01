import {
    FETCH_PERMISSIONS
  } from "../actions/types";
  import _ from "lodash";
  const INTIAL_STATE = {
    list: [],
  };
  
  export default (state = INTIAL_STATE, action) => {
    switch (action.type) {
      case FETCH_PERMISSIONS:
        return { ...state, list: action.payload };
    //   case FETCH_COMPLAIN:
    //     return { ...state, [action.payload.id]: action.payload };
    //   case CREATE_COMPLAIN:
    //     return { ...state, [action.payload.id]: action.payload };
    //   case EDIT_COMPLAIN:
    //     return { ...state, [action.payload.id]: action.payload };
    //   case DELETE_COMPLAIN:
    //     return _.omit(state, action.payload);
      default:
        return state;
    }
  };