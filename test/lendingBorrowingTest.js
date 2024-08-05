const MyToken = artifacts.require("MyToken");
const LendingBorrowing = artifacts.require("LendingBorrowing");

contract("LendingBorrowing", accounts => {
    it("should handle deposits and withdrawals correctly", async () => {
        const myToken = await MyToken.deployed();
        const lendingBorrowing = await LendingBorrowing.deployed();

        await myToken.approve(lendingBorrowing.address, 1000, { from: accounts[0] });
        await lendingBorrowing.deposit(1000, { from: accounts[0] });

        let deposit = await lendingBorrowing.deposits(accounts[0]);
        assert.equal(deposit.toNumber(), 1000, "Deposit is incorrect");

        await lendingBorrowing.withdraw(500, { from: accounts[0] });
        deposit = await lendingBorrowing.deposits(accounts[0]);
        assert.equal(deposit.toNumber(), 500, "Withdrawal is incorrect");
    });

    it("should handle borrows and repayments correctly", async () => {
        const myToken = await MyToken.deployed();
        const lendingBorrowing = await LendingBorrowing.deployed();

        await lendingBorrowing.borrow(200, { from: accounts[0] });

        let borrow = await lendingBorrowing.borrows(accounts[0]);
        assert.equal(borrow.toNumber(), 200, "Borrow is incorrect");

        await myToken.approve(lendingBorrowing.address, 200, { from: accounts[0] });
        await lendingBorrowing.repay(200, { from: accounts[0] });

        borrow = await lendingBorrowing.borrows(accounts[0]);
        assert.equal(borrow.toNumber(), 0, "Repayment is incorrect");
    });
});
