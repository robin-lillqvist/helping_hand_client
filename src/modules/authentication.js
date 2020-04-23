import JtockAuth from "j-tockauth";

const auth = new JtockAuth({
  host: "https://the-helping-hand.herokuapp.com",
  // host: "http://localhost:3000",
  prefixUrl: "/api/v1",
});

const onLogin = (event, dispatch) => {
  event.preventDefault();
  auth
    .signIn(
      event.target.elements.email.value,
      event.target.elements.password.value
    )
    .then((response) => {
      dispatch({
        type: "AUTHENTICATE",
        payload: {
          authenticated: true,
          userEmail: response.data.email,
          userID: response.data.id,
        },
      });
      dispatch({
        type: "GREETING",
        payload: `Welcome ${response.data.email}`,
      });
    })
    .catch((error) => {
      dispatch({ type: "GREETING", payload: error.response.data.errors });
    });
};

const onRegister = (event, dispatch) => {
  event.preventDefault();
  auth
    .signUp({
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
      password_confirmation: event.target.elements.password_confirmation.value,
    })
    .then((response) => {
      localStorage.setItem(
        "J-tockAuth-Storage",
        JSON.stringify(response.headers)
      )
      dispatch({
        type: "AUTHENTICATE",
        payload: {
          authenticated: true,
          userEmail: response.data.data.email,
          userID: response.data.data.id,
        },
      });
      dispatch({
        type: "GREETING",
        payload: `Welcome ${response.data.data.email}`,
      });
    })
    .catch((error) => {
      dispatch({
        type: "GREETING",
        payload: error.response.data.errors.full_messages,
      });
    });
};

const onLogout = (dispatch) => {
  auth.signOut().then(() => {
    dispatch({
      type: "AUTHENTICATE",
      payload: { authenticated: false, userEmail: null },
    });
    dispatch({ type: "LOGOUT", message: "See ya!" });
  });
};

export { onLogin, onLogout, onRegister };
