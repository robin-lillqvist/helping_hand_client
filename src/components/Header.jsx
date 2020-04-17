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
    buttons = <Grid.Column className='right aligned' width={3}><Button onClick={() => onLogout(dispatch)}>Logout</Button></Grid.Column>
  } else {
    buttons = (
      <>
        <Grid.Column>
        <Button
            name='login'
            id='login'
            onClick={() => props.dispatch({ type: LOGIN_USER })}
          >
            Login
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button
            name='register'
            id='register'
            onClick={() => props.dispatch({ type: REGISTER_USER })}
          >
            Signup
          </Button>
        </Grid.Column>
      </>
    )
  }
  return (
    <Segment inverted>
      <Grid>
        <Grid.Column width={13}><h1 className='title'>Helping hand</h1></Grid.Column>
        {buttons}
      </Grid>
    </Segment>
  )
}

export default connect()(Header)


