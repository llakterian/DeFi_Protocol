import React, { useState } from 'react';
import { getWeb3 } from '../utils/web3';
import ConcreteLendingBorrowing from '../abis/ConcreteLendingBorrowing.json';

const RepayLoan = () => {
    const [amount, setAmount] = useState('');
    const web3 = getWeb3();
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';

    const handleRepayLoan = async () => {
        const accounts = await web3.eth.getAccounts();
        const lendingContract = new web3.eth.Contract(ConcreteLendingBorrowing.abi, contractAddress);
        await lendingContract.methods.repayLoan(web3.utils.toWei(amount, 'ether')).send({
            from: accounts[0],
        });
    };

    return (
        <div>
            <h2>Repay Loan</h2>
            <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount in ETH"
            />
            <button onClick={handleRepayLoan}>Repay Loan</button>
        </div>
    );
};

export default RepayLoan;
