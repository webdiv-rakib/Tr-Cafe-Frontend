import React from 'react';
// Adjust import path if needed
import { StaffConsole } from './_components/StaffConsole';
import { getAllOrdersForStaffAction, getAvailableRidersAction, getStaffMenuItemsAction } from './_actions/staffActions';

const StaffDashboardPage = async () => {
    const [orders, riders, menuItems] = await Promise.all([
        getAllOrdersForStaffAction(),
        getAvailableRidersAction(),
        getStaffMenuItemsAction(),
    ]);

    return (
        <StaffConsole
            initialOrders={orders}
            riders={riders}
            initialMenuItems={menuItems}
        />
    );
};

export default StaffDashboardPage;