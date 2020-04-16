import React from 'react'
import { LOGIN_USER, REGISTER_USER } from '../state/actions/actionTypes'
import { connect } from 'react-redux'
import { useSelector } from 'react-redux'

const Header = props => {
  const authenticated = useSelector(state => state.authenticated)
  let buttons
  if (authenticated) {
    buttons = <button onClick={() => onLogout(dispatch)}>Logout</button>
  } else {
    buttons = (
      <>
        <button
          name='login'
          id='login'
          onClick={() => props.dispatch({ type: LOGIN_USER })}
        >
          Login
        </button>
        <button
          name='register'
          id='register'
          onClick={() => props.dispatch({ type: REGISTER_USER })}
        >
          Sign up
        </button>
      </>
    )
  }
  return (
    <div>
      <h1 className='title'>Helping hand</h1>
      {buttons}
    </div>
  )
}

export default connect()(Header)
