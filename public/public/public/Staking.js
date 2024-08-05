import React, { useContext, useState } from 'react';
import { BlockchainContext } from '../contexts/BlockchainContext';

const Staking = () => {
    const { web3, accounts, contracts } = useContext(BlockchainContext);
    const [amount, setAmount] = useState('');

    const handleStake = async () => {
        if (web3 && accounts && contracts) {
            try {
                await contracts.Staking.methods.stake(web3.utils.toWei(amount, 'ether')).send({ from: accounts[0] });
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <div>
            <h2>Staking</h2>
            <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount in ETH" />
            <button onClick={handleStake}>Stake</button>
        </div>
    );
};

export default Staking;
