import React from 'react';

import { MenuCatalog } from './_components/MenuCatalog';
import { getAllCategories, getAllMenuItems } from '../_actions/menuActions';

const MenuPage = async () => {
    const [categories, menuItems] = await Promise.all([
        getAllCategories(),
        getAllMenuItems(),
    ]);

    return <MenuCatalog categories={categories} menuItems={menuItems} />;
};

export default MenuPage;