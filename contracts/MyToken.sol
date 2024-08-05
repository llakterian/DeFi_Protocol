// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1000000 * 10 ** 18;
    uint256 public constant TEAM_SUPPLY_PERCENTAGE = 20;
    uint256 public constant PUBLIC_SALE_SUPPLY_PERCENTAGE = 80;

    event TokensBought(address indexed buyer, uint256 amount);
    event ETHWithdrawn(address indexed owner, uint256 amount);
    event TokensWithdrawn(address indexed owner, uint256 amount);

    constructor() ERC20("MyToken", "MTK") Ownable(msg.sender) {
        uint256 teamSupply = (INITIAL_SUPPLY * TEAM_SUPPLY_PERCENTAGE) / 100;
        uint256 publicSaleSupply = (INITIAL_SUPPLY *
            PUBLIC_SALE_SUPPLY_PERCENTAGE) / 100;
        _mint(msg.sender, teamSupply);
        _mint(address(this), publicSaleSupply);
    }

    function buyTokens() external payable {
        require(msg.value > 0, "ETH value must be greater than 0");
        uint256 tokensToBuy = msg.value * 100; // Example rate: 1 ETH = 100 tokens
        require(
            balanceOf(address(this)) >= tokensToBuy,
            "Not enough tokens available for sale"
        );
        _transfer(address(this), msg.sender, tokensToBuy);
        emit TokensBought(msg.sender, tokensToBuy);
    }

    function withdrawETH() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No ETH to withdraw");
        payable(owner()).transfer(balance);
        emit ETHWithdrawn(owner(), balance);
    }

    function withdrawTokens(uint256 amount) external onlyOwner {
        require(
            balanceOf(address(this)) >= amount,
            "Not enough tokens available"
        );
        _transfer(address(this), owner(), amount);
        emit TokensWithdrawn(owner(), amount);
    }

    receive() external payable {
        this.buyTokens{value: msg.value}();
    }
}
