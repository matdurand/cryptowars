import React from "react";
import ReactDOM from "react-dom";
import Web3 from "web3";
import Web3Provider from "react-web3-provider";
import Web3App from "./Web3App";

ReactDOM.render(
  <Web3Provider
    defaultProvider={cb =>
      cb(
        new Web3(
          new Web3.providers.HttpProvider(
            "https://rinkeby.infura.io/v3/35fe24a272664aa399b0cac065acb5ee"
            //"http://127.0.0.1:8545"
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
