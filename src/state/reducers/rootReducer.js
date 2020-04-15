import initialState from "../store/initialState";
import * as actionTypes from "../actions/actionTypes";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_LIST:
      return {
        ...state,
        ...action.payload
      };
      case actionTypes.UPDATE_REQUEST:
      return {
        ...state,
        task: action.payload,
        taskID: action.payload.id
      };
      case actionTypes.SHOW_REQUEST_FORM:
      return {
        ...state,
        showRequestForm: action.showRequestForm,
        message: ""
      };
      case actionTypes.SHOW_ORDER_SUCCESS_MESSAGE:
      return {
        ...state,
        showSuccessMessage: action.showSuccessMessage,
        message: action.message
      };
      case actionTypes.RESET_PAGE:
      return {
        ...state,
        showRequestForm: action.showRequestForm,
        taskID: null,
        task: {products: []}
      };
      default: 
      return state;
  }
};
export default rootReducer;