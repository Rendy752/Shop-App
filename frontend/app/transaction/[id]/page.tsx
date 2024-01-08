import React from 'react';

const TransactionDetail = ({ params }: { params: { id: number } }) => {
  return <div>Transaction Detail Id = {params.id}</div>;
};

export default TransactionDetail;
