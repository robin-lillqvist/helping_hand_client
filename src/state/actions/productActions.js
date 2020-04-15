import axios from "axios";
import { GET_PRODUCT_LIST } from "./actionTypes";

const apiURL = 'http://localhost:3000/api/v1/products'

const fetchProducts = () => {
  return async dispatch => {
    let response = await axios.get(apiURL);
    return dispatch(dispatchProductAction(response.data));
  };
};

const dispatchProductAction = json => {
  return { type: GET_PRODUCT_LIST, payload: json }
};

export { fetchProducts };