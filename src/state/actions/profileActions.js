import axios from "axios";
import { VIEW_PROFILE } from "./actionTypes";

const getProfile = async (props, dispatch) => {
    let headers = JSON.parse(localStorage.getItem('J-tockAuth-Storage'))
      let response = await axios.get("/profiles", {headers: headers});
      let claimedTasks = response.data.claimed_tasks
      let createdTasks = response.data.created_tasks
      debugger
      dispatch({ type: "VIEW_PROFILE", claimedTasks: claimedTasks, createdTasks: createdTasks });
  };

const dispatchProfileAction = json => {
  return { type: VIEW_PROFILE, payload: json };
};

export { getProfile };
