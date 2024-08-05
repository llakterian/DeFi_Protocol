const MyToken = artifacts.require("MyToken");
const Staking = artifacts.require("Staking");

contract("Staking", accounts => {
    it("should handle staking and unstaking correctly", async () => {
        const myToken = await MyToken.deployed();
        const staking = await Staking.deployed();

        await myToken.approve(staking.address, 1000, { from: accounts[0] });
        await staking.stake(1000, { from: accounts[0] });

        let staked = await staking.staked(accounts[0]);
        assert.equal(staked.toNumber(), 1000, "Staking is incorrect");

        await staking.unstake(500, { from: accounts[0] });
        staked = await staking.staked(accounts[0]);
        assert.equal(staked.toNumber(), 500, "Unstaking is incorrect");
    });

    it("should handle reward claims correctly", async () => {
        const myToken = await MyToken.deployed();
        const staking = await Staking.deployed();

        await staking.claimReward({ from: accounts[0] });
        let reward = await staking.rewards(accounts[0]);
        assert.equal(reward.toNumber(), 0, "Reward claim is incorrect");
    });
});
