import React, { createContext, useEffect, useState } from 'react';
import getWeb3 from '../utils/getWeb3';
import MyToken from '../../../abis/MyToken.json';
import ConcreteLendingBorrowing from '../../../abis/ConcreteLendingBorrowing.json';
import ConcreteStaking from '../abis/ConcreteStaking.json';
import { MY_TOKEN_ADDRESS, LENDING_BORROWING_ADDRESS, STAKING_ADDRESS } from '../utils/constants';

export const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
    const [web3, setWeb3] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [contracts, setContracts] = useState({});

    useEffect(() => {
        const init = async () => {
            try {
                const web3Instance = await getWeb3();
                const accounts = await web3Instance.eth.getAccounts();

                const myToken = new web3Instance.eth.Contract(MyToken.abi, MY_TOKEN_ADDRESS);
                const lendingBorrowing = new web3Instance.eth.Contract(ConcreteLendingBorrowing.abi, LENDING_BORROWING_ADDRESS);
                const staking = new web3Instance.eth.Contract(ConcreteStaking.abi, STAKING_ADDRESS);

                setWeb3(web3Instance);
                setAccounts(accounts);
                setContracts({ MyToken: myToken, LendingBorrowing: lendingBorrowing, Staking: staking });
            } catch (error) {
                console.error('Could not connect to blockchain:', error);
            }
        };

        init();
    }, []);

    return (
        <BlockchainContext.Provider value={{ web3, accounts, contracts }}>
            {children}
        </BlockchainContext.Provider>
    );
};
