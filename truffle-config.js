const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  plugins: ['truffle-plugin-verify'],
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },

    // Useful for deploying to a public network.
    // Note: It's important to wrap the provider as a function to ensure truffle uses a new provider every time.
    matic: {
       provider: () => new HDWalletProvider(mnemonic, `https://polygon-mumbai.g.alchemy.com/v2/bSo8uRanqGbniOrDUntxo6ycFm7QKF-A`),
       network_id: 80001,   // Matic's id
       confirmations: 1,    // # of confirmations to wait between deployments. (default: 0)
       timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
       skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
     },
     goerli: {
      provider: () => new HDWalletProvider(mnemonic, `https://eth-goerli.g.alchemy.com/v2/m1MzTp6gqvLngZae6SHQBMYLRoE1Uet5`),
      network_id: 5,   // Goerli's id
      confirmations: 1,    // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      gas: 4465030,
      gasPrice: 10000000000,
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
  },

  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',

  // Configure your compilers
  compilers: {
    solc: {
      version: "pragma",
      optimizer: {
        enabled: true,
        runs: 200
      },
    }
  }
};
