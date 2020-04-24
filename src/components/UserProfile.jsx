import React from 'react'
import { connect } from 'react-redux'
import image from '../images/user-blank.jpg'
import { Image, Container, Grid, List, Card } from 'semantic-ui-react'

const ProfilePage = props => {

  let viewProfileData = props.claimedTasks.map(claimedTask => {
    return (
      <>
      <Container style={{marginTop: "15px"}}>
        <Grid columns={2} divided>
          <Grid.Column align='center'>
            <Image src={image} size='small' />
          </Grid.Column>
          <Grid.Column align ='center'>
            <Container>
              NAME:
            </Container>
            <Container style={{marginTop: "2px"}}>
              <List>
                ACTIVE REQUESTS
                <List.Content>
                  <Card>{claimedTask.id}</Card>
                </List.Content>
              </List>
            </Container>
            <Container style={{marginTop: "2px"}}>
              <List>
                ACTIVE TASKS
                <List.Content>
                  <Card>a;lskdfkla</Card>      
                </List.Content>
              </List>
            </Container>
          </Grid.Column>
        </Grid>
      </Container>
      </>
    );
  });
  return <div id="user-profile">{viewProfileData}</div>;
};
const mapStateToProps = state => {
  return {
    showProfile: state.showProfile,
    claimedTasks: state.claimedTasks
  };
};
export default connect(mapStateToProps)(ProfilePage);
