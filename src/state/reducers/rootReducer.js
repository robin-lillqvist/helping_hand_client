import initialState from "../store/initialState";
import * as actionTypes from "../actions/actionTypes";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_LIST:
      return {
        ...state,
        ...action.payload
      };
      case actionTypes.SHOW_REQUEST_FORM:
      return {
        ...state,
        ...action.payload,
        showRequestForm: action.showRequestForm
      };
      default: 
      return state;
  }
};
export default rootReducer;