import path from 'path';
import fs from 'fs';
import solc from 'solc';

const rootDir = path.resolve();
const lotteryPath = path.join(rootDir, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');

const input = {
  language: 'Solidity',
  sources: {
    'Lottery.sol': {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

export const { abi, evm } = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Lottery.sol'].Lottery;
