import React, { useState } from 'react';
import { getWeb3 } from '../utils/web3';
import ConcreteStaking from '../abis/ConcreteStaking.json';

const StakeTokens = () => {
    const [amount, setAmount] = useState('');
    const web3 = getWeb3();
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';

    const handleStake = async () => {
        const accounts = await web3.eth.getAccounts();
        const stakingContract = new web3.eth.Contract(ConcreteStaking.abi, contractAddress);
        await stakingContract.methods.stakeTokens(web3.utils.toWei(amount, 'ether')).send({
            from: accounts[0],
        });
    };

    return (
        <div>
            <h2>Stake Tokens</h2>
            <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount in ETH"
            />
            <button onClick={handleStake}>Stake</button>
        </div>
    );
};

export default StakeTokens;
