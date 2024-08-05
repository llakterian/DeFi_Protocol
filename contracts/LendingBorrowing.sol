// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

abstract contract LendingBorrowing is Ownable {
    IERC20 public token;

    struct Deposit {
        uint256 amount;
        uint256 timestamp;
    }

    struct Loan {
        uint256 amount;
        uint256 timestamp;
    }

    mapping(address => Deposit) public deposits;
    mapping(address => Loan) public loans;
    address[] public depositorAddresses;

    event Deposited(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event LoanTaken(address indexed user, uint256 amount);
    event LoanRepaid(address indexed user, uint256 amount);

    constructor(IERC20 _token) {
        token = _token;
    }

    function deposit(uint256 amount) external virtual;

    function withdraw(uint256 amount) external virtual;

    function takeLoan(uint256 amount) external virtual;

    function repayLoan(uint256 amount) external virtual;
}
