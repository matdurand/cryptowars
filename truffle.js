const path = require("path");
var HDWalletProvider = require("truffle-hdwallet-provider");

const MNEMONIC = process.env.MNEMONIC;
if (!MNEMONIC) {
  console.error("Please set a mnemonic.");
  return;
}

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "dapp/src/contracts"),
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 4600000
    },
    ganache: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Match any network id
      gas: 4600000
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          MNEMONIC,
          "https://rinkeby.infura.io/v3/35fe24a272664aa399b0cac065acb5ee"
        );
      },
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000
    }
  }
};
