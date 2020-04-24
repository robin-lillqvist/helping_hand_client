import axios from "axios";
// import { VIEW_PROFILE } from "./actionTypes";

const getProfile = async (dispatch) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  try {
    let response = await axios.get("/profiles", { headers: headers });
    dispatch({
      type: "VIEW_PROFILE",
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: "GREETING",
      payload: error.message,
    });
  }
};

export { getProfile };
