// const { expect } = require("chai");
// const { ethers } = require("hardhat");
// const EIP712 = require("../eip712");

// describe("Decoder", function () {
//   it("Should decode the address/price data", async function () {
//     const accounts = await hre.ethers.getSigners();

//     const Test = await ethers.getContractFactory("Test");
//     const test = await Test.deploy();
//     await test.deployed();

//     const TrustusPaymagic = await ethers.getContractFactory("TrustusPaymagic");
//     const trustusPaymagic = await TrustusPaymagic.deploy(accounts[0].address);
//     await trustusPaymagic.deployed();

//     console.log("trustusPaymagic.address", trustusPaymagic.address);

//     const addrArray = [
//       "0x0D79AfBF97a401968836b9D906F3f87b20d45A72",
//       "0x0D79AfBF97a401968836b9D906F3f87b20d45A72",
//       "0x0D79AfBF97a401968836b9D906F3f87b20d45A72",
//       "0x0D79AfBF97a401968836b9D906F3f87b20d45A72",
//       "0x0D79AfBF97a401968836b9D906F3f87b20d45A72",
//       "0x0D79AfBF97a401968836b9D906F3f87b20d45A72",
//       "0x0D79AfBF97a401968836b9D906F3f87b20d45A72",
//       "0x0D79AfBF97a401968836b9D906F3f87b20d45A72"
//     ];

//     const priceArray = [
//       500000000, 500000000, 500000000, 500000000, 500000000, 500000000,
//       500000000, 500000000
//     ];

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

//     const encodedPayload = ethers.utils.defaultAbiCoder.encode(
//       ["address[]", "uint256[]"],
//       [addrArray, priceArray]
//     );

//     const encodedNested = ethers.utils.defaultAbiCoder.encode(
//       ["(address,uint256)[]"],
//       [nestedArray]
//     );

//     const tx = await test.decoder(encodedPayload);
//     await tx.wait();

//     const tx2 = await test.decoderNested(encodedNested);
//     await tx2.wait();

//     const timestamp = Date.now();
//     const deadline = timestamp + 300000;

//     // let packet = {}

//     const request = ethers.utils.keccak256(
//       ethers.utils.formatBytes32String("GetPrice(address)")
//     );
//     const payload = encodedNested;

//     // packet["deadline"] = deadline
//     // packet["request"] = request;
//     // packet["payload"] = encodedNested

//     async function getSellerSignedMessage(
//       deadline,
//       request,
//       payload,
//       sellerWallet,
//       verifyingContract
//     ) {
//       try {
//         const sellerSetPriceTypedData = {
//           types: {
//             EIP712Domain: [
//               { name: "name", type: "string" },
//               { name: "version", type: "string" },
//               { name: "chainId", type: "uint256" },
//               { name: "verifyingContract", type: "address" }
//             ],
//             VerifyPacket: [
//               { name: "deadline", type: "uint256" },
//               { name: "request", type: "bytes32" },
//               { name: "payload", type: "bytes" }
//             ]
//           },
//           domain: {
//             name: "Trustus",
//             version: "1",
//             chainId: 31337,
//             verifyingContract
//           },
//           primaryType: "VerifyPacket",
//           message: {
//             deadline,
//             request,
//             payload
//           }
//         };

//         let { v, r, s } = await EIP712.sign(
//           sellerSetPriceTypedData.domain,
//           sellerSetPriceTypedData.primaryType,
//           sellerSetPriceTypedData.message,
//           sellerSetPriceTypedData.types,
//           sellerWallet
//         );

//         return { v, r, s };
//       } catch (err) {
//         console.error(err);
//       }
//     }

//     const { r, s, v } = await getSellerSignedMessage(
//       deadline,
//       request,
//       payload,
//       accounts[0],
//       trustusPaymagic.address
//     );

//     let vString = v.toString();
//     let vNumber = Number(vString);

//     const tx3 = await trustusPaymagic.callStatic.verify(request, {
//       request,
//       deadline,
//       payload,
//       r,
//       s,
//       v: vNumber
//     });

//     // const tx3 = await trustusPaymagic.callStatic.verify(request, {
//     //   request,
//     //   deadline,
//     //   payload,
//     //   r,
//     //   s,
//     //   v: vNumber}
//     // );

//     console.log(tx3);

//     // function signDigest(wallet, digest) {
//     //   const signingKey = new ethers.utils.SigningKey("0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80")
//     //   return signingKey.signDigest(digest)
//     // }
//   });
// });
