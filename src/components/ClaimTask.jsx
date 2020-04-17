import React from "react";
import { connect, useDispatch } from "react-redux";
import { Button, Grid } from "semantic-ui-react";
import DisplayMap from "./DisplayMap";

const ClaimTask = (props) => {
  let claimButton;
  let mapDisplay;

  const dispatch = useDispatch()
  
  const getMap = () => {
    if (!props.showHelpMap) {
      dispatch({ type: 'SHOW_MAP'})
    }
    else {
      dispatch({ type: 'SHOW_MAP'})
    }
  }
  if (props.showHelpMap) {
    mapDisplay = <DisplayMap />
  }
  if (props.userID) {
    claimButton = (
      <Grid.Column align='center'>
        <Button id="create-request" onClick={getMap.bind(this)}>
          Offer help
        </Button>
      </Grid.Column>
    );  
  }
  return (
    <>
      {claimButton}
      {mapDisplay}
    </>
  );
};



const mapStateToProps = (state) => {
  return {
    showHelpMap: state.showHelpMap,
    userID: state.userID,
  };
};
export default connect(mapStateToProps)(ClaimTask);
