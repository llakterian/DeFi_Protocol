const MyToken = artifacts.require("MyToken");

contract("MyToken", accounts => {
    const [owner, buyer] = accounts;

    it("should mint initial supply and allocate to owner and contract", async () => {
        const instance = await MyToken.deployed();
        const ownerBalance = await instance.balanceOf(owner);
        const contractBalance = await instance.balanceOf(instance.address);

        assert.equal(ownerBalance.toString(), web3.utils.toWei("200000", "ether"), "Owner balance is incorrect");
        assert.equal(contractBalance.toString(), web3.utils.toWei("800000", "ether"), "Contract balance is incorrect");
    });

    it("should allow user to buy tokens", async () => {
        const instance = await MyToken.deployed();
        const tokensToBuy = web3.utils.toWei("100", "ether");

        await instance.buyTokens({ from: buyer, value: web3.utils.toWei("1", "ether") });

        const buyerBalance = await instance.balanceOf(buyer);
        assert.equal(buyerBalance.toString(), tokensToBuy, "Buyer balance is incorrect");
    });

    it("should allow owner to withdraw ETH", async () => {
        const instance = await MyToken.deployed();
        const initialBalance = await web3.eth.getBalance(owner);
        await instance.withdrawETH({ from: owner });
        const finalBalance = await web3.eth.getBalance(owner);

        assert(finalBalance > initialBalance, "Owner balance did not increase");
    });

    it("should allow owner to withdraw tokens", async () => {
        const instance = await MyToken.deployed();
        const tokensToWithdraw = web3.utils.toWei("100", "ether");

        await instance.withdrawTokens(tokensToWithdraw, { from: owner });

        const ownerBalance = await instance.balanceOf(owner);
        assert.equal(ownerBalance.toString(), web3.utils.toWei("200100", "ether"), "Owner balance is incorrect");
    });
});
