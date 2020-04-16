import React from 'react'
import { onRegister } from '../modules/authentication'
import { useDispatch, useSelector } from 'react-redux'

const RegisterUser = props => {
  const dispatch = useDispatch()
  const authenticated = useSelector(state => state.authenticated)

  let register
  if (authenticated) {
    // register = <button onClick={() => onLogout(dispatch)}>Logout</button>
  } else {
    register = (
      <>
        <form
          id='register-form'
          onSubmit={event => onRegister(event, dispatch)}
        >
          <input id='email' name='email' placeholder='Email' autoComplete="new-email"/>
          <input
            id='password'
            name='password'
            type='password'
            placeholder='Password'
            autoComplete="new-password"
          />
          <input
            name='password_confirmaton'
            type='password'
            id='password_confirmation'
            placeholder='Password again...'
            autoComplete="new-password"
          ></input>
          <button id='register-button' type='submit'>Register</button>
        </form>
        <button onClick={() => dispatch({ type: 'CLOSE_REGISTRATION' })}>
          Close
        </button>
      </>
    )
  }
  return <>{register}</>
}

export default RegisterUser
