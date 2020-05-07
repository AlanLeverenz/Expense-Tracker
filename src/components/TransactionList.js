import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Transaction } from './Transaction';

export const TransactionList = () => {
    // destructured context - transactions is an array of transactions
    const { transactions } = useContext(GlobalContext);

    return (
        // fragment, map through transactions provided by GlobalContext via Provider, 
        // pass transaction as a prop to Transaction component
        <>
            <h3>History</h3>
            <ul className="list">
                {transactions.map(transaction => ( <Transaction key={transaction.id} transaction={transaction} /> ))}
            </ul>
        </>
    )
}
