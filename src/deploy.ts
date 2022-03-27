import 'dotenv/config';
import HDWalletProvider from '@truffle/hdwallet-provider';
import Web3 from 'web3';
import { abi, evm } from './compile';

const { MNEMONIC_PHRASE, RINKEBY_URI, GAS_AMOUNT } = process.env;

// validate environment variables
if (!MNEMONIC_PHRASE || !RINKEBY_URI || !GAS_AMOUNT) {
  throw new Error('Please set the "MNEMONIC_PHRASE", "RINKEBY_URI" and "GAS_AMOUNT" environment variables');
}
if (isNaN(parseFloat(GAS_AMOUNT))) {
  throw new Error('Please set the "GAS_AMOUNT" environment variable as a number');
}

// create a provider
const provider = new HDWalletProvider(MNEMONIC_PHRASE, RINKEBY_URI);
const web3 = new Web3(provider);

// Deploy the contract
(async () => {
  const accounts = await web3.eth.getAccounts();
  const account = accounts[0];

  console.info('Attempting to deploy contract from account', account);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object })
    .send({ from: account, gas: parseFloat(GAS_AMOUNT) });

  console.info('Contract deployed to', result.options.address);
  provider.engine.stop();
})();
