import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Button, Grid, List } from 'semantic-ui-react'
import DisplayMap from './DisplayMap'
import { getConfirmedTasks, claimTask } from '../state/actions/taskActions'

const ClaimTask = props => {
  let mapDisplay

  const dispatch = useDispatch()

  useEffect(() => {
    getConfirmedTasks(dispatch)
  }, [dispatch])

  if (props.showHelpMap) {
    mapDisplay = <DisplayMap />
  }

  return (
    <>
      <Grid centered>
        <Grid.Column width={14} height={14}>
          {mapDisplay}
        </Grid.Column>
      </Grid>
    </>
  )
}
const mapStateToProps = state => {
  return {
    showHelpMap: state.showHelpMap,
    userID: state.userID,
    requests: state.requests,
    message: state.message
  }
}
export default connect(mapStateToProps)(ClaimTask)
