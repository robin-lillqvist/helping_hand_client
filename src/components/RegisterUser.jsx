import React from "react";
import { onRegister, onLogout } from "../modules/authentication";
import { useDispatch, useSelector } from 'react-redux'

const RegisterUser = props => {
  const dispatch = useDispatch()
  const authenticated = useSelector(state => state.authenticated)

  let register
  if (authenticated) {
    register = <button onClick={() => onLogout(dispatch)}>Logout</button>
  } else {
    register = (
      <form id='register-form' onSubmit={event => onRegister(event, dispatch)}>
        <input id='email' name='email' placeholder='Email' />
        <input
          id='password'
          name='password'
          type='password'
          placeholder='Password'
        />
        <input
        name="password_confirmaton"
        type="password"
        id="password_confirmation"
      ></input>
        <input id='register-button' type='submit' value='Register' />
      </form>
    )
  }
  return (
    <form open={true}>
      {register}
      <button onClick={() => dispatch({ type: 'CLOSE_LOGIN' })}>Close</button>
    </form>
  )
}

export default RegisterUser

