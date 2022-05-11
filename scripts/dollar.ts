import { ethers } from "hardhat";

const DOLLAR_CONTRACT_ADDRESS = "0x4edF1feB78EA075d5822CA529586F110227E7076";
const TREASURY = "0x8f3a672AA34e8449725b0495bB8DedD28681aa10";
async function main() {
  const accounts = await ethers.getSigners();
  const owner = accounts[0];
  const Upfi = await ethers.getContractFactory("Dollar");
  const upfi = await Upfi.deploy("UPFI dollar (UPFI Network)", "UPFI", TREASURY );

  await upfi.deployed();

  console.log("Dollar deployed to:", upfi.address);
}

async function initialize() {
  const MyContract = await ethers.getContractFactory("Dollar");
  const contract = await MyContract.attach(DOLLAR_CONTRACT_ADDRESS);
  await contract.initialize();
}

initialize().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

