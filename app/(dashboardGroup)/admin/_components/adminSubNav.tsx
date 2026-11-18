'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    UtensilsCrossed,
    ChefHat,
} from 'lucide-react';

const ADMIN_TABS = [
    {
        label: 'Overview & Analytics',
        href: '/admin',
        icon: LayoutDashboard,
        exact: true,
    },
    {
        label: 'Users & Roles',
        href: '/admin/users',
        icon: Users,
        exact: false,
    },
    {
        label: 'Menu & Categories',
        href: '/admin/menu',
        icon: UtensilsCrossed,
        exact: false,
    },
    {
        label: 'Kitchen Queue',
        href: '/staff',
        icon: ChefHat,
        exact: false,
    },
];

export const AdminSubNav = () => {
    const pathname = usePathname();

    return (
        <div className="bg-white border-b border-neutral-200/80 sticky top-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4 overflow-x-auto">
                <div className="flex items-center gap-1.5">
                    {ADMIN_TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = tab.exact
                            ? pathname === tab.href
                            : pathname.startsWith(tab.href);

                        return (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${isActive
                                    ? 'bg-neutral-900 text-amber-400 shadow-2xs'
                                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                                    }`}
                            >
                                <Icon className="w-3.5 h-3.5" />
                                <span>{tab.label}</span>
                            </Link>
                        );
                    })}
                </div>

                <span className="hidden md:inline-block text-[11px] font-semibold uppercase tracking-wider text-neutral-400 shrink-0">
                    Admin Mode
                </span>
            </div>
        </div>
    );
};