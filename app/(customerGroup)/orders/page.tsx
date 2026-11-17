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
    AlertCircle,
} from 'lucide-react';

type OrderStatus = 'PENDING' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

interface OrderItem {
    name: string;
    qty: number;
    price: number;
}

interface Order {
    id: string;
    placedAt: string;
    status: OrderStatus;
    items: OrderItem[];
    deliveryFee: number;
    total: number;
    paymentMethod: 'COD' | 'SSLCOMMERZ' | 'STRIPE';
    paymentStatus: 'PENDING' | 'PAID' | 'REFUNDED';
    dropLocation: string;
    riderName?: string;
    riderPhone?: string;
}

const INITIAL_ORDERS: Order[] = [
    {
        id: 'ORD-8499',
        placedAt: 'Nov 17, 2026 • 6:18 PM',
        status: 'PENDING',
        items: [
            { name: 'DIU Student Feast Combo', qty: 1, price: 340 },
            { name: 'Mint Lemon Cooler', qty: 1, price: 80 },
        ],
        deliveryFee: 20,
        total: 440,
        paymentMethod: 'COD',
        paymentStatus: 'PENDING',
        dropLocation: 'AB-4 Academic Building Front, DIU',
    },
    {
        id: 'ORD-8492',
        placedAt: 'Nov 17, 2026 • 5:52 PM',
        status: 'OUT_FOR_DELIVERY',
        items: [
            { name: 'TR Monster Beef Burger', qty: 2, price: 260 },
            { name: 'Loaded Cheesy Fries', qty: 1, price: 140 },
            { name: 'TR Iced Choco Frappe', qty: 2, price: 120 },
        ],
        deliveryFee: 20,
        total: 920,
        paymentMethod: 'COD',
        paymentStatus: 'PENDING',
        dropLocation: 'YKSG-2 Hall Gate, DIU Campus',
        riderName: 'Shakil Ahmed',
        riderPhone: '017XXXXXXXX',
    },
    {
        id: 'ORD-8451',
        placedAt: 'Nov 15, 2026 • 8:15 PM',
        status: 'DELIVERED',
        items: [
            { name: 'Crispy Peri-Peri Wings (6 Pcs)', qty: 1, price: 180 },
            { name: 'Loaded Cheesy Fries', qty: 1, price: 140 },
        ],
        deliveryFee: 20,
        total: 340,
        paymentMethod: 'SSLCOMMERZ',
        paymentStatus: 'PAID',
        dropLocation: 'YKSG-2 Hall Gate, DIU Campus',
        riderName: 'Tanvir Hasan',
    },
    {
        id: 'ORD-8390',
        placedAt: 'Nov 12, 2026 • 1:40 PM',
        status: 'DELIVERED',
        items: [
            { name: 'Smokey BBQ Chicken Burger', qty: 1, price: 210 },
            { name: 'Garlic Butter Wedges', qty: 1, price: 110 },
        ],
        deliveryFee: 20,
        total: 340,
        paymentMethod: 'STRIPE',
        paymentStatus: 'PAID',
        dropLocation: 'Rowshan Ara Hall Gate, DIU Campus',
        riderName: 'Shakil Ahmed',
    },
    {
        id: 'ORD-8312',
        placedAt: 'Nov 09, 2026 • 9:05 PM',
        status: 'CANCELLED',
        items: [{ name: 'TR Monster Beef Burger', qty: 2, price: 260 }],
        deliveryFee: 20,
        total: 540,
        paymentMethod: 'COD',
        paymentStatus: 'REFUNDED',
        dropLocation: 'YKSG-1 Hall Gate, DIU Campus',
    },
];

const FILTER_TABS = [
    { key: 'ALL', label: 'All Orders' },
    { key: 'ACTIVE', label: 'Active' },
    { key: 'DELIVERED', label: 'Delivered' },
    { key: 'CANCELLED', label: 'Cancelled' },
] as const;

const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
    const [activeTab, setActiveTab] = useState<'ALL' | 'ACTIVE' | 'DELIVERED' | 'CANCELLED'>('ALL');

    const handleCancelOrder = (orderId: string) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === orderId && order.status === 'PENDING'
                    ? { ...order, status: 'CANCELLED' }
                    : order
            )
        );
    };

    const filteredOrders = orders.filter((order) => {
        if (activeTab === 'ALL') return true;
        if (activeTab === 'ACTIVE') {
            return ['PENDING', 'PREPARING', 'OUT_FOR_DELIVERY'].includes(order.status);
        }
        return order.status === activeTab;
    });

    const getStatusBadge = (status: OrderStatus) => {
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

    const getProgressStep = (status: OrderStatus) => {
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
                                Track active DIU hall deliveries in real time, cancel pending orders before preparation, or reorder past favorites.
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
                                ? orders.length
                                : tab.key === 'ACTIVE'
                                    ? orders.filter((o) =>
                                        ['PENDING', 'PREPARING', 'OUT_FOR_DELIVERY'].includes(o.status)
                                    ).length
                                    : orders.filter((o) => o.status === tab.key).length;

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
                        <h2 className="text-lg font-extrabold text-neutral-900">No orders in this category</h2>
                        <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                            You don&apos;t have any orders matching this status filter right now.
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

                            return (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-6 space-y-5"
                                >
                                    {/* Card Top Bar: ID, Date, Status */}
                                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-100">
                                        <div>
                                            <div className="flex items-center gap-2.5">
                                                <span className="text-base font-extrabold text-neutral-900">
                                                    {order.id}
                                                </span>
                                                <span className="text-xs text-neutral-400">• {order.placedAt}</span>
                                            </div>
                                            <p className="text-xs text-neutral-500 flex items-center gap-1.5 mt-1">
                                                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                                <span>{order.dropLocation}</span>
                                            </p>
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

                                            {order.riderName && (
                                                <div className="pt-2 border-t border-neutral-200/70 flex flex-wrap items-center justify-between gap-2 text-xs">
                                                    <span className="flex items-center gap-1.5 text-neutral-700">
                                                        <Bike className="w-4 h-4 text-amber-600" />
                                                        Assigned Rider: <strong className="text-neutral-900">{order.riderName}</strong>
                                                    </span>
                                                    {order.riderPhone && (
                                                        <a
                                                            href={`tel:${order.riderPhone}`}
                                                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-neutral-200 hover:border-amber-400 text-neutral-800 hover:text-amber-600 font-semibold transition-colors"
                                                        >
                                                            <Phone className="w-3 h-3 text-amber-600" />
                                                            <span>Call {order.riderPhone}</span>
                                                        </a>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Order Items & Receipt Summary */}
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                                        <div className="md:col-span-7 space-y-1.5">
                                            <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                                                Order Items
                                            </p>
                                            <ul className="space-y-1 text-xs">
                                                {order.items.map((item, idx) => (
                                                    <li key={idx} className="flex items-center justify-between text-neutral-700">
                                                        <span>
                                                            <strong className="text-neutral-900">{item.qty}x</strong> {item.name}
                                                        </span>
                                                        <span className="font-semibold text-neutral-800">
                                                            {item.qty * item.price} BDT
                                                        </span>
                                                    </li>
                                                ))}
                                                <li className="flex items-center justify-between text-neutral-500 pt-1 border-t border-dashed border-neutral-200">
                                                    <span>Campus Delivery Fee</span>
                                                    <span className="font-semibold text-amber-600">+{order.deliveryFee} BDT</span>
                                                </li>
                                            </ul>
                                        </div>

                                        {/* Payment & Actions Box */}
                                        <div className="md:col-span-5 p-4 rounded-xl bg-neutral-50 border border-neutral-100 flex flex-col justify-between gap-3">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-[11px] text-neutral-400">Total Amount</p>
                                                    <p className="text-lg font-extrabold text-neutral-900">
                                                        {order.total} <span className="text-xs font-semibold text-neutral-500">BDT</span>
                                                    </p>
                                                </div>

                                                <div className="text-right">
                                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-neutral-600">
                                                        <Receipt className="w-3 h-3 text-amber-600" /> {order.paymentMethod}
                                                    </span>
                                                    <p
                                                        className={`text-[11px] font-bold uppercase mt-0.5 ${order.paymentStatus === 'PAID'
                                                                ? 'text-emerald-600'
                                                                : order.paymentStatus === 'REFUNDED'
                                                                    ? 'text-neutral-500'
                                                                    : 'text-amber-600'
                                                            }`}
                                                    >
                                                        {order.paymentStatus}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Contextual Action Button */}
                                            {order.status === 'PENDING' ? (
                                                <button
                                                    type="button"
                                                    onClick={() => handleCancelOrder(order.id)}
                                                    className="w-full py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200/80 text-red-600 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                                                >
                                                    <AlertCircle className="w-3.5 h-3.5" />
                                                    <span>Cancel Pending Order</span>
                                                </button>
                                            ) : (
                                                <Link
                                                    href="/menu"
                                                    className="w-full py-2 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                                                >
                                                    <RotateCcw className="w-3.5 h-3.5" />
                                                    <span>Reorder Meal</span>
                                                </Link>
                                            )}
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

export default OrdersPage;