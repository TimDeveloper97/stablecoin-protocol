import { ethers } from "hardhat";
const TREASURY_CONTRACT_ADDRESS = "0x8f3a672AA34e8449725b0495bB8DedD28681aa10"
const POOL_ADDRESS = "0x49b55522856833AE7516EC3D8efff0Dd3B5aF10c"
const UPFI = "0xd848C0EcB284C35853638867B8B5ac61B881e349";
const UPO = "0x0F3C47a687960eCBad9E969Ea483E5E8b4D22Fb1";
const USDC = "0xfe2c9efd1A63aA254ACaE60Bd4F37e657413f4E6";

async function main() {
  const Treasury = await ethers.getContractFactory("Treasury");
  const treasury = await Treasury.deploy()

  await treasury.deployed();

  console.log("Treasury deployed to:", treasury.address);
}

async function info() {
  const MyContract = await ethers.getContractFactory("Treasury");
  const contract = await MyContract.attach(TREASURY_CONTRACT_ADDRESS);

  const info = await contract.info();
  console.log("Treasury Info: ", info);
}

async function addPool() {
  const MyContract = await ethers.getContractFactory("Treasury");
  const contract = await MyContract.attach(TREASURY_CONTRACT_ADDRESS);

  const result = await contract.addPool(POOL_ADDRESS);
  console.log("Treasury addPool: ", result);
}

async function removePool() {
  const MyContract = await ethers.getContractFactory("Treasury");
  const contract = await MyContract.attach(TREASURY_CONTRACT_ADDRESS);

  const result = await contract.removePool(POOL_ADDRESS);
  console.log("Treasury removePool: ", result);
}


async function setDolarAndShareAddress() {
  const MyContract = await ethers.getContractFactory("Treasury");
  const contract = await MyContract.attach(TREASURY_CONTRACT_ADDRESS);

  const dolarAddressResult = await contract.setDollarAddress(UPFI);
  console.log("dolarAddressResult: ", dolarAddressResult);

  const shareAddressResult = await contract.setShareAddress(USDC);
  console.log("shareAddressResult: ", shareAddressResult);
}

info().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
