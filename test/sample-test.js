const { expect } = require("chai");
const { ethers } = require("hardhat");
const { network } = require("ethers");
const { utils } = ethers;
const { solidityKeccak256, AbiCoder } = utils;

let abiCoder = new ethers.utils.AbiCoder();

describe("Decoder", function () {
  it("Should decode the address/price data", async function () {
    [signer] = await hre.ethers.getSigners();

    const Test = await ethers.getContractFactory("Test");
    const test = await Test.deploy(signer.address);
    await test.deployed();

    const address = ethers.utils.getAddress(test.address);

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

    ///signing

    const privateKey = Buffer.from(
      "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      "hex"
    );

    const { timestamp } = await hre.ethers.provider.getBlock();

    const deadline = "30650391639";

    const request =
      "0xfc7ecbf4f091085173dad8d1d3c2dfd218c018596a572201cd849763d1114e7a";
    const payload = encodedNested;

    const chainId = await signer.getChainId();

    let packetHash = solidityKeccak256(
      ["bytes"],
      [
        abiCoder.encode(
          ["bytes32", "bytes32", "uint256", "bytes"],
          [
            solidityKeccak256(
              ["string"],
              ["VerifyPacket(bytes32 request,uint256 deadline,bytes payload)"]
            ),
            request,
            deadline,
            payload
          ]
        )
      ]
    );

    let domainSeparator = solidityKeccak256(
      ["bytes"],
      [
        abiCoder.encode(
          ["bytes32", "bytes32", "bytes32", "uint256", "address"],
          [
            solidityKeccak256(
              ["string"],
              [
                "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
              ]
            ),
            solidityKeccak256(["string"], ["Trustus"]),
            solidityKeccak256(["string"], ["1"]),
            chainId,
            test.address
          ]
        )
      ]
    );

    let messageHashOffChain = solidityKeccak256(
      ["bytes"],
      [
        utils.solidityPack(
          ["string", "bytes", "bytes32"],
          ["\x19\x01", domainSeparator, packetHash]
        )
      ]
    );

    const signingKey = new utils.SigningKey(privateKey);
    const { r, s, v } = signingKey.signDigest(messageHashOffChain);

    let packet = {
      v,
      r,
      s,
      request,
      deadline,
      payload
    };

    // console.log(packet);

    const tx2 = await test.callStatic.verify(request, packet);

    // console.log(tx2);

    const tx3 = await test.sweep(packet);

    // console.log(tx3);
  });
});
