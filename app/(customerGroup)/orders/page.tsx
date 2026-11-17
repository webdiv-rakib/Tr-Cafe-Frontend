import React from 'react';
// Adjust import path if needed
import { OrdersList } from './_components/OrdersList';
import { getMyOrdersAction } from '../_actions/orderAction';

const OrdersPage = async () => {
    const orders = await getMyOrdersAction();

    return <OrdersList initialOrders={orders} />;
};

export default OrdersPage;