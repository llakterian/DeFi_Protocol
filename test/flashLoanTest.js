const MyToken = artifacts.require("MyToken");
const Staking = artifacts.require("Staking");
const LendingBorrowing = artifacts.require("LendingBorrowing");

contract("FlashLoanDApp", accounts => {
    const [owner, user] = accounts;
    let myToken;
    let staking;
    let lendingBorrowing;

    before(async () => {
        myToken = await MyToken.deployed();
        staking = await Staking.deployed();
        lendingBorrowing = await LendingBorrowing.deployed();
    });

    it("should allow user to stake tokens and earn rewards", async () => {
        const stakeAmount = web3.utils.toWei("100", "ether");
        await myToken.transfer(user, stakeAmount, { from: owner });
        await myToken.approve(staking.address, stakeAmount, { from: user });
        await staking.stake(stakeAmount, { from: user });

        const stakedBalance = await staking.staked(user);
        assert.equal(stakedBalance.toString(), stakeAmount, "Staked balance is incorrect");
    });

    it("should allow user to borrow tokens", async () => {
        const borrowAmount = web3.utils.toWei("50", "ether");
        await myToken.approve(lendingBorrowing.address, borrowAmount, { from: user });
        await lendingBorrowing.borrow(borrowAmount, { from: user });

        const borrowBalance = await lendingBorrowing.borrows(user);
        assert.equal(borrowBalance.toString(), borrowAmount, "Borrow balance is incorrect");
    });

    it("should allow user to repay borrowed tokens", async () => {
        const repayAmount = web3.utils.toWei("50", "ether");
        await myToken.approve(lendingBorrowing.address, repayAmount, { from: user });
        await lendingBorrowing.repay(repayAmount, { from: user });

        const borrowBalance = await lendingBorrowing.borrows(user);
        assert.equal(borrowBalance.toString(), "0", "Borrow balance is not zero");
    });

    it("should allow owner to withdraw developer rewards and fees", async () => {
        await staking.withdrawRewards({ from: owner });
        await lendingBorrowing.withdrawFees({ from: owner });

        const ownerBalance = await myToken.balanceOf(owner);
        assert(ownerBalance.toString() > web3.utils.toWei("200100", "ether"), "Owner balance is incorrect");
    });
});
