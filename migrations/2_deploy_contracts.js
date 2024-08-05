const MyToken = artifacts.require("MyToken");
const ConcreteLendingBorrowing = artifacts.require("ConcreteLendingBorrowing");
const Staking = artifacts.require("Staking");

module.exports = async function (deployer) {
    await deployer.deploy(MyToken);
    const myToken = await MyToken.deployed();

    await deployer.deploy(ConcreteLendingBorrowing, myToken.address);
    await deployer.deploy(Staking, myToken.address, 500); // 5% reward rate
};
