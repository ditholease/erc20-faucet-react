require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// Only attach a deployer key when one is configured, so local commands
// (compile, test, hardhat node) keep working without a .env file.
const accounts = process.env.PRIVATE_KEY
  ? [`0x${process.env.PRIVATE_KEY.replace(/^0x/, '')}`]
  : [];

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    // Goerli and Ropsten have been shut down; Sepolia is the current Ethereum testnet.
    sepolia: {
      url: process.env.SEPOLIA_RPC_URL || "https://ethereum-sepolia-rpc.publicnode.com",
      chainId: 11155111,
      accounts
    }
  },
  solidity: "0.8.3"
};
