'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    ShoppingBag,
    Clock,
    CheckCircle2,
    XCircle,
    Bike,
    ChefHat,
    MapPin,
    Phone,
    Receipt,
    UtensilsCrossed,
    ArrowRight,
    RotateCcw,
    FileText,
} from 'lucide-react';
import { IOrder } from '../../_actions/orderAction';
// Adjust import path if needed

interface OrdersListProps {
    initialOrders: IOrder[];
}

const FILTER_TABS = [
    { key: 'ALL', label: 'All Orders' },
    { key: 'ACTIVE', label: 'Active' },
    { key: 'DELIVERED', label: 'Delivered' },
    { key: 'CANCELLED', label: 'Cancelled' },
] as const;

export const OrdersList = ({ initialOrders }: OrdersListProps) => {
    const [activeTab, setActiveTab] = useState<'ALL' | 'ACTIVE' | 'DELIVERED' | 'CANCELLED'>('ALL');

    const filteredOrders = initialOrders.filter((order) => {
        if (activeTab === 'ALL') return true;
        if (activeTab === 'ACTIVE') {
            return ['PENDING', 'PREPARING', 'OUT_FOR_DELIVERY'].includes(order.status);
        }
        return order.status === activeTab;
    });

    const formatDateTime = (isoString: string) => {
        try {
            return new Intl.DateTimeFormat('en-BD', {
                month: 'short',
                day: '2-digit',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            }).format(new Date(isoString));
        } catch {
            return isoString;
        }
    };

    const getStatusBadge = (status: IOrder['status']) => {
        switch (status) {
            case 'PENDING':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase">
                        <Clock className="w-3.5 h-3.5" /> Pending Confirmation
                    </span>
                );
            case 'PREPARING':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase">
                        <ChefHat className="w-3.5 h-3.5" /> Kitchen Preparing
                    </span>
                );
            case 'OUT_FOR_DELIVERY':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 text-xs font-bold uppercase">
                        <Bike className="w-3.5 h-3.5" /> Out For Delivery
                    </span>
                );
            case 'DELIVERED':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold uppercase">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
                    </span>
                );
            case 'CANCELLED':
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase">
                        <XCircle className="w-3.5 h-3.5" /> Cancelled
                    </span>
                );
        }
    };

    const getProgressStep = (status: IOrder['status']) => {
        switch (status) {
            case 'PENDING':
                return 1;
            case 'PREPARING':
                return 2;
            case 'OUT_FOR_DELIVERY':
                return 3;
            case 'DELIVERED':
                return 4;
            default:
                return 0;
        }
    };

    return (
        <main className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Top Header Banner */}
                <div className="bg-neutral-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-neutral-800 shadow-sm">
                    <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                <ShoppingBag className="w-3.5 h-3.5" /> Order History & Tracking
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                My Campus Orders
                            </h1>
                            <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-lg">
                                Track active DIU hall deliveries in real time, review itemized receipts, or reorder past favorites.
                            </p>
                        </div>

                        <Link
                            href="/menu"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all shrink-0"
                        >
                            <UtensilsCrossed className="w-4 h-4" />
                            <span>Order Again</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-2 flex items-center gap-1.5 overflow-x-auto">
                    {FILTER_TABS.map((tab) => {
                        const isSelected = activeTab === tab.key;
                        const count =
                            tab.key === 'ALL'
                                ? initialOrders.length
                                : tab.key === 'ACTIVE'
                                    ? initialOrders.filter((o) =>
                                        ['PENDING', 'PREPARING', 'OUT_FOR_DELIVERY'].includes(o.status)
                                    ).length
                                    : initialOrders.filter((o) => o.status === tab.key).length;

                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveTab(tab.key)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${isSelected
                                        ? 'bg-neutral-900 text-amber-400 shadow-2xs'
                                        : 'text-neutral-600 hover:bg-neutral-100'
                                    }`}
                            >
                                <span>{tab.label}</span>
                                <span
                                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${isSelected
                                            ? 'bg-amber-500/20 text-amber-300'
                                            : 'bg-neutral-200/70 text-neutral-600'
                                        }`}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Orders List */}
                {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-12 text-center space-y-4">
                        <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mx-auto">
                            <ShoppingBag className="w-7 h-7" />
                        </div>
                        <h2 className="text-lg font-extrabold text-neutral-900">
                            {initialOrders.length === 0 ? 'No orders placed yet' : 'No orders in this category'}
                        </h2>
                        <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                            {initialOrders.length === 0
                                ? 'Hungry on campus? Browse our menu and place your first DIU delivery order!'
                                : "You don't have any orders matching this status filter right now."}
                        </p>
                        <Link
                            href="/menu"
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-xl transition-all"
                        >
                            <span>Browse TR Cafe Menu</span>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-5">
                        {filteredOrders.map((order) => {
                            const isActive = ['PENDING', 'PREPARING', 'OUT_FOR_DELIVERY'].includes(order.status);
                            const currentStep = getProgressStep(order.status);
                            const shortOrderId = `#${order.id.slice(-8).toUpperCase()}`;

                            const itemsSubtotal = order.items.reduce(
                                (sum, item) => sum + (item.subtotal ?? item.unitPrice * item.quantity),
                                0
                            );
                            const deliveryFee = Math.max(0, order.totalAmount - itemsSubtotal);

                            const paymentProvider = order.payment?.provider || 'COD';
                            const paymentStatus = order.payment?.status || 'PENDING';

                            return (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-6 space-y-5"
                                >
                                    {/* Card Top Bar */}
                                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-100">
                                        <div>
                                            <div className="flex items-center gap-2.5">
                                                <span className="text-base font-extrabold text-neutral-900">
                                                    {shortOrderId}
                                                </span>
                                                <span className="text-xs text-neutral-400">
                                                    • {formatDateTime(order.createdAt)}
                                                </span>
                                            </div>
                                            <p className="text-xs text-neutral-500 flex items-center gap-1.5 mt-1">
                                                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                                <span>{order.deliveryAddress}</span>
                                            </p>
                                            {order.orderNotes && (
                                                <p className="text-[11px] text-neutral-400 flex items-center gap-1.5 mt-1">
                                                    <FileText className="w-3 h-3 text-neutral-400 shrink-0" />
                                                    <span>Note: &ldquo;{order.orderNotes}&rdquo;</span>
                                                </p>
                                            )}
                                        </div>

                                        {getStatusBadge(order.status)}
                                    </div>

                                    {/* Live 4-Step Progress Bar for Active Orders */}
                                    {isActive && (
                                        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-3">
                                            <div className="grid grid-cols-4 gap-2 text-center">
                                                {[
                                                    { step: 1, label: 'Pending' },
                                                    { step: 2, label: 'Preparing' },
                                                    { step: 3, label: 'On the Way' },
                                                    { step: 4, label: 'Delivered' },
                                                ].map((s) => {
                                                    const isDone = currentStep > s.step;
                                                    const isCurrent = currentStep === s.step;
                                                    return (
                                                        <div key={s.step} className="space-y-1.5">
                                                            <div
                                                                className={`h-2 rounded-full transition-all ${isDone
                                                                        ? 'bg-emerald-500'
                                                                        : isCurrent
                                                                            ? 'bg-amber-500'
                                                                            : 'bg-neutral-200'
                                                                    }`}
                                                            />
                                                            <p
                                                                className={`text-[11px] font-semibold ${isDone
                                                                        ? 'text-emerald-700'
                                                                        : isCurrent
                                                                            ? 'text-amber-600'
                                                                            : 'text-neutral-400'
                                                                    }`}
                                                            >
                                                                {s.label}
                                                            </p>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {order.rider?.name && (
                                                <div className="pt-2 border-t border-neutral-200/70 flex flex-wrap items-center justify-between gap-2 text-xs">
                                                    <span className="flex items-center gap-1.5 text-neutral-700">
                                                        <Bike className="w-4 h-4 text-amber-600" />
                                                        Assigned Rider:{' '}
                                                        <strong className="text-neutral-900">{order.rider.name}</strong>
                                                    </span>
                                                    {order.rider.phone && (
                                                        <a
                                                            href={`tel:${order.rider.phone}`}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-neutral-200 hover:border-amber-400 text-neutral-800 hover:text-amber-600 font-semibold transition-colors"
                                                        >
                                                            <Phone className="w-3 h-3 text-amber-600" />
                                                            <span>Call {order.rider.phone}</span>
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Order Items & Receipt Summary */}
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                        <div className="md:col-span-7 space-y-2">
                                            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                                                Order Items
                                            </p>
                                            <ul className="space-y-2 text-xs">
                                                {order.items.map((item) => (
                                                    <li
                                                        key={item.id}
                                                        className="flex items-center justify-between gap-3 text-neutral-700"
                                                    >
                                                        <div className="flex items-center gap-2.5">
                                                            {item.menuItem?.imageUrl ? (
                                                                <img
                                                                    src={item.menuItem.imageUrl}
                                                                    alt={item.menuItem.name}
                                                                    className="h-9 w-9 rounded-lg object-cover border border-neutral-200/70 shrink-0"
                                                                />
                                                            ) : (
                                                                <div className="h-9 w-9 rounded-lg bg-neutral-100 flex items-center justify-center shrink-0">
                                                                    <UtensilsCrossed className="w-4 h-4 text-amber-500/60" />
                                                                </div>
                                                            )}
                                                            <div>
                                                                <p className="font-semibold text-neutral-900">
                                                                    {item.quantity}x {item.menuItem?.name || 'Menu Item'}
                                                                </p>
                                                                <p className="text-[11px] text-neutral-400">
                                                                    {item.unitPrice} BDT each
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <span className="font-bold text-neutral-900 shrink-0">
                                                            {item.subtotal ?? item.unitPrice * item.quantity} BDT
                                                        </span>
                                                    </li>
                                                ))}

                                                <li className="flex items-center justify-between text-neutral-500 pt-2 border-t border-dashed border-neutral-200">
                                                    <span>Campus Delivery Fee ({order.deliveryZone.replaceAll('_', ' ')})</span>
                                                    <span className="font-semibold text-amber-600">+{deliveryFee} BDT</span>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Payment & Actions Box */}
                                        <div className="md:col-span-5 p-4 rounded-xl bg-neutral-50 border border-neutral-100 flex flex-col justify-between gap-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-[11px] text-neutral-400">Total Amount</p>
                                                    <p className="text-lg font-extrabold text-neutral-900">
                                                        {order.totalAmount}{' '}
                                                        <span className="text-xs font-semibold text-neutral-500">BDT</span>
                                                    </p>
                                                </div>

                                                <div className="text-right">
                                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-600">
                                                        <Receipt className="w-3 h-3 text-amber-600" /> {paymentProvider}
                                                    </span>
                                                    <p
                                                        className={`text-[11px] font-bold uppercase mt-0.5 ${paymentStatus === 'PAID'
                                                                ? 'text-emerald-600'
                                                                : paymentStatus === 'FAILED'
                                                                    ? 'text-red-600'
                                                                    : paymentStatus === 'REFUNDED'
                                                                        ? 'text-neutral-500'
                                                                        : 'text-amber-600'
                                                            }`}
                                                    >
                                                        {paymentStatus}
                                                    </p>
                                                </div>
                                            </div>

                                            <Link
                                                href="/menu"
                                                className="w-full py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                                            >
                                                <RotateCcw className="w-3.5 h-3.5" />
                                                <span>Reorder Meal</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </main>
    );
};