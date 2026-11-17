'use client';

import React, { useState } from 'react';
import {
    ChefHat,
    Clock,
    Bike,
    Flame,
    CheckCircle2,
    MapPin,
    UtensilsCrossed,
    Sparkles,
    AlertCircle,
} from 'lucide-react';

const INITIAL_ORDERS = [
    {
        id: 'ORD-8498',
        customer: 'Toymur',
        location: 'YKSG-2 Hall Gate, DIU',
        items: ['2x TR Monster Beef Burger', '1x Loaded Cheesy Fries'],
        total: 680,
        payment: 'SSLCommerz (PAID)',
        status: 'PENDING',
        placedAt: '2 mins ago',
    },
    {
        id: 'ORD-8495',
        customer: 'Nusrat Jahan',
        location: 'Rowshan Ara Hall Gate, DIU',
        items: ['1x Crispy Peri-Peri Wings (6 Pcs)', '2x TR Iced Choco Frappe'],
        total: 440,
        payment: 'COD (PENDING)',
        status: 'PREPARING',
        placedAt: '9 mins ago',
    },
];

const AVAILABLE_RIDERS = [
    { id: 'RDR-01', name: 'Shakil Ahmed' },
    { id: 'RDR-02', name: 'Tanvir Hasan' },
    { id: 'RDR-03', name: 'Mehedi Hasan' },
];

const INITIAL_MENU_ITEMS = [
    {
        id: 'MNU-01',
        name: 'TR Monster Beef Burger',
        category: 'Burgers',
        price: 260,
        isAvailable: true,
        isSpecial: true,
    },
    {
        id: 'MNU-02',
        name: 'Crispy Peri-Peri Wings (6 Pcs)',
        category: 'Chicken',
        price: 180,
        isAvailable: true,
        isSpecial: true,
    },
    {
        id: 'MNU-03',
        name: 'Loaded Cheesy Fries',
        category: 'Sides',
        price: 140,
        isAvailable: true,
        isSpecial: false,
    },
    {
        id: 'MNU-04',
        name: 'TR Iced Choco Frappe',
        category: 'Beverages',
        price: 120,
        isAvailable: false,
        isSpecial: false,
    },
];

const StaffDashboard = () => {
    const [menuItems, setMenuItems] = useState(INITIAL_MENU_ITEMS);
    const [selectedRiders, setSelectedRiders] = useState<Record<string, string>>({});

    const toggleAvailability = (id: string) => {
        setMenuItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, isAvailable: !item.isAvailable } : item
            )
        );
    };

    const toggleSpecial = (id: string) => {
        setMenuItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, isSpecial: !item.isSpecial } : item
            )
        );
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
                    </div>
                </div>

                {/* Kitchen Summary Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-neutral-500">New Pending Orders</p>
                            <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">1</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center shrink-0">
                            <Flame className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-neutral-500">Currently Preparing</p>
                            <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">1</p>
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
                                Live Kitchen Order Queue
                            </h2>
                            <span className="text-xs font-medium text-neutral-400">
                                Real-time campus orders
                            </span>
                        </div>

                        <div className="space-y-4">
                            {INITIAL_ORDERS.map((order) => (
                                <div
                                    key={order.id}
                                    className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-6 space-y-4"
                                >
                                    {/* Order Top Row */}
                                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-neutral-100">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-extrabold text-neutral-900">
                                                    {order.id}
                                                </span>
                                                <span className="text-xs font-semibold text-neutral-600">
                                                    • {order.customer}
                                                </span>
                                            </div>
                                            <p className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                                                <Clock className="w-3 h-3" /> Ordered {order.placedAt} • {order.payment}
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
                                                {order.items.map((item, idx) => (
                                                    <li key={idx}>• {item}</li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100 flex flex-col justify-between">
                                            <div>
                                                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                                                    DIU Delivery Spot
                                                </p>
                                                <p className="text-xs font-bold text-neutral-900 flex items-start gap-1.5 mt-1">
                                                    <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                                    <span>{order.location}</span>
                                                </p>
                                            </div>
                                            <p className="text-xs font-extrabold text-neutral-900 pt-2 mt-2 border-t border-neutral-200/70">
                                                Total: {order.total} BDT
                                            </p>
                                        </div>
                                    </div>

                                    {/* Kitchen & Rider Dispatch Actions */}
                                    <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                                        {order.status === 'PENDING' ? (
                                            <button
                                                type="button"
                                                className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                                            >
                                                <Flame className="w-4 h-4" />
                                                <span>Accept & Start Preparing</span>
                                            </button>
                                        ) : (
                                            <>
                                                <select
                                                    value={selectedRiders[order.id] || ''}
                                                    onChange={(e) =>
                                                        setSelectedRiders((prev) => ({
                                                            ...prev,
                                                            [order.id]: e.target.value,
                                                        }))
                                                    }
                                                    className="flex-1 px-3.5 py-2.5 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-800 focus:outline-none focus:border-amber-500"
                                                >
                                                    <option value="" disabled>
                                                        Select Campus Rider...
                                                    </option>
                                                    {AVAILABLE_RIDERS.map((rider) => (
                                                        <option key={rider.id} value={rider.id}>
                                                            {rider.name}
                                                        </option>
                                                    ))}
                                                </select>

                                                <button
                                                    type="button"
                                                    className="py-2.5 px-5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shrink-0"
                                                >
                                                    <Bike className="w-4 h-4" />
                                                    <span>Dispatch Rider</span>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
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

                        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm divide-y divide-neutral-100">
                            {menuItems.map((item) => (
                                <div key={item.id} className="p-4 sm:p-5 space-y-3">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <div className="flex items-center gap-2">
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
                                                {item.category} • <strong className="text-neutral-800">{item.price} BDT</strong>
                                            </p>
                                        </div>

                                        <span
                                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${item.isAvailable
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
                                            onClick={() => toggleAvailability(item.id)}
                                            className="flex items-center gap-2 text-neutral-700 font-medium cursor-pointer"
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
                                            onClick={() => toggleSpecial(item.id)}
                                            className="flex items-center gap-2 text-neutral-700 font-medium cursor-pointer"
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
                            ))}
                        </div>
                    </section>

                </div>
            </div>
        </main>
    );
};

export default StaffDashboard;