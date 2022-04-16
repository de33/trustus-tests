const { expect } = require("chai");
const { ethers, network } = require("hardhat");
const { signTypedData_v4 } = require("eth-sig-util");

describe("Decoder/Signing", function () {
  it("Should decode the address/price data", async function () {
    [signer] = await hre.ethers.getSigners();

    const Test = await ethers.getContractFactory("Test");
    const test = await Test.deploy();
    await test.deployed();

    const TrustusPaymagic = await ethers.getContractFactory("TrustusPaymagic");
    const trustusPaymagic = await TrustusPaymagic.deploy(signer.address);
    await trustusPaymagic.deployed();

    const SigningHelper = await ethers.getContractFactory("SigningHelper");
    const signingHelper = await SigningHelper.deploy();
    await signingHelper.deployed();

    const address = ethers.utils.getAddress(trustusPaymagic.address);

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

    const request = ethers.utils.formatBytes32String("GetPrice(address)");
    const payload = encodedNested;


    let messageHash = await signingHelper.hashMessage(
      request,
      deadline,
      payload,
      address
    );

    const signingKey = new ethers.utils.SigningKey("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80");

    const { r, s, v } = signingKey.signDigest(messageHash);

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
