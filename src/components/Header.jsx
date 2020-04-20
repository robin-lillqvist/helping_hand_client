import React from 'react'
import { LOGIN_USER, REGISTER_USER } from '../state/actions/actionTypes'
import { onLogout } from '../modules/authentication'
import { connect, useDispatch, useSelector } from 'react-redux'
import { Button, Grid, Segment } from 'semantic-ui-react'

const Header = props => {
  const dispatch = useDispatch()
  const authenticated = useSelector(state => state.authenticated)
  let buttons
  if (authenticated) {
    buttons = (
      <Button id='Logout' onClick={() => onLogout(dispatch)}>
        Logout
      </Button>
    )
  } else {
    buttons = (
      <>
        <Button
          name='login'
          id='login'
          onClick={() => props.dispatch({ type: LOGIN_USER })}
        >
          Login
        </Button>
        <Button
          name='register'
          id='register'
          onClick={() => props.dispatch({ type: REGISTER_USER })}
        >
          Signup
        </Button>
      </>
    )
  }
  return (
    <Segment inverted color='red' tertiary>
      <Grid>
        <Grid.Column className='left aligned eight wide column'>
          <h1 className='title'>Helping Hand</h1>
        </Grid.Column>

        <Grid.Column className='right aligned eight wide column'>
          {buttons}
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default connect()(Header)
