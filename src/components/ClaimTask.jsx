import React from "react";
import { connect, useDispatch } from "react-redux";
import { Button, Grid } from "semantic-ui-react";
import DisplayMap from "./DisplayMap";

const ClaimTask = (props) => {
  let displayTasks;
  let claimButton;

  const dispatch = useDispatch()

  if (props.showHelpMap) {
    displayTasks = <DisplayMap />;
  }
  if (props.userID) {
    claimButton = (
      <Grid.Column align='center'>
        <Button id="create-request" onClick={dispatch({ type: "SHOW_MAP" })}>
          Offer help
        </Button>
      </Grid.Column>
    );
  }

  return (
    <>
      {claimButton}
      {displayTasks}
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
