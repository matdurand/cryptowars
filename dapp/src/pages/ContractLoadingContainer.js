import React from "react";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";

const ContractLoading = ({ warriorLoading, children }) => (
  <LoadingOverlay
    active={warriorLoading}
    spinner
    text={"Recording on the blockchain..."}
  >
    {children}
  </LoadingOverlay>
);

const mapToState = state => ({
  warriorLoading: state.warriors.loading
});

const ContractLoadingContainer = connect(mapToState)(ContractLoading);

export default ContractLoadingContainer;
