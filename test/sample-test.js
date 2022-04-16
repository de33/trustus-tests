const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const sigUtil = require("eth-sig-util");

describe("Decoder", function () {
  it("Should decode the address/price data", async function () {
    const accounts = await hre.ethers.getSigners();

    const Test = await ethers.getContractFactory("Test");
    const test = await Test.deploy();
    await test.deployed();

    const TrustusPaymagic = await ethers.getContractFactory("TrustusPaymagic");
    const trustusPaymagic = await TrustusPaymagic.deploy(accounts[0].address);
    await trustusPaymagic.deployed();

    const nestedArray = [
      ["0x0D79AfBF97a401968836b9D906F3f87b20d45A72", 500000000],
      ["0x0D79AfBF97a401968836b9D906F3f87b20d45A72", 500000000],
      ["0x0D79AfBF97a401968836b9D906F3f87b20d45A72", 500000000],
      ["0x0D79AfBF97a401968836b9D906F3f87b20d45A72", 500000000],
      ["0x0D79AfBF97a401968836b9D906F3f87b20d45A72", 500000000],
      ["0x0D79AfBF97a401968836b9D906F3f87b20d45A72", 500000000],
      ["0x0D79AfBF97a401968836b9D906F3f87b20d45A72", 500000000],
      ["0x0D79AfBF97a401968836b9D906F3f87b20d45A72", 500000000]
    ];

    const encodedNested = ethers.utils.defaultAbiCoder.encode(
      ["(address,uint256)[]"],
      [nestedArray]
    );

    const tx = await test.decoderNested(encodedNested);
    await tx.wait();

    const {timestamp} = await hre.ethers.provider.getBlock();

    const deadline = timestamp + 300000

    const request = ethers.utils.id("GetPrice(address)");
    const payload = encodedNested;

    const domain = {
      name: "Trustus",
      version: "1",
      chainId: network.config.chainId,
      verifyingContract: trustusPaymagic.address
    };


    const message = {
        request,
        deadline,
        payload,
    };

    const types = {
      Packet: [
      {
        name: "request", 
        type: "bytes32"
      },{
        name: "deadline",
        type: "uint256"
      },
      {
        name: "payload",
        type: "bytes"
      }
      ]
    }

    const signature = await accounts[0]._signTypedData(domain, types, message)
    const { v, r, s } = ethers.utils.splitSignature(signature);

    const tx2 = await trustusPaymagic.callStatic.verify(request, {
      request,
      deadline,
      payload,
      r,
      s,
      v}
    );

    console.log(tx2);
  });
});
