import React from 'react'
import { onLogin } from '../modules/authentication'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Container, Modal } from 'semantic-ui-react'
const Login = props => {
  const dispatch = useDispatch()
  const authenticated = useSelector(state => state.authenticated)
  let login
  if (!authenticated) {
    login = (
      <>
        <Form id='login-form' onSubmit={event => onLogin(event, dispatch)}>
          <Form.Field>
            <input
              id='email'
              name='email'
              placeholder='Email'
              autoComplete='new-email'
            />
          </Form.Field>
          <Form.Field>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='Password'
              autoComplete='new-password'
            />
          </Form.Field>
          <Button id='login-button' type='submit' value='Login' style={{backgroundColor: '#e67276', color: 'white'}}>
            Login
          </Button>
        </Form>
        <Button
          style={{ marginTop: '10px' }}
          onClick={() => dispatch({ type: 'CLOSE_LOGIN' })}
        >
          Close
        </Button>
      </>
    )
  }
  return (
    <>
      <Modal open={true} size='mini' style={{ padding: '20px' }}>
        <Container textAlign='center'>{login}</Container>
      </Modal>
    </>
  )
}
export default Login