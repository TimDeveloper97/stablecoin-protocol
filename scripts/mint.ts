import { ethers } from "hardhat";

const UPFI = "0xd848C0EcB284C35853638867B8B5ac61B881e349";
const UPO = "0x0F3C47a687960eCBad9E969Ea483E5E8b4D22Fb1";
const USDC = "0xfe2c9efd1A63aA254ACaE60Bd4F37e657413f4E6";
const TREASURY = "0x8f3a672AA34e8449725b0495bB8DedD28681aa10";

async function mint() {
  const Pool = await ethers.getContractFactory("Pool");
  const pool = await Pool.deploy(UPFI, USDC, UPO, TREASURY, 10_000_000);

  await pool.deployed();

  console.log("pool deployed to:", pool.address);
}

mint().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
