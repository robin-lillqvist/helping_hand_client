import initialState from "../store/initialState";
import * as actionTypes from "../actions/actionTypes";

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_LIST:
      return {
        ...state,
        ...action.payload,
        showHelpMap: false,
        message: false
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
        showHelpMap: false,
        message: ''
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
        showHelpMap: false
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
      };
    case actionTypes.AUTHENTICATE:
      return {
        ...state,
        ...action.payload,
        authenticated: action.payload.authenticated,
        userID: action.payload.userID,
        showLogin: false,
        showRegister: false,
        showHelpMap: false,
        showHero: false
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        products: [],
        showRequestForm: false,
        task: { products: [] },
        taskID: null,
        showLogin: false,
        showRegister: false,
        authenticated: false,
        userEmail: undefined,
        userID: undefined,
        message: action.message,
        showHelpMap: false,
        showHero: true
      };
    case actionTypes.SHOW_MAP:
      return {
        ...state,
        showHelpMap: true,
        showRequestForm: false,
        message: ''
      };
    case actionTypes.SAVE_REQUESTS:
      return {
        ...state,
        showHelpMap: true,
        requests: action.payload
      };
    default:
      return state;
  }
};
export default rootReducer;
