import React from "react";
import ReactDOM from "react-dom";
import Web3 from "web3";
import Web3Provider from "react-web3-provider";
import { saveAccountFromUrl, isAccountSelected } from "./accounts";
import ErrorPage from "./pages/ErrorPage";
import Web3App from "./Web3App";

saveAccountFromUrl();

if (isAccountSelected()) {
  ReactDOM.render(
    <Web3Provider
      defaultProvider={cb =>
        cb(
          new Web3(
            new Web3.providers.WebsocketProvider(
              "wss://rinkeby.infura.io/ws/v3/35fe24a272664aa399b0cac065acb5ee"
            )
          )
        )
      }
      loading="Loading ethereum account information.."
      error={err => `Ethereum node connection error: ${err.message}`}
    >
      <Web3App />
    </Web3Provider>,
    document.getElementById("root")
  );
} else {
  ReactDOM.render(
    <ErrorPage
      errorMessage={
        "No ethereum account provided. Use a link with a valid account."
      }
    />,
    document.getElementById("root")
  );
}
