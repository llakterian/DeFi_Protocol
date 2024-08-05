// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./LendingBorrowing.sol";

contract ConcreteLendingBorrowing is LendingBorrowing {
    constructor(IERC20 _token) LendingBorrowing(_token) Ownable(msg.sender) {}

    function deposit(uint256 amount) external override {
        require(amount > 0, "Amount must be greater than zero");
        token.transferFrom(msg.sender, address(this), amount);

        if (deposits[msg.sender].amount == 0) {
            depositorAddresses.push(msg.sender);
        }

        deposits[msg.sender].amount += amount;
        deposits[msg.sender].timestamp = block.timestamp;

        emit Deposited(msg.sender, amount);
    }

    function withdraw(uint256 amount) external override {
        require(
            deposits[msg.sender].amount >= amount,
            "Insufficient balance to withdraw"
        );

        deposits[msg.sender].amount -= amount;
        token.transfer(msg.sender, amount);

        emit Withdrawn(msg.sender, amount);
    }

    function takeLoan(uint256 amount) external override {
        require(amount > 0, "Amount must be greater than zero");
        require(
            token.balanceOf(address(this)) >= amount,
            "Insufficient funds in the contract"
        );

        loans[msg.sender].amount += amount;
        loans[msg.sender].timestamp = block.timestamp;
        token.transfer(msg.sender, amount);

        emit LoanTaken(msg.sender, amount);
    }

    function repayLoan(uint256 amount) external override {
        require(
            loans[msg.sender].amount >= amount,
            "Loan amount is less than repayment amount"
        );

        loans[msg.sender].amount -= amount;
        token.transferFrom(msg.sender, address(this), amount);

        emit LoanRepaid(msg.sender, amount);
    }
}
