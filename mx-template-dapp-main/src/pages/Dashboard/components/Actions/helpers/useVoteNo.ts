import { useEffect, useState } from 'react';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { ResultsParser } from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

interface BigNumber {
    c: Array<number>,
    e: number,
    s: number
}

export const useVoteNo = () => {
  const { network } = useGetNetworkConfig();
  const [no, setNo] = useState<BigNumber>();

  const proxy = new ProxyNetworkProvider(network.apiAddress);

  const getNo = async () => {
    try {
      smartContract.call(
        {
            func: {
                name : 'voteNo',
                toString(): string {
                    return this.name;
                }},
            args: [],
            gasLimit: 3000000,
            chainID: 'D'
        }
      );
    } catch (err) {
      console.error('Unable to call voteNo', err);
    }
  };

  useEffect(() => {
    getNo();
  }, []);

  return no;
};
