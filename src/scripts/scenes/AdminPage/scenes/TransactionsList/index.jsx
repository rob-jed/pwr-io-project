import React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

function TransactionsList({ storeModels }) {
  return (
    <div className="admin-transactions-list">
      {
        (storeModels && storeModels.transactions && storeModels.transactions.length) ? (
          <ul className="transactions-list">
            <li>
              <span className="amount-header">
                Ilość:
              </span>
              <span className="type-header">
                Typ transakcji:
              </span>
              <span className="date-header">
                Data transakcji:
              </span>
            </li>
            {
              storeModels.transactions.map(transaction => (
                <li key={transaction.value} className="transaction">
                  <span className="amount">
                    { transaction.amount }
                  </span>
                  <span className="type">
                    { transaction.transaction_type }
                  </span>
                  <span className="date">
                    { transaction.transaction_date.split(' ')[0] }
                  </span>
                </li>
              ))
            }
          </ul>
        ) : (
          <h1>Brak transakcji</h1>
        )
      }
    </div>
  );
}

const mapStateToProps = state => ({
  storeModels: state.storeModels,
});

export default connect(mapStateToProps)(TransactionsList);
