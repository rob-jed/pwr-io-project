import React from 'react';
import { connect } from 'react-redux';

import './styles.scss';

function TransactionsList({ storeModels }) {
  return (
    <div className="admin-transactions-list">
      {
        (storeModels && storeModels.transactions && storeModels.transactions.length) ? (
          <ul className="transactions-list">
            {
              storeModels.transactions.map(transaction => (
                <li key={transaction.value} className="transaction">
                  { transaction.text }
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
