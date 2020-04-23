import React from 'react'
import image from '../images/user-blank.jpg'
import { Image, Container, Grid } from 'semantic-ui-react'

 

const ProfilePage = () => {

    return (
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
              ACTIVE REQUESTS
            </Container>
            <Container style={{marginTop: "2px"}}>
              ACTIVE TASKS
            </Container>
          </Grid.Column>
        </Grid>
      </Container>
    )
  }
 
export default ProfilePage

