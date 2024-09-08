const { expect } = require("chai");
// const { ethers } = require("hardhat");

describe("Token Contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    console.log("Signers objects", owner);
    const Token = await ethers.getContractFactory("Token"); // Creating instance

    const hardhatToken = await Token.deploy(); //deploying contract

    const ownerBalance = await hardhatToken.balanceOf(owner.address); //owner balance = 10,000
    console.log("Owner address", owner.address);

    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); //total supplu =10,000
  });

  it("Should transfer tokens between accounts", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    console.log("Signers objects", owner);
    const Token = await ethers.getContractFactory("Token"); // Creating instance

    const hardhatToken = await Token.deploy(); //deploying contract

    await hardhatToken.transfer(addr1.address, 10);

    expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);

    //transfer 5 tokens from addr1 to addr2

    await hardhatToken.connect(addr1).transfer(addr2.address, 5);
    expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);

    // const ownerBalance = await hardhatToken.balanceOf(owner.address); //owner balance = 10,000
    // console.log("Owner address", owner.address);

    // expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); //total supplu =10,000

    // await hardhatToken.transfer()
  });
});
