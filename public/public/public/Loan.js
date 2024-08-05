import React, { useContext, useState } from 'react';
import { BlockchainContext } from '../contexts/BlockchainContext';

const Loan = () => {
    const { web3, accounts, contracts } = useContext(BlockchainContext);
    const [amount, setAmount] = useState('');

    const handleLoan = async () => {
        if (web3 && accounts && contracts) {
            try {
                await contracts.LendingBorrowing.methods.loan(web3.utils.toWei(amount, 'ether')).send({ from: accounts[0] });
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <h2>Loan</h2>
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount in ETH" />
            <button onClick={handleLoan}>Get Loan</button>
        </div>
    );
};

export default Loan;
