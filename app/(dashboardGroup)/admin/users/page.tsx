'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Users,
    Search,
    ShieldCheck,
    UserCheck,
    UserX,
    Bike,
    ChefHat,
    ArrowLeft,
    Phone,
    Mail,
    SlidersHorizontal,
} from 'lucide-react';

type UserRole = 'CUSTOMER' | 'RIDER' | 'STAFF' | 'ADMIN';
type UserStatus = 'ACTIVE' | 'BANNED';

interface UserAccount {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    isActive: UserStatus;
    totalOrders: number;
    joinedAt: string;
}

const INITIAL_USERS: UserAccount[] = [
    {
        id: 'USR-101',
        name: 'Afraj',
        email: 'afraj1@gmail.com',
        phone: '01712345678',
        role: 'ADMIN',
        isActive: 'ACTIVE',
        totalOrders: 14,
        joinedAt: 'Nov 01, 2026',
    },
    {
        id: 'USR-102',
        name: 'Toymur',
        email: 'toymur@gmail.com',
        phone: '01889966347',
        role: 'CUSTOMER',
        isActive: 'ACTIVE',
        totalOrders: 9,
        joinedAt: 'Nov 05, 2026',
    },
    {
        id: 'USR-103',
        name: 'Shakil Ahmed',
        email: 'shakil.rider@diu.edu.bd',
        phone: '01798765432',
        role: 'RIDER',
        isActive: 'ACTIVE',
        totalOrders: 42,
        joinedAt: 'Nov 03, 2026',
    },
    {
        id: 'USR-104',
        name: 'Rafiul Islam',
        email: 'rafiul.kitchen@trcafe.com',
        phone: '01611223344',
        role: 'STAFF',
        isActive: 'ACTIVE',
        totalOrders: 0,
        joinedAt: 'Nov 02, 2026',
    },
    {
        id: 'USR-105',
        name: 'Nusrat Jahan',
        email: 'nusrat.diu@diu.edu.bd',
        phone: '01555667788',
        role: 'CUSTOMER',
        isActive: 'ACTIVE',
        totalOrders: 6,
        joinedAt: 'Nov 08, 2026',
    },
    {
        id: 'USR-106',
        name: 'Siam Hossain',
        email: 'siam.test@gmail.com',
        phone: '01999887766',
        role: 'CUSTOMER',
        isActive: 'BANNED',
        totalOrders: 2,
        joinedAt: 'Nov 09, 2026',
    },
];

const ROLE_TABS: ('ALL' | UserRole)[] = ['ALL', 'CUSTOMER', 'RIDER', 'STAFF', 'ADMIN'];

const UsersPage = () => {
    const [users, setUsers] = useState<UserAccount[]>(INITIAL_USERS);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedRole, setSelectedRole] = useState<'ALL' | UserRole>('ALL');
    const [statusFilter, setStatusFilter] = useState<'ALL' | UserStatus>('ALL');

    const handleRoleChange = (userId: string, newRole: UserRole) => {
        setUsers((prev) =>
            prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
        );
    };

    const toggleUserStatus = (userId: string) => {
        setUsers((prev) =>
            prev.map((u) =>
                u.id === userId
                    ? { ...u, isActive: u.isActive === 'ACTIVE' ? 'BANNED' : 'ACTIVE' }
                    : u
            )
        );
    };

    const filteredUsers = users.filter((u) => {
        const matchesSearch =
            u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            u.phone.includes(searchQuery);
        const matchesRole = selectedRole === 'ALL' || u.role === selectedRole;
        const matchesStatus = statusFilter === 'ALL' || u.isActive === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const getRoleBadgeStyle = (role: UserRole) => {
        switch (role) {
            case 'ADMIN':
                return 'bg-neutral-900 text-amber-400 border-neutral-800';
            case 'STAFF':
                return 'bg-amber-50 text-amber-700 border-amber-200/80';
            case 'RIDER':
                return 'bg-blue-50 text-blue-700 border-blue-200/80';
            default:
                return 'bg-neutral-100 text-neutral-700 border-neutral-200/80';
        }
    };

    return (
        <main className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Top Admin Header Banner */}
                <div className="bg-neutral-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-neutral-800 shadow-sm">
                    <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                <ShieldCheck className="w-3.5 h-3.5" /> Role & Access Control
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                Manage TR Cafe Users & Roles
                            </h1>
                            <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-xl">
                                Promote students or staff to campus Riders, Kitchen Staff, or Admins, and activate or restrict accounts in one click.
                            </p>
                        </div>

                        <Link
                            href="/dashboard/admin"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 font-semibold text-xs rounded-xl transition-all shrink-0"
                        >
                            <ArrowLeft className="w-4 h-4 text-amber-400" />
                            <span>Admin Overview</span>
                        </Link>
                    </div>
                </div>

                {/* Summary KPI Strip */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
                        <div className="h-11 w-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                            <Users className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-neutral-500">Total Users</p>
                            <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">{users.length}</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
                        <div className="h-11 w-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center shrink-0">
                            <Bike className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-neutral-500">Campus Riders</p>
                            <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">
                                {users.filter((u) => u.role === 'RIDER').length}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
                        <div className="h-11 w-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
                            <ChefHat className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-neutral-500">Kitchen & Admins</p>
                            <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">
                                {users.filter((u) => u.role === 'STAFF' || u.role === 'ADMIN').length}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
                        <div className="h-11 w-11 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-600 flex items-center justify-center shrink-0">
                            <UserX className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-neutral-500">Banned Accounts</p>
                            <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">
                                {users.filter((u) => u.isActive === 'BANNED').length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Search & Role/Status Filter Bar */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-4 sm:p-5 space-y-4">
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                                <Search className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search by name, DIU email, or phone..."
                                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                            />
                        </div>

                        {/* Account Status Filter */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-neutral-500">Status:</span>
                            {(['ALL', 'ACTIVE', 'BANNED'] as const).map((status) => (
                                <button
                                    key={status}
                                    type="button"
                                    onClick={() => setStatusFilter(status)}
                                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${statusFilter === status
                                            ? 'bg-neutral-900 text-amber-400 border-neutral-900'
                                            : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-600 border-neutral-200'
                                        }`}
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Role Filter Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pt-3 border-t border-neutral-100">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400 shrink-0 mr-1" />
                        {ROLE_TABS.map((role) => {
                            const isActive = selectedRole === role;
                            return (
                                <button
                                    key={role}
                                    type="button"
                                    onClick={() => setSelectedRole(role)}
                                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${isActive
                                            ? 'bg-amber-500 text-white shadow-2xs'
                                            : 'bg-neutral-100 hover:bg-neutral-200/70 text-neutral-600'
                                        }`}
                                >
                                    {role === 'ALL' ? 'All Roles' : role}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Users Table Card */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden">
                    <div className="p-5 sm:p-6 border-b border-neutral-100 flex items-center justify-between">
                        <h2 className="text-base font-bold text-neutral-900">
                            Registered Accounts ({filteredUsers.length})
                        </h2>
                        <span className="text-xs text-neutral-400">
                            Changes reflect immediately in UI preview
                        </span>
                    </div>

                    {filteredUsers.length === 0 ? (
                        <div className="p-12 text-center space-y-2">
                            <p className="text-sm font-bold text-neutral-900">No users match your filters</p>
                            <p className="text-xs text-neutral-500">
                                Try clearing your search query or switching back to All Roles.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-neutral-50/80 border-b border-neutral-100 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                                        <th className="py-3.5 px-6">User Details</th>
                                        <th className="py-3.5 px-4">Contact</th>
                                        <th className="py-3.5 px-4">Current Role</th>
                                        <th className="py-3.5 px-4">Assign Role</th>
                                        <th className="py-3.5 px-4">Account Status</th>
                                        <th className="py-3.5 px-6 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 text-xs">
                                    {filteredUsers.map((account) => {
                                        const initial = account.name.charAt(0).toUpperCase();
                                        const isBanned = account.isActive === 'BANNED';

                                        return (
                                            <tr
                                                key={account.id}
                                                className={`transition-colors ${isBanned ? 'bg-red-50/25' : 'hover:bg-neutral-50/60'
                                                    }`}
                                            >
                                                {/* User Avatar & Name */}
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={`h-9 w-9 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${isBanned
                                                                    ? 'bg-neutral-200 text-neutral-500'
                                                                    : 'bg-amber-500 text-white shadow-2xs'
                                                                }`}
                                                        >
                                                            {initial}
                                                        </div>
                                                        <div>
                                                            <div className="font-bold text-neutral-900 flex items-center gap-2">
                                                                <span>{account.name}</span>
                                                                <span className="text-[10px] font-mono text-neutral-400">
                                                                    {account.id}
                                                                </span>
                                                            </div>
                                                            <div className="text-[11px] text-neutral-400 mt-0.5">
                                                                Joined {account.joinedAt}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Email & Phone */}
                                                <td className="py-4 px-4 space-y-1">
                                                    <div className="flex items-center gap-1.5 text-neutral-700 font-medium">
                                                        <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                                                        <span>{account.email}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-neutral-500">
                                                        <Phone className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                                        <span>{account.phone}</span>
                                                    </div>
                                                </td>

                                                {/* Current Role Badge */}
                                                <td className="py-4 px-4">
                                                    <span
                                                        className={`inline-flex items-center px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase ${getRoleBadgeStyle(
                                                            account.role
                                                        )}`}
                                                    >
                                                        {account.role}
                                                    </span>
                                                </td>

                                                {/* Role Selector Dropdown */}
                                                <td className="py-4 px-4">
                                                    <select
                                                        value={account.role}
                                                        onChange={(e) =>
                                                            handleRoleChange(account.id, e.target.value as UserRole)
                                                        }
                                                        aria-label={`Change role for ${account.name}`}
                                                        className="px-3 py-1.5 text-xs font-semibold bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 focus:bg-white focus:outline-none focus:border-amber-500 cursor-pointer"
                                                    >
                                                        <option value="CUSTOMER">CUSTOMER</option>
                                                        <option value="RIDER">RIDER</option>
                                                        <option value="STAFF">STAFF</option>
                                                        <option value="ADMIN">ADMIN</option>
                                                    </select>
                                                </td>

                                                {/* Active / Banned Status Badge */}
                                                <td className="py-4 px-4">
                                                    {account.isActive === 'ACTIVE' ? (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-700 text-[10px] font-bold uppercase">
                                                            <UserCheck className="w-3 h-3" /> ACTIVE
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 border border-red-200/70 text-red-600 text-[10px] font-bold uppercase">
                                                            <UserX className="w-3 h-3" /> BANNED
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Ban / Activate Toggle Button */}
                                                <td className="py-4 px-6 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleUserStatus(account.id)}
                                                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${account.isActive === 'ACTIVE'
                                                                ? 'bg-red-50 hover:bg-red-100 text-red-600 border-red-200/80'
                                                                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border-emerald-200/80'
                                                            }`}
                                                    >
                                                        {account.isActive === 'ACTIVE' ? 'Ban User' : 'Activate'}
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </main>
    );
};

export default UsersPage;