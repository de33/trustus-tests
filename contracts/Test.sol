//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./TrustusPaymagic.sol";

contract Test {
    struct Nested {
        address addr;
        uint256 price;
    }

    // function decoder(bytes memory data) public {
    //     (address[] memory addresses, uint256[] memory prices) = abi.decode(data, (address[],uint256[]));
        
    // }

    function decoderNested(bytes memory data) public {
        Nested[] memory nested = abi.decode(data, (Nested[]));
        //("price[0]", nested[0].price);
    }
}
