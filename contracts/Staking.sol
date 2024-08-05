// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Staking is Ownable {
    IERC20 public token;
    uint256 public rewardRate;

    struct Stake {
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => Stake) public stakes;
    address[] public stakerAddresses;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsWithdrawn(address indexed user, uint256 amount);

    constructor(IERC20 _token, uint256 _rewardRate) Ownable(msg.sender) {
        token = _token;
        rewardRate = _rewardRate;
    }

    function stake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");
        token.transferFrom(msg.sender, address(this), amount);

        if (stakes[msg.sender].amount == 0) {
            stakerAddresses.push(msg.sender);
        }

        stakes[msg.sender].amount += amount;
        stakes[msg.sender].timestamp = block.timestamp;

        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external {
        require(
            stakes[msg.sender].amount >= amount,
            "Insufficient balance to unstake"
        );

        stakes[msg.sender].amount -= amount;
        token.transfer(msg.sender, amount);

        emit Unstaked(msg.sender, amount);
    }

    function withdrawRewards() external {
        require(stakes[msg.sender].amount > 0, "No stakes found");

        uint256 stakingDuration = block.timestamp -
            stakes[msg.sender].timestamp;
        uint256 reward = (stakes[msg.sender].amount *
            rewardRate *
            stakingDuration) / (365 days * 100);

        stakes[msg.sender].timestamp = block.timestamp;
        token.transfer(msg.sender, reward);

        emit RewardsWithdrawn(msg.sender, reward);
    }

    function getStakers() external view returns (address[] memory) {
        return stakerAddresses;
    }
}
