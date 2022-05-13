import { ethers } from "hardhat";
import Web3 from "web3";

const BTC_CONTRACT_ADDRESS = "0xA20d3e94dB7b4D963D91029Acd8c204E91f72881"
const ACCOUNT_TEST_ADDRESS = "0x32d413767554EeCbD501e8a5Ab3066548652dC6D"
const DEPLOY_TEST_ADDRESS = "0x32d413767554EeCbD501e8a5Ab3066548652dC6D"
const CONTRACT_NAME = "Btc";
const CONTRACT_NAME_UPPER = "BTC";

async function main() {
    await setMinter();
    await mint();
    await airdrop();
}

async function deploy() {
    await deployerInfo()
    const Upo = await ethers.getContractFactory(CONTRACT_NAME);
    const upo = await Upo.deploy(`${CONTRACT_NAME_UPPER}` + " testnet (UPFI Network)", CONTRACT_NAME_UPPER);
    await upo.deployed();
    console.log(`${CONTRACT_NAME_UPPER} deployed to:`, upo.address);
}

async function initialize() {
    const MyContract = await ethers.getContractFactory(CONTRACT_NAME);
    const contract = await MyContract.attach(BTC_CONTRACT_ADDRESS);
    await contract.initialize(ethers.utils.parseUnits("100", 18));
}

async function deployerInfo() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());
}

async function mint() {
    const MyContract = await ethers.getContractFactory(CONTRACT_NAME);
    const contract = await MyContract.attach(BTC_CONTRACT_ADDRESS);
    const recepient = ACCOUNT_TEST_ADDRESS
    console.log("poolBalance Before::", await contract.balanceOf(recepient))
    let status = await contract.mint(recepient, ethers.utils.parseUnits("1000000", 18));
    console.log("poolBalance After::", await contract.balanceOf(recepient))
}

async function setMinter() {
    const MyContract = await ethers.getContractFactory(CONTRACT_NAME);
    const contract = await MyContract.attach(BTC_CONTRACT_ADDRESS);
    const minter_address = DEPLOY_TEST_ADDRESS //same with deployer
    let status = await contract.setMinter(minter_address, ethers.utils.parseUnits("100000000", 18));
    console.log("set minter status", status)
}

async function airdrop() {
    const account = ACCOUNT_TEST_ADDRESS;
    const MyContract = await ethers.getContractFactory(CONTRACT_NAME);
    const contract = await MyContract.attach(BTC_CONTRACT_ADDRESS);
    await contract.airdrop(account);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
