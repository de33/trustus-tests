// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract SigningHelper {
    /**
        @notice helper method for the offchain message
     */
    function hashMessage(
        bytes32 request,
        uint256 deadline,
        bytes calldata payload,
        address trustusContract
    ) public view returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    "\x19\x01",
                    _computeDomainSeparator(trustusContract),
                    keccak256(
                        abi.encode(
                            keccak256(
                                "VerifyPacket(bytes32 request,uint256 deadline,bytes payload)"
                            ),
                            request,
                            deadline,
                            payload
                        )
                    )
                )
            );
    }

    /// @notice Computes the domain separator used by EIP-712
    function _computeDomainSeparator(address trustusContract)
        internal
        view
        virtual
        returns (bytes32)
    {
        return
            keccak256(
                abi.encode(
                    keccak256(
                        "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
                    ),
                    keccak256("Trustus"),
                    keccak256("1"),
                    block.chainid,
                    trustusContract
                )
            );
    }
}