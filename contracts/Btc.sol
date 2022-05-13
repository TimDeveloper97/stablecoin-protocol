// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.13;

import "./Upo.sol";

contract Btc is Upo {
    constructor(string memory name, string memory symbol) Upo(name, symbol) {}
}
