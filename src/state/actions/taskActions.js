import axios from "axios";
import Geocode from "react-geocode";

const getConfirmedTasks = async (dispatch) => {
  let response = await axios.get("/tasks", { status: "confirmed" });
  dispatch({ type: "SAVE_REQUESTS", payload: response.data });
};

const claimTask = async (event, dispatch) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  let id = event.target.parentElement.dataset.id;
  try {
    let response = await axios.put(
      `/tasks/${id}`,
      { activity: "claimed" },
      { headers: headers }
    );
    if (response.status === 200)
      dispatch({
        type: "GREETING",
        payload: "You have claimed the task!",
      });
  } catch (error) {
    dispatch({
      type: "GREETING",
      payload: error.message,
    });
  }
};

const claimTaskMap = async (event, dispatch) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  let id = event.target.id;
  try {
    let response = await axios.put(
      `/tasks/${id}`,
      { activity: "claimed" },
      { headers: headers }
    );
    if (response.status === 200) {
      dispatch({
        type: "GREETING",
        payload: "You have claimed the task!",
      });
    }
  } catch (error) {
    dispatch({
      type: "GREETING",
      payload: error.message,
    });
  }
};

const getProducts = async (props, dispatch) => {
  if (props.products.length === 0) {
    let response = await axios.get("/products");
    dispatch({ type: "GET_PRODUCT_LIST", payload: response.data });
  }
};

const getCoordsFromAddress = async (props, dispatch) => {
  Geocode.fromAddress(props.requesterAddress).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      debugger
      dispatch({ type: "SET_COORDS", position: { lat, lng } });
      dispatch({ type: "GREETING", payload: "Your address is confirmed" });
      dispatch({ type: 'SET_ADDRESS', payload: response.results[0].formatted_address })
    },
    (error) => {
      dispatch({
        type: "SET_COORDS",
        position: { lat: null, lng: null },
      });
      dispatch({
        type: "GREETING",
        payload: "Your address could not be confirmed",
      });
    }
  );
};

const submitTask = async (event, props, dispatch) => {
  let headers = JSON.parse(localStorage.getItem("J-tockAuth-Storage"));
  if (props.task.id) {
    try {
      let response = await axios.put(
        `/tasks/${props.task.id}`,
        {
          activity: "confirmed",
          user_id: props.userID,
        },
        { headers: headers }
      );
      dispatch({
        type: "GREETING",
        payload: response.data.message,
      });
      dispatch({
        type: "RESET_PAGE",
        showRequestForm: false,
        task: { products: [] },
      });
    } catch (error) {
      dispatch({
        type: "GREETING",
        payload: error.response.data.error_message,
      });
    }
  }
};

export {
  getConfirmedTasks,
  claimTask,
  getProducts,
  getCoordsFromAddress,
  submitTask,
  claimTaskMap,
};
