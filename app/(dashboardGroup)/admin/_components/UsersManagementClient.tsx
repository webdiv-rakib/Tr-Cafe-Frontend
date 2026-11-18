/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
    Users,
    Search,
    ShieldCheck,
    ChefHat,
    Bike,
    UserCheck,
    Ban,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Mail,
    Phone,
    RefreshCw,
} from 'lucide-react';
import { IManagedUser, updateUserRoleAction, updateUserStatusAction, UserRoleType, UserStatusType } from '../_actions/userManagementActions';
// Adjust import path if needed

interface UsersManagementClientProps {
    initialUsers: IManagedUser[];
}

const ROLES: UserRoleType[] = ['CUSTOMER', 'STAFF', 'RIDER', 'ADMIN'];

export const UsersManagementClient = ({
    initialUsers,
}: UsersManagementClientProps) => {
    const router = useRouter();
    const [isRefreshing, startTransition] = useTransition();

    const [users, setUsers] = useState<IManagedUser[]>(initialUsers);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState<'ALL' | UserRoleType>('ALL');
    const [busyUserId, setBusyUserId] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);

    React.useEffect(() => {
        setUsers(initialUsers);
    }, [initialUsers]);

    const filteredUsers = users.filter((user) => {
        const matchesRole = roleFilter === 'ALL' || user.role === roleFilter;
        const q = searchQuery.toLowerCase();
        const matchesQuery =
            user.name.toLowerCase().includes(q) ||
            user.email.toLowerCase().includes(q) ||
            (user.phone && user.phone.toLowerCase().includes(q));

        return matchesRole && matchesQuery;
    });

    const handleRoleChange = async (userId: string, nextRole: UserRoleType) => {
        setFeedback(null);
        setBusyUserId(userId);

        const previousUsers = [...users];
        setUsers((prev) =>
            prev.map((u) => (u.id === userId ? { ...u, role: nextRole } : u))
        );

        const res = await updateUserRoleAction(userId, nextRole);
        if (!res.success) {
            setUsers(previousUsers);
            setFeedback({ type: 'error', text: res.message });
            setBusyUserId(null);
            return;
        }

        setFeedback({ type: 'success', text: res.message });
        setBusyUserId(null);
        startTransition(() => router.refresh());
    };

    const handleStatusToggle = async (user: IManagedUser) => {
        const nextStatus: UserStatusType =
            user.isActive === 'BANNED' ? 'ACTIVE' : 'BANNED';

        setFeedback(null);
        setBusyUserId(user.id);

        const previousUsers = [...users];
        setUsers((prev) =>
            prev.map((u) => (u.id === user.id ? { ...u, isActive: nextStatus } : u))
        );

        const res = await updateUserStatusAction(user.id, nextStatus);
        if (!res.success) {
            setUsers(previousUsers);
            setFeedback({ type: 'error', text: res.message });
            setBusyUserId(null);
            return;
        }

        setFeedback({ type: 'success', text: res.message });
        setBusyUserId(null);
        startTransition(() => router.refresh());
    };

    const getRoleBadge = (role: UserRoleType) => {
        switch (role) {
            case 'ADMIN':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-700 text-[10px] font-bold uppercase">
                        <ShieldCheck className="w-3 h-3" /> Admin
                    </span>
                );
            case 'STAFF':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold uppercase">
                        <ChefHat className="w-3 h-3" /> Kitchen Staff
                    </span>
                );
            case 'RIDER':
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold uppercase">
                        <Bike className="w-3 h-3" /> Campus Rider
                    </span>
                );
            default:
                return (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-[10px] font-bold uppercase">
                        <UserCheck className="w-3 h-3" /> Customer
                    </span>
                );
        }
    };

    return (
        <main className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Top Header Banner */}
                <div className="bg-neutral-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-neutral-800 shadow-sm">
                    <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                <Users className="w-3.5 h-3.5" /> Access Control & Roles
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                Manage TR Cafe Users
                            </h1>
                            <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-xl">
                                Promote students to Kitchen Staff or Campus Riders, audit account status, and suspend or reactivate accounts.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => startTransition(() => router.refresh())}
                            disabled={isRefreshing}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 font-semibold text-xs rounded-xl transition-all shrink-0 cursor-pointer"
                        >
                            <RefreshCw
                                className={`w-3.5 h-3.5 text-amber-400 ${isRefreshing ? 'animate-spin' : ''}`}
                            />
                            <span>{isRefreshing ? 'Syncing...' : 'Refresh Users'}</span>
                        </button>
                    </div>
                </div>

                {/* Feedback Alert Banner */}
                {feedback && (
                    <div
                        className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-2.5 ${feedback.type === 'success'
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                                : 'bg-red-50 border-red-200 text-red-700'
                            }`}
                    >
                        {feedback.type === 'success' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        ) : (
                            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        )}
                        <span>{feedback.text}</span>
                    </div>
                )}

                {/* Role Breakdown KPI Strip */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs">
                        <p className="text-xs font-medium text-neutral-500">Customers</p>
                        <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">
                            {users.filter((u) => u.role === 'CUSTOMER').length}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs">
                        <p className="text-xs font-medium text-neutral-500">Kitchen Staff</p>
                        <p className="text-2xl font-extrabold text-blue-600 mt-0.5">
                            {users.filter((u) => u.role === 'STAFF').length}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs">
                        <p className="text-xs font-medium text-neutral-500">Campus Riders</p>
                        <p className="text-2xl font-extrabold text-amber-600 mt-0.5">
                            {users.filter((u) => u.role === 'RIDER').length}
                        </p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-neutral-200/80 shadow-2xs">
                        <p className="text-xs font-medium text-neutral-500">Suspended Accounts</p>
                        <p className="text-2xl font-extrabold text-red-600 mt-0.5">
                            {users.filter((u) => u.isActive === 'BANNED').length}
                        </p>
                    </div>
                </div>

                {/* Search & Role Filter Bar */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                            <Search className="w-4 h-4" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, email, or phone..."
                            className="w-full pl-10 pr-4 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                        />
                    </div>

                    <div className="flex items-center gap-1.5 overflow-x-auto">
                        {(['ALL', ...ROLES] as const).map((role) => (
                            <button
                                key={role}
                                type="button"
                                onClick={() => setRoleFilter(role)}
                                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${roleFilter === role
                                        ? 'bg-neutral-900 text-amber-400'
                                        : 'bg-neutral-100 hover:bg-neutral-200/70 text-neutral-600'
                                    }`}
                            >
                                {role === 'ALL' ? `All (${users.length})` : role}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden">
                    {filteredUsers.length === 0 ? (
                        <div className="p-12 text-center space-y-2">
                            <p className="text-sm font-bold text-neutral-900">No matching users found</p>
                            <p className="text-xs text-neutral-500">
                                Try adjusting your search query or role filter.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-neutral-50 border-b border-neutral-100 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                                        <th className="py-3.5 px-6">User Details</th>
                                        <th className="py-3.5 px-4">Current Role</th>
                                        <th className="py-3.5 px-4">Assign Role</th>
                                        <th className="py-3.5 px-4">Account Status</th>
                                        <th className="py-3.5 px-6 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 text-xs">
                                    {filteredUsers.map((user) => {
                                        const isBusy = busyUserId === user.id;
                                        const isBanned = user.isActive === 'BANNED';

                                        return (
                                            <tr
                                                key={user.id}
                                                className="hover:bg-neutral-50/60 transition-colors"
                                            >
                                                <td className="py-4 px-6">
                                                    <p className="font-bold text-neutral-900 text-sm">{user.name}</p>
                                                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-neutral-500 mt-0.5">
                                                        <span className="inline-flex items-center gap-1">
                                                            <Mail className="w-3 h-3 text-neutral-400" />
                                                            {user.email}
                                                        </span>
                                                        {user.phone && (
                                                            <span className="inline-flex items-center gap-1">
                                                                <Phone className="w-3 h-3 text-amber-600" />
                                                                {user.phone}
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>

                                                <td className="py-4 px-4 whitespace-nowrap">
                                                    {getRoleBadge(user.role)}
                                                </td>

                                                <td className="py-4 px-4 whitespace-nowrap">
                                                    <select
                                                        value={user.role}
                                                        disabled={isBusy}
                                                        onChange={(e) =>
                                                            handleRoleChange(
                                                                user.id,
                                                                e.target.value as UserRoleType
                                                            )
                                                        }
                                                        className="px-3 py-1.5 text-xs font-semibold bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 focus:outline-none focus:border-amber-500 disabled:opacity-50 cursor-pointer"
                                                    >
                                                        {ROLES.map((r) => (
                                                            <option key={r} value={r}>
                                                                {r}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>

                                                <td className="py-4 px-4 whitespace-nowrap">
                                                    {isBanned ? (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-[10px] font-bold uppercase">
                                                            <Ban className="w-3 h-3" /> Banned
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase">
                                                            <CheckCircle2 className="w-3 h-3" /> Active
                                                        </span>
                                                    )}
                                                </td>

                                                <td className="py-4 px-6 whitespace-nowrap text-right">
                                                    <button
                                                        type="button"
                                                        disabled={isBusy}
                                                        onClick={() => handleStatusToggle(user)}
                                                        className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer disabled:opacity-50 ${isBanned
                                                                ? 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700'
                                                                : 'bg-red-50 hover:bg-red-100 border-red-200 text-red-600'
                                                            }`}
                                                    >
                                                        {isBusy ? (
                                                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                                        ) : isBanned ? (
                                                            <>
                                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                                                <span>Activate</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Ban className="w-3.5 h-3.5" />
                                                                <span>Ban User</span>
                                                            </>
                                                        )}
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