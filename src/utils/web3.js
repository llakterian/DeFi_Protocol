import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

let web3;
let provider;

const loadWeb3 = async () => {
    provider = await detectEthereumProvider();
    if (provider) {
        web3 = new Web3(provider);
    } else {
        console.error('Please install MetaMask!');
    }
};

const getWeb3 = () => web3;
const getProvider = () => provider;

export { loadWeb3, getWeb3, getProvider };
