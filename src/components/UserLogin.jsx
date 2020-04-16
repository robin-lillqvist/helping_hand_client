import React from 'react'
import { onLogin } from '../modules/authentication'
import { useDispatch, useSelector } from 'react-redux'

const Login = props => {
  const dispatch = useDispatch()
  const authenticated = useSelector(state => state.authenticated)

  let login
  if (authenticated) {
    // login = <button onClick={() => onLogout(dispatch)}>Logout</button>
  } else {
    login = (
      <form id='login-form' onSubmit={event => onLogin(event, dispatch)}>
        <input id='email' name='email' placeholder='Email' autoComplete="new-email"/>
        <input
          id='password'
          name='password'
          type='password'
          placeholder='Password'
          autoComplete="new-password"
        />
        <input id='login-button' type='submit' value='Login' />
      </form>
    )
  }

  return (
    <>
      {login}
      <button onClick={() => dispatch({ type: 'CLOSE_LOGIN' })}>Close</button>
    </>
  )
}

export default Login
