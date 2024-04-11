// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract SeiyajToken is ERC20, Ownable {
    constructor() ERC20("Seiyaj", "SYT") Ownable(msg.sender) {
        _mint(msg.sender, 100 * 1e18);
    }

    function mint(address account, uint256 value) external onlyOwner {
        _mint(account, value);
    }

    function safeTransfer(address to, uint256 value) external {
        require(balanceOf(msg.sender) >= value, "Insufficient balance");

        transfer(to, value);
    }

    function burn(uint256 value) external {
        require(balanceOf(msg.sender) >= value, "Insufficient balance");
        _burn(msg.sender, value);
    }
}
