// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.13;

interface IShare {
    function poolBurnFrom(address _address, uint256 _amount) external;

    function poolMint(address _address, uint256 m_amount) external;
}