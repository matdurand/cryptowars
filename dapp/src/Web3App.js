import React from "react";
import { withWeb3 } from "react-web3-provider";
import Page from "components/Page";
import PanelHeader from "components/PanelHeader";
import { Provider } from "react-redux";
import { createStore } from "./store";
import MainRouter from "routers/MainRouter";
import { getSavedAccount } from "./accounts";
import ContractLoading from "./pages/ContractLoadingContainer";

export class Web3App extends React.Component {
  state = {
    ready: false,
    error: ""
  };

  async componentDidMount() {
    const { web3 } = this.props;
    if (web3 && this.state.ready === false) {
      const account = web3.eth.accounts.privateKeyToAccount(getSavedAccount());
      const networkId = await web3.eth.net.getId();
      if (account) {
        web3.eth.accounts.wallet.add(account);
        web3.eth.defaultAccount = account.address;
        this.setState({
          ready: true,
          account: account,
          networkId: networkId,
          mainAccount: account.address
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
    const { account, networkId, mainAccount } = this.state;
    return (
      <div>
        {this.state.ready && (
          <Provider store={createStore(web3, account, networkId, mainAccount)}>
            <Page>
              <ContractLoading>
                <PanelHeader title="CryptoWars" />
                <MainRouter />
              </ContractLoading>
            </Page>
          </Provider>
        )}
        {this.state.error && <div>{this.state.error}</div>}
      </div>
    );
  }
}

export default withWeb3(Web3App);
