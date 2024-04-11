# Seiyaj Tech Coding Challenge

## Table of Contents

- [Prerequisites](#prerequisites)
- [Deploying the Smart contarct](#deploying-the-defaultnft)
- [Setting up the gasless minting web-service](#setting-up-the-gasless-minting-web-service)
- [Contributing](#contributing)

## Prerequisites

Before running the solution make sure you have installed:

1. Node v18.18.0
2. yarn package manager
3. If you have yarn installed run `yarn install` to install the dependencies 

## Deploying the Smart contarct

### Configuration

Inside `contracts` folder copy the `.env.example` file and rename it to `.env`.
Inside `.env` set the `DEPLOYER_KEY` variable, this private key will be used to deploy the smart contract 

### Deployment and testing

1. In your terminal open the `contracts` folder
2. Run `yarn compile` to compile the contract.
3. Run `yarn test` to test the contract.
4. Run `yarn deploy` to deploy the contract to Polygon Mumbai testnet. In the console you will see the message: `<CONTRACT_NAME> - <CONTARCT_ADDRESS>`.

### ⚠️ Warning: If redployment causes `[ SeiyajTokenModule ] reconciliation failed ` error try executing `npx hardhat clean` and remove `./ignition/deployments` folder
### ⚠️ Warning: If you have deployed a modified smart contract copy the `./contracts/artifacts/contracts/SeiyajToken.sol/SeiyajToken.json` file to `./dapp/src/` folder, so the Dapp can handle the modifications

## Setting up the Authentication server

### Configuration

Inside `auth-server` folder copy the `.env.example` file and rename it to `.env`.
Inside `.env` set the following variables:

1.  `PORT` - the port the the web-service will use (8080 by default)
2.  `TOKEN_SECRET` - JWT token secret used for user authorization.

### Running

1. In your terminal open the `auth-server` folder
2. Run `yarn start` to start the server.
3. Run `yarn start:dev` to start the server in dev mode.

## Setting up the Dapp

### Configuration

Inside `dapp` folder copy the `.env.example` file and rename it to `.env`.
Inside `.env` set the following variables:

1.  `VITE_BACKEND_URL` - the authentication server URL
2.  `VITE_TOKEN_ADDRESS` - ERC20 token address from any chain.

### Running and testing the web-service

1. In your terminal open the `dapp` folder.
2. Run `yarn dev` to start the dapp in dev mode.
3. Run `yarn preview` to start the dapp.
4. Run `yarn start:dev` to start the server in dev mode.

This application defines the following routes:

## Docker
### Prerequisites

Before running the solution as a Docker cintainer you must have:

1. Installed dependencies with `yarn install` 
2. Set up  the `.env` files for the Dapp and Authentication server
3. Docker installed on your computer

### Running in Docker
If you have finished the previous steps you must be able to run the following commands from the root folder 

1. `yarn container:up` - runs the Docker container
2. `yarn container:down` - stops the Docker container and removes Images associated

## Contributing

If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request to merge your changes into the main repository.

Please ensure your code follows the project's coding style and conventions.
