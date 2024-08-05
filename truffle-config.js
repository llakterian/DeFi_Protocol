const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();
console.log("MNEMONIC:", process.env.MNEMONIC);
console.log("ALCHEMY_API_KEY:", process.env.ALCHEMY_API_KEY);

const mnemonic = process.env.MNEMONIC;
const alchemyKey = process.env.ALCHEMY_API_KEY;


module.exports = {
  networks: {
    sepolia: {
      provider: () =>
        new HDWalletProvider({
          mnemonic: {
            phrase: mnemonic
          },
          providerOrUrl: `https://eth-sepolia.g.alchemy.com/v2/${alchemyKey}`,
          pollingInterval: 8000, // Increase polling interval
        }),
      network_id: 11155111,
      timeoutBlocks: 200, // Increase timeout blocks
      networkCheckTimeout: 1000000, // Increase network check timeout
      confirmations: 2,
      skipDryRun: true,
      gas: 5000000,
      gasPrice: 20000000000,
    },
  },
  compilers: {
    solc: {
      version: "^0.8.20",
    },
  },
};
