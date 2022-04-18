// const { expect } = require("chai");
// const { ethers, network } = require("hardhat");
// const { utils } = ethers;
// const { solidityKeccak256, AbiCoder } = utils;
// const sigUtil = require("eth-sig-util");
// const { signTypedData_v4 } = require("eth-sig-util");

// describe("Decoder", function () {
//   it("Should decode the address/price data", async function () {
//     [signer] = await hre.ethers.getSigners();

//     const Test = await ethers.getContractFactory("Test");
//     const test = await Test.deploy();
//     await test.deployed();

//     const TrustusPaymagic = await ethers.getContractFactory("TrustusPaymagic");
//     const trustusPaymagic = await TrustusPaymagic.deploy(signer.address);
//     await trustusPaymagic.deployed();

//     const address = ethers.utils.getAddress(trustusPaymagic.address);

//     const nestedArray = [
//       ["0x0D79AfBF97a401968836b9D906F3f87b20d45A72", 500000000],
//       ["0x0D79AfBF97a401968836b9D906F3f87b20d45A72", 500000000],
//       ["0x0D79AfBF97a401968836b9D906F3f87b20d45A72", 500000000],
//       ["0x0D79AfBF97a401968836b9D906F3f87b20d45A72", 500000000],
//       ["0x0D79AfBF97a401968836b9D906F3f87b20d45A72", 500000000],
//       ["0x0D79AfBF97a401968836b9D906F3f87b20d45A72", 500000000],
//       ["0x0D79AfBF97a401968836b9D906F3f87b20d45A72", 500000000],
//       ["0x0D79AfBF97a401968836b9D906F3f87b20d45A72", 500000000]
//     ];

//     const encodedNested = ethers.utils.defaultAbiCoder.encode(
//       ["(address,uint256)[]"],
//       [nestedArray]
//     );

//     const tx = await test.decoderNested(encodedNested);
//     await tx.wait();

//     ///signing

//     const privateKeyBuffer = Buffer.from(
//       "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
//       "hex"
//     );

//     const { timestamp } = await hre.ethers.provider.getBlock();

//     const deadline = timestamp + 300000;

//     const request = ethers.utils.formatBytes32String("GetPrice(address)");
//     const payload = encodedNested;

//     let packetHash = solidityKeccak256(
//       ["bytes"],
//       [
//         abiCoder.encode(
//           ["bytes32", "bytes32", "uint256", "bytes"],
//           [
//             solidityKeccak256(
//               ["string"],
//               ["VerifyPacket(bytes32 request,uint256 deadline,bytes payload)"]
//             ),
//             request,
//             deadline,
//             payload
//           ]
//         )
//       ]
//     );

//     // console.log(domain)

//     // console.log(message)

//     const types = {
//       Packet: [
//         {
//           name: "request",
//           type: "bytes32"
//         },
//         {
//           name: "deadline",
//           type: "uint256"
//         },
//         {
//           name: "payload",
//           type: "bytes"
//         }
//       ],
//       EIP712Domain: [
//         { name: "name", type: "string" },
//         { name: "version", type: "string" },
//         { name: "chainId", type: "uint256" },
//         { name: "verifyingContract", type: "address" }
//       ]
//     };

//     const message = {
//       request,
//       deadline,
//       payload,
//       address
//       // "fc7ecbf4f091085173dad8d1d3c2dfd218c018596a572201cd849763d1114e7a"
//     };

//     const data = {
//       domain,
//       message,
//       types,
//       primaryType: "Packet"
//     };

//     const signature = await signTypedData_v4(privateKeyBuffer, { data });

//     const { v, r, s } = ethers.utils.splitSignature(signature);

//     const tx2 = await trustusPaymagic.callStatic.verify(request, {
//       request,
//       deadline,
//       payload,
//       r,
//       s,
//       v
//     });

//     console.log(tx2);
//   });
// });
