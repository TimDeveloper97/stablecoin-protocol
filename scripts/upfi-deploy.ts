import { ethers } from "hardhat";

const UPFI_CONTRACT_ADDRESS = "0xd848C0EcB284C35853638867B8B5ac61B881e349"

async function main() {
  const accounts = await ethers.getSigners();
  const owner = accounts[0];
  const Upfi = await ethers.getContractFactory("Upfi", owner);
  const upfi = await Upfi.deploy("UPFI testnet (UPFI Network)", "UPFI");

  await upfi.deployed();

  let a = await upfi.connect(accounts[2]).approve();

  console.log("Upfi deployed to:", upfi.address);
}

async function initialize() {
  const MyContract = await ethers.getContractFactory("Upo");
  const contract = await MyContract.attach(UPFI_CONTRACT_ADDRESS);
  await contract.initialize(ethers.utils.parseUnits("100", 18));
}

initialize().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

