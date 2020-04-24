import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import image from '../images/user-blank.jpg'
import { Image, Container, Grid, List, Card, Button } from 'semantic-ui-react'
import { getProfile } from '../state/actions/profileActions'

const ProfilePage = props => {
  const dispatch = useDispatch()

  useEffect(() => {
    getProfile(dispatch)
  }, [dispatch])

  let viewProfileClaimedTasks
  let viewProfileCreatedTasks
  if (
    props.claimed_tasks.length > 0 &&
    typeof props.claimed_tasks !== 'string' &&
    props.authenticated
  ) {
    viewProfileClaimedTasks = props.claimed_tasks.map(claimedTask => {
      return (
        <>
          <List.Content style={{ marginTop: '2px' }}>
            <Card>
              <Card.Content>
                <Card.Meta>Deliver to: {claimedTask.address}</Card.Meta>
                <Card.Meta>Status: {claimedTask.status}</Card.Meta>
              </Card.Content>
              <Card.Content>
                <Card.Description>
                  <strong>Products: {claimedTask.products}</strong>
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

  if (
    props.created_tasks.length > 0 &&
    typeof props.created_tasks !== 'string' &&
    props.authenticated
  ) {
    viewProfileCreatedTasks = props.created_tasks.map(createdTask => {
      return (
        <>
          <List.Content style={{ marginTop: '2px' }}>
            <Card>
              <Card.Content>
                <Card.Meta>Deliver to: {createdTask.address}</Card.Meta>
                <Card.Meta>Status: {createdTask.status}</Card.Meta>
              </Card.Content>
              <Card.Content>
                <Card.Description>
                  <strong>Products: {createdTask.products}</strong>
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
      <div>
        <Container style={{ marginTop: '15px' }}>
          <Grid columns={2} divided>
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
      <div>
        <Container style={{ marginTop: '15px' }}>
          <Grid columns={2}>
            <Grid.Column align='center'>
              <Container style={{ marginTop: '2px' }}>
                Your Requests
                <List>{viewProfileCreatedTasks}</List>
              </Container>
            </Grid.Column>
            <Grid.Column align='center'>
              <Container style={{ marginTop: '2px' }}>
                Actice Tasks
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
