const MyToken = artifacts.require("MyToken");
const Staking = artifacts.require("Staking");
const LendingBorrowing = artifacts.require("LendingBorrowing");

module.exports = async function (callback) {
    const myToken = await MyToken.deployed();
    const staking = await Staking.deployed();
    const lendingBorrowing = await LendingBorrowing.deployed();

    // Example interactions
    // Buy tokens
    await myToken.buyTokens({ value: web3.utils.toWei("1", "ether") });

    // Stake tokens
    const stakeAmount = web3.utils.toWei("100", "ether");
    await myToken.approve(staking.address, stakeAmount);
    await staking.stake(stakeAmount);

    // Borrow tokens
    const borrowAmount = web3.utils.toWei("50", "ether");
    await myToken.approve(lendingBorrowing.address, borrowAmount);
    await lendingBorrowing.borrow(borrowAmount);

    // Withdraw developer rewards and fees
    await staking.withdrawRewards();
    await lendingBorrowing.withdrawFees();

    callback();
};
