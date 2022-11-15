
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

library StringComp {
        function compareStrings(string memory a, string memory b)
        public
        pure
        returns (bool)
    {
        if (bytes(a).length != bytes(b).length) {
            return false;
        } else {
            return keccak256(abi.encodePacked((a))) ==
                keccak256(abi.encodePacked((b)));
        }
    }
}