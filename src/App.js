import React, { useEffect } from 'react';
import { loadWeb3 } from './utils/web3';
import BuyTokens from './components/BuyTokens';
import DepositTokens from './components/DepositTokens';
import TakeLoan from './components/TakeLoan';
import RepayLoan from './components/RepayLoan';
import StakeTokens from './components/StakeTokens';

const App = () => {
  useEffect(() => {
    loadWeb3();
  }, []);

  return (
    <div className="App">
      <h1>DeFi Protocol</h1>
      <BuyTokens />
      <DepositTokens />
      <TakeLoan />
      <RepayLoan />
      <StakeTokens />
    </div>
  );
};

export default App;
