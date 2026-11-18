import React from 'react';
import { getAdminMenuItemsAction, getCategoriesAction } from '../_actions/menuManagementActions';
import { MenuManagementClient } from '../_components/MenuManagementClient';


const AdminMenuPage = async () => {
    const [categories, menuItems] = await Promise.all([
        getCategoriesAction(),
        getAdminMenuItemsAction(),
    ]);

    return (
        <MenuManagementClient
            initialCategories={categories}
            initialMenuItems={menuItems}
        />
    );
};

export default AdminMenuPage;