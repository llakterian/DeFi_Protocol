import React, { useContext, useState } from 'react';
import { BlockchainContext } from '../contexts/BlockchainContext';

const Deposit = () => {
    const { web3, accounts, contracts } = useContext(BlockchainContext);
    const [amount, setAmount] = useState('');

    const handleDeposit = async () => {
        if (web3 && accounts && contracts) {
            try {
                await contracts.MyToken.methods.deposit().send({ from: accounts[0], value: web3.utils.toWei(amount, 'ether') });
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <h2>Deposit</h2>
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount in ETH" />
            <button onClick={handleDeposit}>Deposit</button>
        </div>
    );
};

export default Deposit;
