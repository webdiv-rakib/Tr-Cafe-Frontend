import React from 'react';
// Adjust import path if needed
import { RiderConsole } from './_components/RiderConsole';
import { getRiderAssignedOrdersAction } from './_actions/riderActions';

const RiderDashboardPage = async () => {
  const orders = await getRiderAssignedOrdersAction();

  return <RiderConsole initialOrders={orders} />;
};

export default RiderDashboardPage;