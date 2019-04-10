# Cryptowars

## Contracts

### Compiling the contracts

From the root folder, launch `truffle compile`. If for some reason you want to force the compilation of unchanged files, use the `--compile-all` option.

### Deploying the contract

From the root folder, launch `truffle migrate`. If you want to reset an existing deployment, use the `--reset` option.

### Using Ganache

Ganache is a local node with a GUI that can be used instead of the truffle. A ganache node is already defined in truffle-config.js. To connect to it, use `truffle console --network ganache`.

## Demo

There is a demo of the dApp and contract at cryptowars.fun. 

You need to pass your private key in the url. **THIS IS NOT PRODUCTION READY**. To make it simple to use the app on a mobile phone, the code doesn't use Metamask. If you deploy a contract in production, use something like Metamask.

To launch the dApp, use the following pattern:
`http://cryptowars.fun?account=YOUR_PRIVATE_KEY`

## Disclamer

This code is for demonstration purposes only. **Don't use this in production as is**.