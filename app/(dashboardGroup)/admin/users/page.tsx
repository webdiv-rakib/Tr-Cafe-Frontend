import React from 'react';
import { getAllUsersAction } from '../_actions/userManagementActions';
import { UsersManagementClient } from '../_components/UsersManagementClient';


const UsersPage = async () => {
    const users = await getAllUsersAction();

    return <UsersManagementClient initialUsers={users} />;
};

export default UsersPage;