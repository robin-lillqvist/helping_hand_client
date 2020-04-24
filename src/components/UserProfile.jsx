import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import image from '../images/user-blank.jpg'
import {
  Image,
  Container,
  Grid,
  List,
  Card,
  Button,
  GridColumn
} from 'semantic-ui-react'
import { getProfile } from '../state/actions/profileActions'

const ProfilePage = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    getProfile(dispatch)
  }, [dispatch])

  let viewProfileClaimedTasks
  let viewProfileCreatedTasks
  let claimedTaskProducts
  let createdTaskProducts

  if (
    props.claimed_tasks.length > 0 &&
    typeof props.claimed_tasks !== 'string' &&
    props.authenticated
  ) {
    viewProfileClaimedTasks = props.claimed_tasks.map(claimedTask => {
      claimedTaskProducts = claimedTask.products.map(product => {
        return (
          <div className='claimedTaskProduct'>
            <Grid columns={3} divided>
              <Grid.Column className='profileTaskProducts'>
                {product['amount']}
              </Grid.Column>
              <Grid.Column className='profileTaskProducts'>
                {product['name']}
              </Grid.Column>
              <Grid.Column className='profileTaskProducts'>
                {product['total']}
              </Grid.Column>
            </Grid>
          </div>
        )
      })

      return (
        <>
          <List.Content style={{ marginTop: '20px' }}>
            <Card>
              <Card.Content>
                <Card.Meta>Deliver to: {claimedTask.name}</Card.Meta>
                <Card.Meta>{claimedTask.address}</Card.Meta>
                <Card.Meta>Status: {claimedTask.status}</Card.Meta>
              </Card.Content>
              <Card.Content>
                <Card.Description>
                  <strong>Products: </strong>
                </Card.Description>
              </Card.Content>
              <Card.Content>
                <Card.Description>
                  <div className='claimedTaskProduct-list'>
                    {claimedTaskProducts}
                  </div>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button basic color='red'>
                  Decline
                </Button>
              </Card.Content>
            </Card>
          </List.Content>
        </>
      )
    })
  }

  if (
    props.created_tasks.length > 0 &&
    typeof props.created_tasks !== 'string' &&
    props.authenticated
  ) {
    viewProfileCreatedTasks = props.created_tasks.map(createdTask => {
      createdTaskProducts = createdTask.products.map(product => {
        return (
          <div className='createdTaskProduct'>
            <Grid columns={3} divided>
              <Grid.Column className='profileTaskProducts'>
                {product['amount']}
              </Grid.Column>
              <Grid.Column className='profileTaskProducts'>
                {product['name']}
              </Grid.Column>
              <Grid.Column className='profileTaskProducts'>
                {product['total']}
              </Grid.Column>
            </Grid>
          </div>
        )
      })
      return (
        <>
          <List.Content style={{ marginTop: '20px' }}>
            <Card >
              <Card.Content>
                <Card.Meta>Deliver to: {createdTask.name}</Card.Meta>
                <Card.Meta>{createdTask.address}</Card.Meta>
                <Card.Meta>Status: {createdTask.status}</Card.Meta>
              </Card.Content>
              <Card.Content>
                <Card.Description>
                  <strong>Products: </strong>
                </Card.Description>
              </Card.Content>
              <Card.Content>
                <Card.Description>
                  <div className='claimedTaskProduct-list'>
                    {createdTaskProducts}
                  </div>
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Button basic color='red'>
                  Remove
                </Button>
              </Card.Content>
            </Card>
          </List.Content>
        </>
      )
    })
  }

  return (
    <div id='user-profile'>
      <div >
        <Container style={{ marginTop: '15px' }}>
          <Grid columns={2} stackable>
            <Grid.Column align='center'>
              <Image src={image} size='small' />
            </Grid.Column>
            <Grid.Column align='center'>
              <Container>Name: John Doe</Container>
              <Container>Address: John Doe Street 2</Container>
              <Container>Phone: 732327892</Container>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Container style={{ marginTop: '15px' }}>
          <Grid columns={2} stackable>
            <Grid.Column align='center'>
              <Container style={{ marginTop: '2px' }}>
                You requested:
                <List>{viewProfileCreatedTasks}</List>
              </Container>
            </Grid.Column>
            <Grid.Column align='center'>
              <Container style={{ marginTop: '2px' }}>
                You wanted to help:
                <List>{viewProfileClaimedTasks}</List>
              </Container>
            </Grid.Column>
          </Grid>
        </Container>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    showProfile: state.showProfile,
    authenticated: state.authenticated,
    claimed_tasks: state.claimed_tasks,
    created_tasks: state.created_tasks
  }
}
export default connect(mapStateToProps)(ProfilePage)
