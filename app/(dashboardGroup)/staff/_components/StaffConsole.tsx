/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
    ChefHat,
    Clock,
    Bike,
    Flame,
    MapPin,
    UtensilsCrossed,
    Sparkles,
    AlertCircle,
    Loader2,
    Phone,
    FileText,
    RefreshCw,
} from 'lucide-react';
import {
    assignRiderAction,
    IRiderOption,
    IStaffMenuItem,
    IStaffOrder,
    toggleMenuItemFlagAction,
    updateOrderStatusByStaffAction,
} from '../_actions/staffActions'; // Adjust import path if needed

interface StaffConsoleProps {
    initialOrders: IStaffOrder[];
    riders: IRiderOption[];
    initialMenuItems: IStaffMenuItem[];
}

export const StaffConsole = ({
    initialOrders,
    riders,
    initialMenuItems,
}: StaffConsoleProps) => {
    const router = useRouter();
    const [isRefreshing, startTransition] = useTransition();

    const [orders, setOrders] = useState<IStaffOrder[]>(initialOrders);
    const [menuItems, setMenuItems] = useState<IStaffMenuItem[]>(initialMenuItems);
    const [selectedRiders, setSelectedRiders] = useState<Record<string, string>>({});
    const [loadingOrderId, setLoadingOrderId] = useState<string | null>(null);
    const [updatingMenuId, setUpdatingMenuId] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Sync state when server refreshes
    React.useEffect(() => {
        setOrders(initialOrders);
    }, [initialOrders]);

    React.useEffect(() => {
        setMenuItems(initialMenuItems);
    }, [initialMenuItems]);

    // Filter active kitchen queue (PENDING & PREPARING)
    const activeKitchenOrders = orders.filter(
        (o) => o.status === 'PENDING' || o.status === 'PREPARING'
    );
    const pendingCount = orders.filter((o) => o.status === 'PENDING').length;
    const preparingCount = orders.filter((o) => o.status === 'PREPARING').length;

    const formatTimeAgo = (isoString: string) => {
        try {
            const diffMins = Math.max(
                1,
                Math.floor((Date.now() - new Date(isoString).getTime()) / 60000)
            );
            if (diffMins < 60) return `${diffMins} min${diffMins === 1 ? '' : 's'} ago`;
            const diffHours = Math.floor(diffMins / 60);
            return `${diffHours} hr${diffHours === 1 ? '' : 's'} ago`;
        } catch {
            return 'Recently';
        }
    };

    const handleAcceptOrder = async (orderId: string) => {
        setErrorMessage(null);
        setLoadingOrderId(orderId);

        const res = await updateOrderStatusByStaffAction(orderId, 'PREPARING');
        if (!res.success) {
            setErrorMessage(res.message);
            setLoadingOrderId(null);
            return;
        }

        setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status: 'PREPARING' } : o))
        );
        setLoadingOrderId(null);
        startTransition(() => router.refresh());
    };

    const handleDispatchRider = async (orderId: string) => {
        const riderId = selectedRiders[orderId];
        if (!riderId) {
            setErrorMessage('Please select a campus rider before dispatching.');
            return;
        }

        setErrorMessage(null);
        setLoadingOrderId(orderId);

        const res = await assignRiderAction(orderId, riderId);
        if (!res.success) {
            setErrorMessage(res.message);
            setLoadingOrderId(null);
            return;
        }

        setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status: 'OUT_FOR_DELIVERY' } : o))
        );
        setLoadingOrderId(null);
        startTransition(() => router.refresh());
    };

    const handleToggleAvailability = async (item: IStaffMenuItem) => {
        const nextValue = !item.isAvailable;
        setErrorMessage(null);
        setUpdatingMenuId(item.id);

        // Optimistic update
        setMenuItems((prev) =>
            prev.map((m) => (m.id === item.id ? { ...m, isAvailable: nextValue } : m))
        );

        const res = await toggleMenuItemFlagAction(item.id, { isAvailable: nextValue });
        if (!res.success) {
            setErrorMessage(res.message);
            // Revert on failure
            setMenuItems((prev) =>
                prev.map((m) => (m.id === item.id ? { ...m, isAvailable: item.isAvailable } : m))
            );
        }

        setUpdatingMenuId(null);
        startTransition(() => router.refresh());
    };

    const handleToggleSpecial = async (item: IStaffMenuItem) => {
        const nextValue = !item.isSpecial;
        setErrorMessage(null);
        setUpdatingMenuId(item.id);

        // Optimistic update
        setMenuItems((prev) =>
            prev.map((m) => (m.id === item.id ? { ...m, isSpecial: nextValue } : m))
        );

        const res = await toggleMenuItemFlagAction(item.id, { isSpecial: nextValue });
        if (!res.success) {
            setErrorMessage(res.message);
            // Revert on failure
            setMenuItems((prev) =>
                prev.map((m) => (m.id === item.id ? { ...m, isSpecial: item.isSpecial } : m))
            );
        }

        setUpdatingMenuId(null);
        startTransition(() => router.refresh());
    };

    return (
        <main className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Top Kitchen Header Banner */}
                <div className="bg-neutral-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-neutral-800 shadow-sm">
                    <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                <ChefHat className="w-3.5 h-3.5" /> Kitchen & Dispatch Station
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                TR Cafe Staff Console
                            </h1>
                            <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-xl">
                                Accept incoming DIU student orders, update preparation status, dispatch campus riders, and toggle real-time menu stock.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => startTransition(() => router.refresh())}
                            disabled={isRefreshing}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 font-semibold text-xs rounded-xl transition-all shrink-0 cursor-pointer"
                        >
                            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                            <span>{isRefreshing ? 'Refreshing...' : 'Refresh Queue'}</span>
                        </button>
                    </div>
                </div>

                {/* Error Alert Banner */}
                {errorMessage && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2.5">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                {/* Kitchen Summary Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-neutral-500">New Pending Orders</p>
                            <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">{pendingCount}</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center shrink-0">
                            <Flame className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-neutral-500">Currently Preparing</p>
                            <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">{preparingCount}</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
                            <UtensilsCrossed className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-neutral-500">In-Stock Menu Items</p>
                            <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">
                                {menuItems.filter((i) => i.isAvailable).length} / {menuItems.length}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid: Live Kitchen Queue + Menu Stock & Specials Toggles */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Left Column (7 cols): Live Kitchen Order Queue */}
                    <section className="lg:col-span-7 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                                <ChefHat className="w-4 h-4 text-amber-600" />
                                Live Kitchen Order Queue ({activeKitchenOrders.length})
                            </h2>
                            <span className="text-xs font-medium text-neutral-400">
                                Real-time campus orders
                            </span>
                        </div>

                        {activeKitchenOrders.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-10 text-center space-y-2">
                                <p className="text-sm font-bold text-neutral-900">Kitchen queue is clear!</p>
                                <p className="text-xs text-neutral-500">
                                    No pending or preparing orders right now. Click Refresh Queue to check for new student orders.
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {activeKitchenOrders.map((order) => {
                                    const shortOrderId = `#${order.id.slice(-8).toUpperCase()}`;
                                    const customerName = order.user?.name || 'DIU Student';
                                    const paymentLabel = order.payment
                                        ? `${order.payment.provider} (${order.payment.status})`
                                        : 'COD';
                                    const isBusy = loadingOrderId === order.id;

                                    return (
                                        <div
                                            key={order.id}
                                            className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-6 space-y-4"
                                        >
                                            {/* Order Top Row */}
                                            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100">
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-extrabold text-neutral-900">
                                                            {shortOrderId}
                                                        </span>
                                                        <span className="text-xs font-semibold text-neutral-600">
                                                            - {customerName}
                                                        </span>
                                                    </div>
                                                    <p className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                                                        <Clock className="w-3 h-3" /> Ordered {formatTimeAgo(order.createdAt)} • {paymentLabel}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${order.status === 'PENDING'
                                                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                                        : 'bg-blue-50 text-blue-700 border border-blue-200'
                                                        }`}
                                                >
                                                    {order.status}
                                                </span>
                                            </div>

                                            {/* Items & Campus Location */}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100 space-y-1.5">
                                                    <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                                                        Items to Prepare
                                                    </p>
                                                    <ul className="text-xs font-semibold text-neutral-800 space-y-1">
                                                        {order.items.map((item) => (
                                                            <li key={item.id}>
                                                                • {item.quantity}x {item.menuItem?.name || 'Menu Item'}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    {order.orderNotes && (
                                                        <p className="text-[11px] text-amber-700 flex items-start gap-1 pt-2 mt-2 border-t border-neutral-200/70">
                                                            <FileText className="w-3 h-3 shrink-0 mt-0.5" />
                                                            <span>{order.orderNotes}</span>
                                                        </p>
                                                    )}
                                                </div>

                                                <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100 flex flex-col justify-between space-y-2">
                                                    <div>
                                                        <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                                                            DIU Delivery Spot
                                                        </p>
                                                        <p className="text-xs font-bold text-neutral-900 flex items-start gap-1.5 mt-1">
                                                            <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                                            <span>{order.deliveryAddress}</span>
                                                        </p>
                                                        {order.contactPhone && (
                                                            <p className="text-[11px] text-neutral-600 flex items-center gap-1 mt-1.5">
                                                                <Phone className="w-3 h-3 text-amber-600" />
                                                                <span>{order.contactPhone}</span>
                                                            </p>
                                                        )}
                                                    </div>
                                                    <p className="text-xs font-extrabold text-neutral-900 pt-2 border-t border-neutral-200/70">
                                                        Total: {order.totalAmount} BDT
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Kitchen & Rider Dispatch Actions */}
                                            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                                                {order.status === 'PENDING' ? (
                                                    <button
                                                        type="button"
                                                        disabled={isBusy}
                                                        onClick={() => handleAcceptOrder(order.id)}
                                                        className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                                                    >
                                                        {isBusy ? (
                                                            <>
                                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                                <span>Updating Status...</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Flame className="w-4 h-4" />
                                                                <span>Accept & Start Preparing</span>
                                                            </>
                                                        )}
                                                    </button>
                                                ) : (
                                                    <>
                                                        <select
                                                            value={selectedRiders[order.id] || ''}
                                                            disabled={isBusy}
                                                            onChange={(e) =>
                                                                setSelectedRiders((prev) => ({
                                                                    ...prev,
                                                                    [order.id]: e.target.value,
                                                                }))
                                                            }
                                                            className="flex-1 px-3.5 py-2.5 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 focus:outline-none focus:border-amber-500"
                                                        >
                                                            <option value="" disabled>
                                                                {riders.length === 0
                                                                    ? 'No active riders available'
                                                                    : 'Select Campus Rider...'}
                                                            </option>
                                                            {riders.map((rider) => (
                                                                <option key={rider.id} value={rider.id}>
                                                                    {rider.name} {rider.phone ? `(${rider.phone})` : ''}
                                                                </option>
                                                            ))}
                                                        </select>

                                                        <button
                                                            type="button"
                                                            disabled={isBusy || riders.length === 0}
                                                            onClick={() => handleDispatchRider(order.id)}
                                                            className="py-2.5 px-5 rounded-xl bg-neutral-900 hover:bg-neutral-800 disabled:opacity-60 text-amber-400 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed shrink-0"
                                                        >
                                                            {isBusy ? (
                                                                <>
                                                                    <Loader2 className="w-4 h-4 animate-spin" />
                                                                    <span>Dispatching...</span>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Bike className="w-4 h-4" />
                                                                    <span>Dispatch Rider</span>
                                                                </>
                                                            )}
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                    {/* Right Column (5 cols): Real-Time Menu Stock & Specials Toggles */}
                    <section className="lg:col-span-5 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                                <UtensilsCrossed className="w-4 h-4 text-amber-600" />
                                Menu Stock & Specials
                            </h2>
                            <span className="text-xs font-medium text-neutral-400">
                                Instant toggles
                            </span>
                        </div>

                        {menuItems.length === 0 ? (
                            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-8 text-center text-xs text-neutral-500">
                                No menu items found in database.
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm divide-y divide-neutral-100 max-h-[760px] overflow-y-auto">
                                {menuItems.map((item) => {
                                    const isUpdating = updatingMenuId === item.id;

                                    return (
                                        <div key={item.id} className="p-4 sm:p-5 space-y-3">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        <h3 className="text-xs sm:text-sm font-bold text-neutral-900">
                                                            {item.name}
                                                        </h3>
                                                        {item.isSpecial && (
                                                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 text-[10px] font-bold">
                                                                <Sparkles className="w-2.5 h-2.5" /> Special
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-[11px] text-neutral-500 mt-0.5">
                                                        {item.category?.name || 'Menu Item'} •{' '}
                                                        <strong className="text-neutral-800">{item.price} BDT</strong>
                                                    </p>
                                                </div>

                                                <span
                                                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase shrink-0 ${item.isAvailable
                                                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                                                        : 'bg-red-50 text-red-600 border border-red-200/60'
                                                        }`}
                                                >
                                                    {item.isAvailable ? 'In Stock' : 'Sold Out'}
                                                </span>
                                            </div>

                                            {/* Interactive Toggle Controls */}
                                            <div className="flex items-center justify-between pt-2 border-t border-neutral-100 text-xs">
                                                {/* In Stock Toggle */}
                                                <button
                                                    type="button"
                                                    disabled={isUpdating}
                                                    onClick={() => handleToggleAvailability(item)}
                                                    className="flex items-center gap-2 text-neutral-700 font-medium cursor-pointer disabled:opacity-60"
                                                >
                                                    <span
                                                        className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${item.isAvailable ? 'bg-emerald-500' : 'bg-neutral-300'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform ${item.isAvailable ? 'translate-x-4' : 'translate-x-0'
                                                                }`}
                                                        />
                                                    </span>
                                                    <span>Available</span>
                                                </button>

                                                {/* Chef Special Toggle */}
                                                <button
                                                    type="button"
                                                    disabled={isUpdating}
                                                    onClick={() => handleToggleSpecial(item)}
                                                    className="flex items-center gap-2 text-neutral-700 font-medium cursor-pointer disabled:opacity-60"
                                                >
                                                    <span
                                                        className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${item.isSpecial ? 'bg-amber-500' : 'bg-neutral-300'
                                                            }`}
                                                    >
                                                        <span
                                                            className={`bg-white w-4 h-4 rounded-full shadow-xs transform transition-transform ${item.isSpecial ? 'translate-x-4' : 'translate-x-0'
                                                                }`}
                                                        />
                                                    </span>
                                                    <span>Chef Special</span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </section>

                </div>
            </div>
        </main>
    );
};