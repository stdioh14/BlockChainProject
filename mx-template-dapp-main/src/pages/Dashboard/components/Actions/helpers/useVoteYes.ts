import { useEffect, useState } from 'react';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

interface BigNumber {
    c: Array<number>,
    e: number,
    s: number
}

export const useVoteYes = () => {
  const { network } = useGetNetworkConfig();
  const [yes, setYes] = useState<BigNumber>();

  const proxy = new ProxyNetworkProvider(network.apiAddress);

  const getYes = async () => {
    try {
      smartContract.call(
        {
            func: {
                name : 'voteYes',
                toString(): string {
                    return this.name;
                }},
            args: [],
            gasLimit: 3000000,
            chainID: 'D'
        }
      );
    } catch (err) {
      console.error('Unable to call voteYes', err);
    }
  };

  useEffect(() => {
    getYes();
  }, []);

  return yes;
};
