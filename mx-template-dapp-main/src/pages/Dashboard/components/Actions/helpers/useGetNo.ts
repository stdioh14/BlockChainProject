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

export const useGetNo = ():BigNumber|undefined => {
  const { network } = useGetNetworkConfig();
  const [no, setNo] = useState<BigNumber>();

  const proxy = new ProxyNetworkProvider(network.apiAddress);

  const getNo = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getNrNos')
      });
      const queryResponse = await proxy.queryContract(query);

      const endpointDefinition = smartContract.getEndpoint('getNrNos');

      const { firstValue: no } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      setNo(no?.valueOf());
    } catch (err) {
      console.error('Unable to call getQuestion', err);
    }
  };

  useEffect(() => {
    getNo();
  }, []);

  return no;
};
