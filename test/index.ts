import { expect } from "chai";
import { ethers } from "hardhat";
import Web3 from 'web3'

const web3 = new Web3()

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await ethers.getContractFactory("Greeter");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.connect().setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});

describe("Upo", function () {
  it('', async function () {
    const Upo = await ethers.getContractFactory('Upo');
    const upo = await Upo.deploy('UPO Token', 'UPO');
    await upo.deployed();
    await upo.initialize(ethers.utils.parseUnits('10000000', 18))
    console.log(await upo.totalSupply())
    console.log(ethers.utils.parseUnits('10000000', 18))
    expect(await upo.totalSupply()).to.equals(ethers.utils.parseUnits('10000000', 18));
    expect(await upo.MAX_TOTAL_SUPPLY()).to.equals(ethers.utils.parseUnits('10000000000', 18));
    expect(await upo.symbol()).to.equal('UPO');

  })
})