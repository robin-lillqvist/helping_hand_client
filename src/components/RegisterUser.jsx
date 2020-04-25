import React from 'react'
import { onRegister } from '../modules/authentication'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Container, Modal } from 'semantic-ui-react'
const RegisterUser = props => {
  const dispatch = useDispatch()
  const authenticated = useSelector(state => state.authenticated)
  let register
  if (!authenticated) {
    register = (
      <>
        <Form
          id='register-form'
          onSubmit={event => onRegister(event, dispatch)}
        >
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
          <Form.Field>
            <input
              name='password_confirmaton'
              type='password'
              id='password_confirmation'
              placeholder='Confirm your password'
              autoComplete='new-password'
            ></input>
          </Form.Field>
          <Container textAlign='center'>
            <Button 
              id='register-button' 
              type='submit'
              style={{backgroundColor: '#e67276', color: 'white'}}
              >
              Register
            </Button>
          </Container>
        </Form>
        <Container textAlign='center'>
          <Button
            style={{ marginTop: '10px' }}
            onClick={() => dispatch({ type: 'CLOSE_REGISTRATION' })}
          >
            Close
          </Button>
        </Container>
      </>
    )
  }
  return (
    <>
      <Modal open={true} size='mini' style={{ padding: '20px' }}>
        <Container textAlign='center'>{register}</Container>
      </Modal>
    </>
  )
}
export default RegisterUser