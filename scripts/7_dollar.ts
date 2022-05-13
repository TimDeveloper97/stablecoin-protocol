import { ethers } from "hardhat";

const DOLLAR_CONTRACT_ADDRESS = "0x6Cbc854de80CD0fF64EDEB71AD6f35d57AFE20D8";
const TREASURY = "0x7D1DeF255e14F05e954Ddd61695bbf5e1C29594C";
async function main() {
  const accounts = await ethers.getSigners();
  const owner = accounts[0];
  const Upfi = await ethers.getContractFactory("Dollar");
  const upfi = await Upfi.deploy("UPFI dollar (UPFI Network)", "UPFI", TREASURY);

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

