import React from 'react';
import styles from './../dashboard.module.scss';
import { Actions } from './Actions';
import { TopInfo } from './TopInfo';
import {  useGetQuestion, useGetNo, useGetYes, BigNumber } from './Actions/helpers';
import { PieChart } from 'react-minimal-pie-chart';
import { smartContract } from './Actions/helpers/smartContract';
import { useGetNetworkConfig } from '@multiversx/sdk-dapp/hooks/useGetNetworkConfig';
import { ContractFunction, ResultsParser } from '@multiversx/sdk-core/out';
import { ProxyNetworkProvider } from '@multiversx/sdk-network-providers/out';
import { contractAddress } from 'config';
import { refreshAccount } from '@multiversx/sdk-dapp/utils';
import { sendTransactions } from '@multiversx/sdk-dapp/services';




export const DashboardLayout = ({ children }: React.PropsWithChildren) => {
  const { network } = useGetNetworkConfig();
  const proxy = new ProxyNetworkProvider(network.apiAddress);
  const nrNos:number = useGetNo()?.c[0] ?? 0;
  const nrYes:number = useGetYes()?.c[0] ?? 0;

  const sendNoTransaction = async () => {
    const yesTransaction = {
      receiver: contractAddress,
      data: 'voteNo',
      gasLimit: '50000000',
      value: 0
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: yesTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing No transaction',
        errorMessage: 'An error has occured during vote No',
        successMessage: 'No transaction successful'
      },
      redirectAfterSign: false
    });
  };
  
  const sendYesTransaction = async () => {
    const yesTransaction = {
      receiver: contractAddress,
      data: 'voteYes',
      gasLimit: '50000000',
      value: 0
    };
    await refreshAccount();

    const { sessionId /*, error*/ } = await sendTransactions({
      transactions: yesTransaction,
      transactionsDisplayInfo: {
        processingMessage: 'Processing Yes transaction',
        errorMessage: 'An error has occured during vote Yes',
        successMessage: 'Yes transaction successful'
      },
      redirectAfterSign: false
    });
  };
  


  return (
    <div className='container py-4'>
      <h1>{useGetQuestion()}</h1>
        <button onClick={sendYesTransaction}>YES</button>
        <button onClick={sendNoTransaction}>NO</button>
        <PieChart
          data={[
            { title: 'Yes', value: nrYes, color: '#E38627' },
            { title: 'No', value: nrNos, color: '#C13C37' },
          ]}
       />;
    </div>
  );
};
