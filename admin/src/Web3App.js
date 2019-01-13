import React from "react";
import { withWeb3 } from "react-web3-provider";
import { Provider } from "react-redux";
import { createStore } from "./store";
import MainRouter from "routers/MainRouter";
import ContractLoading from "./pages/ContractLoadingContainer";

export class Web3App extends React.Component {
  state = {
    ready: false,
    error: ""
  };

  async componentDidMount() {
    const { web3 } = this.props;
    if (web3 && this.state.ready === false) {
      const accounts = (await web3.eth.getAccounts()).map(a => a.toLowerCase());
      const networkId = await web3.eth.net.getId();
      if (accounts.length > 0) {
        this.setState({
          ready: true,
          accounts: accounts,
          networkId: networkId,
          mainAccount: accounts[0]
        });
      } else {
        this.setState({
          error: `No account provided. Use an appropriate link to access the application.`
        });
      }
    }
  }

  render() {
    const { web3 } = this.props;
    const { accounts, networkId, mainAccount } = this.state;
    return (
      <div>
        {this.state.ready && (
          <Provider store={createStore(web3, accounts, networkId, mainAccount)}>
            <ContractLoading>
              <MainRouter />
            </ContractLoading>
          </Provider>
        )}
        {this.state.error && <div>{this.state.error}</div>}
      </div>
    );
  }
}

export default withWeb3(Web3App);
