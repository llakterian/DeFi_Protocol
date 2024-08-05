const MyToken = artifacts.require("MyToken");
const Staking = artifacts.require("Staking");
const LendingBorrowing = artifacts.require("LendingBorrowing");

module.exports = async function (deployer) {
    await deployer.deploy(MyToken);
    const myToken = await MyToken.deployed();

    const rewardRate = 500; // 5%
    const developerRewardRate = 50; // 0.5%
    await deployer.deploy(Staking, myToken.address, rewardRate, developerRewardRate);
    const staking = await Staking.deployed();

    const interestRate = 500; // 5%
    const feeRate = 50; // 0.5%
    await deployer.deploy(LendingBorrowing, myToken.address, interestRate, feeRate);
};
