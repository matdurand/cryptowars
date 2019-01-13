import React from "react";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";

const ContractLoading = ({ weaponsLoading, children }) => (
  <LoadingOverlay
    active={weaponsLoading}
    spinner
    text={"Recording on the blockchain..."}
  >
    {children}
  </LoadingOverlay>
);

const mapToState = state => ({
  weaponsLoading: state.weapons.loading
});

const ContractLoadingContainer = connect(mapToState)(ContractLoading);

export default ContractLoadingContainer;
