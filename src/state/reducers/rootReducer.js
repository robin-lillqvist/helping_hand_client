import initialState from "../store/initialState";
import * as actionTypes from "../actions/actionTypes";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_LIST:
      return {
        ...state,
        ...action.payload,
        showHelpMap: false
      };
    case actionTypes.UPDATE_REQUEST:
      return {
        ...state,
        task: action.payload,
        taskID: action.payload.id,
      };
    case actionTypes.SHOW_REQUEST_FORM:
      return {
        ...state,
        showRequestForm: action.showRequestForm,
        message: "",
      };
    case actionTypes.SHOW_ORDER_SUCCESS_MESSAGE:
      return {
        ...state,
        showSuccessMessage: action.showSuccessMessage,
        message: action.message,
      };
    case actionTypes.RESET_PAGE:
      return {
        ...state,
        showRequestForm: action.showRequestForm,
        taskID: null,
        task: { products: [] },
      };
    case actionTypes.LOGIN_USER:
      return {
        ...state,
        showLogin: true,
        showRegister: false,
        message: "",
      };
    case actionTypes.REGISTER_USER:
      return {
        ...state,
        showLogin: false,
        showRegister: true,
        message: "",
      };
    case actionTypes.CLOSE_LOGIN:
      return {
        ...state,
        showLogin: false,
        message: "",
      };
    case actionTypes.CLOSE_REGISTRATION:
      return {
        ...state,
        showRegister: false,
        message: "",
      };
    case actionTypes.GREETING:
      return {
        ...state,
        message: action.payload,
        showHelpMap: false
      };
    case actionTypes.AUTHENTICATE:
      return {
        ...state,
        ...action.payload,
        userID: action.payload.userID,
        showLogin: false,
        showRegister: false,
        showHelpMap: false
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        products: [],
        showRequestForm: false,
        task: { products: [] },
        taskID: null,
        message: "",
        showLogin: false,
        showRegister: false,
        authenticate: false,
        userEmail: undefined,
        userID: undefined,
        message: action.message,
        showHelpMap: false
      };
    case actionTypes.SHOW_MAP:
      return {
        ...state,
        showHelpMap: true
      };
    default:
      return state;
  }
};
export default rootReducer;
