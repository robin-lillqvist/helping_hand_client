import JtockAuth from "j-tockauth";

const auth = new JtockAuth({
  host: "http://localhost:3000",
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
      debugger
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
      debugger
      dispatch({ type: "GREETING", payload: error.message });
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
      debugger;
      dispatch({
        type: "AUTHENTICATE",
        payload: {
          authenticated: true,
          userEmail: response.data.email,
          userID: response.data.id,
        },
      });
      dispatch({ type: "GREETING", payload: `Welcome ${response.data.email}` });
    })
    .catch((error) => {
      debugger
      dispatch({ type: "GREETING", payload: error.data.errors });
    });
};

const onLogout = (dispatch) => {
  auth.signOut().then(() => {
    dispatch({
      type: "AUTHENTICATE",
      payload: { authenticated: false, userEmail: null },
    });
    dispatch({ type: "GREETING", payload: "See ya!" });
  });
};

export { onLogin, onLogout, onRegister };
