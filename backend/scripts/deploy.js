// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.

const hre = require("hardhat");
const fs = require("fs")

async function main() {
  const tenderManagementContract = await hre.ethers.getContractFactory("TenderManagementSystem");
  const deployedContract = await tenderManagementContract.deploy();

  await deployedContract.deployed();

  console.log("Conract Address: ", deployedContract.address)
  fs.writeFile("../artifacts/contracts/TenderManagementSystem.sol/ContractAddress.json", JSON.stringify({ "Address": deployedContract.address }), function (error) {
    console.error(
      "Error on writing", error
    );
  })
}

main().then(() => process.exit(0)).catch((error) => {
  console.log(error);
  process.exit(1)
})

