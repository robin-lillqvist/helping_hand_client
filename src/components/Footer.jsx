import React from 'react'
import { Grid, Segment } from 'semantic-ui-react'

const Footer = () => {
  return (
    <Segment style={{ position: 'absolute', bottom: 0, width: '100%' }}>
      <Grid>
        <Grid.Column textAlign='center'>
          <i class='kickstarter icon'></i>
          <span>Find us on Kickstarter</span>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

export default Footer
