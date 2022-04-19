pragma solidity ^0.8.4;

import {Trustus} from "./Trustus.sol";
import "hardhat/console.sol";

/// @notice  Needed for testing since Trustus is abstract
contract TrustusPaymagic is Trustus {
    constructor(address _trustedAddress) {
        _setIsTrusted(_trustedAddress, true);
        console.log("_trustedAddress", _trustedAddress);
    }

    function verify(bytes32 request, Trustus.TrustusPacket calldata packet)
        public
        returns (bool)
    {
        return _verifyPacket(request, packet);
    }

}