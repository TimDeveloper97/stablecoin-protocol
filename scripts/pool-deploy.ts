import { ethers } from "hardhat";

const UPFI = "0x4edF1feB78EA075d5822CA529586F110227E7076";
const UPO = "0x0F3C47a687960eCBad9E969Ea483E5E8b4D22Fb1";
const USDC = "0xfe2c9efd1A63aA254ACaE60Bd4F37e657413f4E6";
const TREASURY = "0x8f3a672AA34e8449725b0495bB8DedD28681aa10";
const POOL_CONTRACT_ADDRESS = "0x49b55522856833AE7516EC3D8efff0Dd3B5aF10c";

async function deploy() {
  const Pool = await ethers.getContractFactory("Pool");
  const pool = await Pool.deploy(UPFI, USDC, UPO, TREASURY, 10_000_000);

  await pool.deployed();

  console.log("pool deployed to:", pool.address);
}

async function info() {
  const MyContract = await ethers.getContractFactory("Pool");
  const contract = await MyContract.attach(POOL_CONTRACT_ADDRESS);

  const info = await contract.info();
  console.log("Pool Info: ", info);
}

// Protocol method
async function mint() {
  const MyContract = await ethers.getContractFactory("Pool");
  const contract = await MyContract.attach(POOL_CONTRACT_ADDRESS);
  const [signer] = await ethers.getSigners()
  const _collateral_amount = ethers.utils.parseUnits("1000", 18);
  const _share_amount = ethers.utils.parseUnits("1", 18);
  const _dollar_out_min = ethers.utils.parseUnits("1", 18);
  
  let result = await contract.connect(signer).mint(_collateral_amount, _share_amount, _dollar_out_min)
  console.log("Mint result::", result)
}

mint().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
