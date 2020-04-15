import React from "react";
import { LOGIN_USER } from "../state/actions/actionTypes";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

const Header = (props) => {
  const authenticated = useSelector((state) => state.authenticated);
  let name;
  if (authenticated) {
    name = "Logout";
  } else {
    name = "Login";
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
    </div>
  );
};

export default connect()(Header);
