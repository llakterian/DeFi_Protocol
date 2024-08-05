# DeFi Protocol

This project implements a decentralized finance (DeFi) protocol with a focus on token creation, lending, borrowing, and staking. The project consists of three main smart contracts: `MyToken`, `ConcreteLendingBorrowing`, and `ConcreteStaking`.

## Table of Contents

- [DeFi Protocol](#defi-protocol)
  - [Table of Contents](#table-of-contents)
  - [Overview](#overview)
  - [Features](#features)
  - [Smart Contracts](#smart-contracts)
    - [MyToken](#mytoken)
    - [ConcreteLendingBorrowing](#concretelendingborrowing)
    - [ConcreteStaking](#concretestaking)
  - [Deployment](#deployment)
  - [Usage](#usage)
  - [Development](#development)
  - [Contributing](#contributing)
  - [License](#license)

## Overview

The DeFi Protocol allows users to mint tokens, lend and borrow assets, and participate in staking to earn rewards. The protocol is built using Solidity and follows best practices in smart contract development.

## Features

- **Token Minting**: Users can buy `MyToken` using Ether (ETH).
- **Lending and Borrowing**: Users can deposit tokens to earn interest or take loans against their deposits.
- **Staking**: Users can stake tokens to earn rewards over time.

## Smart Contracts

### MyToken

This is an ERC20 token with an initial supply of 1,000,000 tokens. The contract allows users to buy tokens with ETH.

### ConcreteLendingBorrowing

This contract enables users to deposit tokens to earn interest and take loans. It inherits from an abstract `LendingBorrowing` contract and implements all necessary methods.

### ConcreteStaking

This contract allows users to stake tokens and earn rewards. It inherits from an abstract `Staking` contract and implements all necessary methods.

## Deployment

To deploy the smart contracts to the Sepolia testnet, follow these steps:

1. Install Truffle and dependencies:

    ```bash
    npm install -g truffle
    npm install
    ```

2. Configure the `truffle-config.js` file with your Alchemy API key and private key.

3. Compile and deploy the contracts:

    ```bash
    truffle compile
    truffle migrate --network sepolia
    ```

## Usage

1. Interact with the deployed contracts using a web3 provider (e.g., MetaMask).
2. Use the provided frontend (if available) or directly interact with the contracts via a script or Truffle console.

## Development

1. Clone the repository:

    ```bash
    git clone https://github.com/llakterian/DeFi_Protocol.git
    cd DeFi_Protocol
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run tests:

    ```bash
    truffle test
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or new features.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
