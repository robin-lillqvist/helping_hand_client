import React, { useEffect } from 'react'
import axios from 'axios'
import { connect, useDispatch } from 'react-redux'
import { Button, Container, Grid, Input, Card } from 'semantic-ui-react'
import Geocode from 'react-geocode'
import {
  getProducts,
  getCoordsFromAddress,
  submitTask
} from '../state/actions/taskActions'
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY)
const CreateRequest = props => {
  let productDisplay
  let requestProductDisplay
  let createButton
  let confirmButton
  let displayAddressInput
  let nameInput
  let phoneInput
  const dispatch = useDispatch()
  useEffect(() => {
    getProducts(props, dispatch)
  }, [props, dispatch])
  const onChangeName = event => {
    dispatch({ type: 'SET_NAME', payload: event.target.value })
  }
  const onChangePhone = event => {
    dispatch({ type: 'SET_PHONE', payload: event.target.value })
  }
  const onChangeAddress = event => {
    dispatch({ type: 'SET_ADDRESS', payload: event.target.value })
  }
  const addToRequest = async event => {
    let headers = JSON.parse(localStorage.getItem('J-tockAuth-Storage'))
    let id = event.target.parentElement.dataset.id
    let response
    if (props.task.id) {
      response = await axios.put(
        `/tasks/${props.task.id}`,
        {
          product_id: id,
          user_id: props.userID
        },
        { headers: headers }
      )
      dispatch({ type: 'GREETING', payload: response.data.message })
    } else {
      response = await axios.post(
        '/tasks',
        {
          product_id: id,
          user_id: props.userID,
          name: props.fullName,
          phone: props.phone,
          address: props.requesterAddress,
          lat: props.position.lat,
          long: props.position.lng
        },
        { headers: headers }
      )
      dispatch({ type: 'GREETING', payload: response.data.message })
    }
    dispatch({ type: 'UPDATE_REQUEST', payload: response.data.task })
  }
  if (props.showRequestForm) {
    nameInput = (
      <>
        <Grid.Column key='addressInputGrid' align='center'>
          <div>
            <Input
              id='nameInput'
              onBlur={onChangeName.bind(this)}
              placeholder='Enter Your Name'
            ></Input>
          </div>
        </Grid.Column>
      </>
    )
    phoneInput = (
      <>
        <Grid.Column key='addressInputGrid' align='center'>
          <div>
            <Input
              id='phoneInput'
              onBlur={onChangePhone.bind(this)}
              placeholder='Enter Phone Number'
            ></Input>
          </div>
        </Grid.Column>
      </>
    )
    displayAddressInput = (
      <>
        <Grid.Column key='addressInputGrid' align='center'>
          <div className='margin'>
            <Input
              color='blue'
              id='addressInput'
              onBlur={onChangeAddress.bind(this)}
              placeholder='Enter Delivery Address'
            ></Input>
          </div>
          <div className='margin'>
            <Button
              color='green' tertiary="true"
              id='addressConfirm'
              onClick={() => getCoordsFromAddress(props, dispatch)}
              style={{ marginTop: '10px' }}
            >
              Confirm Address
            </Button>
          </div>
        </Grid.Column>
      </>
    )
    if (props.position.lat) {
      productDisplay = props.products.map(product => {
        return (
          <Card key={product.id} color='red' style={{ maxWidth: '150px' }}>
            <Card.Content
              style={{ textAlign: 'center' }}
              id={`product-${product.id}`}
              key={`product-${product.id}`}
              data-cy={`product-${product.id}`}
              data-id={product.id}
              data-name={product.name}
              data-price={product.price}
            >
              <Card.Header>{product.name}</Card.Header>
              <Card.Description>{product.quantity}</Card.Description>
              <Card.Description>{product.price} SEK</Card.Description>
            </Card.Content>
            <Card.Content
              extra
              style={{ textAlign: 'center' }}
              id={`button-${product.id}`}
              key={`button-${product.id}`}
              data-cy={`button-${product.id}`}
              data-id={product.id}
              data-name={product.name}
              data-price={product.price}
            >
              <Button
                style={{
                  backgroundColor: '#e67276',
                  color: 'white',
                  marginBottom: '5px'
                }}
                size='tiny'
                id={product.id}
                key={product.id}
                onClick={addToRequest.bind(this)}
              >
                Add
              </Button>
            </Card.Content>
          </Card>
        )
      })
    }
    if (props.task.id) {
      requestProductDisplay = props.task.products.map(product => {
        return (
          <>
            <Grid.Row style={{ padding: '2px' }}>
              <Grid.Column
                compact="true"
                style={{ textAlign: 'center' }}
                key={product.name}
                id={product.name}
              >
                <span className='products-amount'>{product.amount} x </span>
                <span className='products-quantity'>{product.quantity}</span>
                <span className='products-name'>{product.name}</span>
              </Grid.Column>
            </Grid.Row>
          </>
        )
      })
      confirmButton = (
        <>
          <Grid.Column align='center'>
            <div id='orderTotal'>{props.task.total}</div>
            <Button
              id='confirm-task'
              onClick={() => submitTask(this, props, dispatch)}
            >
              Place Order
            </Button>
          </Grid.Column>
        </>
      )
    }
  }
  return (
    <>
      <div>
        {createButton}
        <Container
          id='task-name'
          style={{ marginBottom: '10px', marginTop: '10px' }}
        >
          {nameInput}
        </Container>
        <Container id='task-phone' style={{ marginBottom: '10px' }}>
          {phoneInput}
        </Container>
        <Container id='task-address' style={{ marginBottom: '10px' }}>
          {displayAddressInput}
        </Container>
        <Container>
          <div id='product-list' class='ui centered cards'>
            {productDisplay}
          </div>
        </Container>
        <Container id='request-list'>
          <Grid style={{ marginBottom: '20px', marginTop: '20px' }}>
            {requestProductDisplay}
          </Grid>
        </Container>
        <Container id='confirm-button'>{confirmButton}</Container>
      </div>
    </>
  )
}
const mapStateToProps = state => {
  return {
    products: state.products,
    showRequestForm: state.showRequestForm,
    task: state.task,
    taskProducts: state.taskProducts,
    message: state.message,
    userID: state.userID,
    requesterAddress: state.requesterAddress,
    position: state.position,
    fullName: state.fullName,
    phone: state.phone
  }
}
export default connect(mapStateToProps)(CreateRequest)
