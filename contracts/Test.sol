//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import {TrustusPaymagic} from "./TrustusPaymagic.sol";

contract Test is TrustusPaymagic {
    struct Nested {
        address addr;
        uint256 price;
    }

    constructor(address _trustedAddress) {
        _setIsTrusted(_trustedAddress, true);
    }

    function decoderNested(bytes memory data) public {
        Nested[] memory nested = abi.decode(data, (Nested[]));
        //("price[0]", nested[0].price);
    }

    function sweep(TrustusPacket calldata packet) public verifyPacket(0xfc7ecbf4f091085173dad8d1d3c2dfd218c018596a572201cd849763d1114e7a, packet) {
        console.log("packet.request");
        console.logBytes32(packet.request);

    }
}
