import axios from "axios";
import { VIEW_PROFILE } from "./actionTypes";

const apiURL = "http://localhost:3000/api/v1/profiles";

const fetchProfile = () => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"))
  return async dispatch => {
    let response = await axios.get(apiURL, {headers: headers});
    return dispatch(dispatchProfileAction(response.data));
  };
};
const dispatchProfileAction = json => {
  return { type: VIEW_PROFILE, payload: json };
};

export { fetchProfile };
