import { useEffect, useState } from 'react';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { smartContract } from './smartContract';

const resultsParser = new ResultsParser();

export const useGetQuestion = () => {
  const { network } = useGetNetworkConfig();
  const [question, setQuestion] = useState<string>();

  const proxy = new ProxyNetworkProvider(network.apiAddress);

  const getQuestion = async () => {
    try {
      const query = smartContract.createQuery({
        func: new ContractFunction('getQuestion')
      });
      const queryResponse = await proxy.queryContract(query);

      const endpointDefinition = smartContract.getEndpoint('getQuestion');

      const { firstValue: question } = resultsParser.parseQueryResponse(
        queryResponse,
        endpointDefinition
      );

      setQuestion(question?.valueOf()?.toString(10));
    } catch (err) {
      console.error('Unable to call getQuestion', err);
    }
  };

  useEffect(() => {
    getQuestion();
  }, []);

  return question;
};
