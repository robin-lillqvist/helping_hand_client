import React from "react";
import { LOGIN_USER, REGISTER_USER } from "../state/actions/actionTypes";
import { connect } from "react-redux";
import { useSelector } from "react-redux";



const Header = (props) => {
  const authenticated = useSelector((state) => state.authenticated);
  let name;
  let signup
  if (authenticated) {
    name = "Logout";
  } else {
    name = "Login";
    signup = 'Register'
  }
  return (
    <div>
      <h1 className="title">Helping hand</h1>
      <button
        name="login"
        id="login"
        onClick={() => props.dispatch({ type: LOGIN_USER })}
      >
        {name}
      </button>
      <button
        name="register"
        id="register"
        onClick={() => props.dispatch({ type: REGISTER_USER })}
      >{signup}</button>
    </div>
  );
};

export default connect()(Header);
