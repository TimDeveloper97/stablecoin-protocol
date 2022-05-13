import { ethers } from "hardhat";

const UPFI_CONTRACT_ADDRESS = "0xD103C29b44a470490737A5a33A4bf74649C4Dd97"

async function main() {
  const accounts = await ethers.getSigners();
  const owner = accounts[0];
  const Upfi = await ethers.getContractFactory("Upfi", owner);
  const upfi = await Upfi.deploy("UPFI testnet (UPFI Network)", "UPFI");

  await upfi.deployed();

  // let a = await upfi.connect(owner).approve();

  console.log("Upfi deployed to:", upfi.address);
}

async function initialize() {
  const MyContract = await ethers.getContractFactory("Upo");
  const contract = await MyContract.attach(UPFI_CONTRACT_ADDRESS);
  await contract.initialize(ethers.utils.parseUnits("100", 18));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

