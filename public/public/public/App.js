import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Deposit from './components/Deposit';
import Loan from './components/Loan';
import Staking from './components/Staking';
import { BlockchainProvider } from './contexts/BlockchainContext';
import './App.css';

const App = () => {
    return (
        <BlockchainProvider>
            <div className="App">
                <Navbar />
                <main>
                    <Deposit />
                    <Loan />
                    <Staking />
                </main>
            </div>
        </BlockchainProvider>
    );
}

export default App;
