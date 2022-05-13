import { ethers } from "hardhat";
const TREASURY_CONTRACT_ADDRESS = "0x7D1DeF255e14F05e954Ddd61695bbf5e1C29594C"
const POOL_ADDRESS = "0x62438f5387B8937bB39b4Ba617F2d74d132F5757"
const UPFI = "0xD103C29b44a470490737A5a33A4bf74649C4Dd97";
const UPO = "0xa1db369A70645E22d54541e2A69eF8800FBbaE31";
const USDC = "0x9a455714FBe73dA32808c9A6C1Ff28F2056BBCd5";

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
