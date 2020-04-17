import React from "react";
import { connect, useDispatch } from "react-redux";
import { Button, Grid } from "semantic-ui-react";
import DisplayMap from "./DisplayMap";

const dispatch = useDispatch()

const getMap = async () => {
  if (props.showHelpMap) {
    dispatch({ type: 'SHOW_MAP'})
  }

const ClaimTask = (props) => {
  let claimButton;

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
      <DisplayMap />
    </>
  );
};


const mapStateToProps = (state) => {
  return {
    showHelpMap: state.showHelpMap,
    userID: state.userID,
  };
};
export default connect(mapStateToProps)(ClaimTask, getMap);
