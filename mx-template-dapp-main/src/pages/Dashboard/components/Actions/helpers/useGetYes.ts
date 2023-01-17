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

export const useGetYes = ():BigNumber|undefined => {
  const { network } = useGetNetworkConfig();
  const [yes, setYes] = useState<BigNumber>();

  const proxy = new ProxyNetworkProvider(network.apiAddress);

  const getYes = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getNrYes')
      });
      const queryResponse = await proxy.queryContract(query);

      const endpointDefinition = smartContract.getEndpoint('getNrYes');

      const { firstValue: yes } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      setYes(yes?.valueOf());
    } catch (err) {
      console.error('Unable to call getQuestion', err);
    }
  };

  useEffect(() => {
    getYes();
  }, []);

  return yes;
};
