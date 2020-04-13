import axios from "axios";
import { GET_PRODUCT_LIST } from "./actionTypes";


const fetchProducts = () => {
  return async dispatch => {
    let response = await axios.get("/products");
    return dispatch(dispatchProductAction(response.data));
  };
};


export { fetchProducts };