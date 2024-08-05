import React, { useState } from 'react';
import { getWeb3 } from '../utils/web3';
import MyToken from '../abis/MyToken.json';

const BuyTokens = () => {
    const [amount, setAmount] = useState('');
    const web3 = getWeb3();
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';

    const handleBuyTokens = async () => {
        const accounts = await web3.eth.getAccounts();
        const myToken = new web3.eth.Contract(MyToken.abi, contractAddress);
        await myToken.methods.buyTokens().send({
            from: accounts[0],
            value: web3.utils.toWei(amount, 'ether'),
        });
    };

    return (
        <div>
            <h2>Buy Tokens</h2>
            <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount in ETH"
            />
            <button onClick={handleBuyTokens}>Buy Tokens</button>
        </div>
    );
};

export default BuyTokens;
