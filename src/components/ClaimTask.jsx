import React from "react";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchProducts } from "../state/actions/productActions";
import { Button, List, Container, Grid } from "semantic-ui-react";
import DisplayMap from "./DisplayMap";

const ClaimTask = (props) => {
  let displayTasks;
  let claimButton;

  const dispatch = useDispatch();

  //   const getProducts = async () => {
  //     if (props.products.length === 0) {
  //       let response = await axios.get('/products')
  //       dispatch({ type: 'GET_PRODUCT_LIST', payload: response.data })
  //     }
  //     dispatch({ type: 'SHOW_REQUEST_FORM', showRequestForm: true })
  //   }

  if (props.showHelpMap) {
    displayTasks = <DisplayMap />;
  }
  if (props.userID) {
    claimButton = (
      <Button id="create-request" onClick={dispatch({ type: "SHOW_MAP" })}>
        Offer help
      </Button>
    );
  }

  return (
    <>
      {claimButton}
      {displayTasks}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProducts: bindActionCreators(fetchProducts, dispatch),
  };
};

const mapStateToProps = (state) => {
  return {
    showHelpMap: state.showHelpMap,
    userID: state.userID,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ClaimTask);
