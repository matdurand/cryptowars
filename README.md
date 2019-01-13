# Cryptowars

## Contracts

### Compiling the contracts

From the root folder, launch `truffle compile`. If for some reason you want to force the compilation of unchanged files, use the `--compile-all` option.

### Deploying the contract

From the root folder, launch `truffle migrate`. If you want to reset an existing deployment, use the `--reset` option.

### Using Ganache

Ganache is a local node with a GUI that can be used instead of the truffle. A ganache node is already defined in truffle-config.js. To connect to it, use `truffle console --network ganache`.
