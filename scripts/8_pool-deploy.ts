import { ethers } from "hardhat";

const UPFI = "0xD103C29b44a470490737A5a33A4bf74649C4Dd97";
const UPO = "0xa1db369A70645E22d54541e2A69eF8800FBbaE31";
const USDC = "0x9a455714FBe73dA32808c9A6C1Ff28F2056BBCd5";
const TREASURY = "0x7D1DeF255e14F05e954Ddd61695bbf5e1C29594C";
const POOL_CONTRACT_ADDRESS = "0x62438f5387B8937bB39b4Ba617F2d74d132F5757";

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

// async function migrate() {
//   const MyContract = await ethers.getContractFactory("Pool");
//   const contract = await MyContract.attach(POOL_CONTRACT_ADDRESS);

//   await contract.migrate(POOL_CONTRACT_ADDRESS);
// }

// Protocol method
async function mint() {
  const MyContract = await ethers.getContractFactory("Pool");
  const contract = await MyContract.attach(POOL_CONTRACT_ADDRESS);
  const [signer, other] = await ethers.getSigners()
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
