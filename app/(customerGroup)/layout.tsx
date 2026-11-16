
import { Navbar } from '@/components/ui/shared/NavBar';
import { getMe } from '@/service/getMe'
import React from 'react'


const CustomerGroupLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getMe();
    return (
        <div>
            <Navbar user={user} />
            {children}
        </div>
    )
}

export default CustomerGroupLayout

