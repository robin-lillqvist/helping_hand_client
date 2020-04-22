import React from 'react'
import { connect, useDispatch } from 'react-redux'
import { Button, Grid } from 'semantic-ui-react'

function Display (props) {
  let createButton
  let claimButton

  const dispatch = useDispatch()

  if (props.userID) {
    claimButton = (
      <Grid>
        <Grid.Column align='center'>
          <Button
            id='create-request'
            onClick={() =>
              dispatch({ type: 'SHOW_MAP', showRequestForm: true })
            }
          >
            Offer Help
          </Button>
        </Grid.Column>
      </Grid>
    )
  }

  if (props.userID) {
    createButton = (
      <Grid.Column align='center'>
        <Button
          id='create-request'
          onClick={() =>
            dispatch({ type: 'SHOW_REQUEST_FORM', showRequestForm: true })
          }
        >
          Create your request
        </Button>
      </Grid.Column>
    )
  }
  return <div>{createButton} {claimButton}</div>
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
    position: state.position
  }
}

export default connect(mapStateToProps)(Display)
