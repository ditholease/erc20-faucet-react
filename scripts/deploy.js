const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const FCTToken = await hre.ethers.getContractFactory("FCTToken");
  const fctToken = await FCTToken.deploy("FCTToken", "FCT");
  await fctToken.deployed();

  console.log("Token deployed to:", fctToken.address);
  console.log(`\nAdd this to your .env and rebuild the frontend:\nREACT_APP_TOKEN_ADDRESS=${fctToken.address}`);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
