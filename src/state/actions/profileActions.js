import axios from "axios";

const getProfile = async (dispatch) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  try {
    let response = await axios.get("/profiles", { headers: headers });
    dispatch({
      type: "VIEW_PROFILE",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "GREETING",
      payload: error.message,
    });
  }
};

export { getProfile };
