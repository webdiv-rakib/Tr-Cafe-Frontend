import React from 'react';
import { AdminSubNav } from './_components/adminSubNav';


export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-neutral-50">
            <AdminSubNav />
            {children}
        </div>
    );
}