
# An ERC20 token faucet on the Sepolia Testnet 

[Live Demo](https://60b43852a834858831d84c15--inspiring-liskov-361eb4.netlify.app/)

<img src="https://i.ibb.co/LgrnGRT/Screenshot-2021-05-31-at-12-25-38.png" alt="Screenshot-2021-05-31-at-12-25-38" border="0">

This Dapp allows users to receive 100 FCT on the Sepolia test net and to send FCT to other addresses. 

Having an erc20 faucet can be very useful for testing your Dapp, so I decided to make one.

It uses **hardhat**, **ethers**, **openzeppelin-contracts**,**react** and **bootstrap-react**, this is a powerful stack, and in this simple project shows some design patterns that can be expanded and explored to build powerful apps whilst creating powerful UI components fast. 

> **Note:** this faucet originally ran on Goerli (contract `0xA4eE602c16C448Dc0D1fc38E6FC12f0d6C672Cbe`).
> Goerli has been shut down, so the token must be redeployed on Sepolia.

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and set `PRIVATE_KEY` (an account holding some Sepolia ETH) and optionally `SEPOLIA_RPC_URL`.
3. Deploy the token: `npx hardhat run scripts/deploy.js --network sepolia`
4. Put the printed address in `.env` as `REACT_APP_TOKEN_ADDRESS`.
5. `npm start` (or `npm run build` and redeploy the site; on Netlify set the `REACT_APP_*` variables in the site settings).

The app asks MetaMask to switch to Sepolia automatically.
