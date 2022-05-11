import { access } from "fs";
import { ethers } from "hardhat";
const USDC_CONTRACT_ADDRESS = "0xfe2c9efd1A63aA254ACaE60Bd4F37e657413f4E6"

async function main() {
  await initialize()
  await airdrop()
  
}

async function deploy() {
  const Usdc = await ethers.getContractFactory("Usdc");
  const usdc = await Usdc.deploy("USDC testnet (UPFI Network)", "USDC");

  await usdc.deployed();

  console.log("Usdc deployed to:", usdc.address);
}

async function initialize() {
  const MyContract = await ethers.getContractFactory("Upo");
  const contract = await MyContract.attach(USDC_CONTRACT_ADDRESS);
  await contract.initialize(ethers.utils.parseUnits("100", 18));
}

async function airdrop() {
  const account = "0x435403426b45d74d5C251D7982504cfC9146E8d7"
  const MyContract = await ethers.getContractFactory("Usdc");
  const contract = await MyContract.attach(USDC_CONTRACT_ADDRESS);
  await contract.airdrop(account);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
