import React from 'react';
import Link from 'next/link';
import {
    ShoppingBag,
    Clock,
    CheckCircle2,
    MapPin,
    Bike,
    UtensilsCrossed,
    ArrowRight,
    Receipt,
    Flame,
    CreditCard,
} from 'lucide-react';

const ACTIVE_ORDER = {
    id: 'ORD-8492',
    status: 'OUT_FOR_DELIVERY',
    items: ['2x TR Monster Beef Burger', '1x Loaded Cheesy Fries', '2x TR Iced Choco Frappe'],
    subtotal: 900,
    deliveryFee: 20,
    total: 920,
    paymentMethod: 'Cash on Delivery (COD)',
    paymentStatus: 'PENDING',
    deliveryLocation: 'YKSG-2 Hall Gate, DIU Campus',
    riderName: 'Shakil Ahmed',
    riderPhone: '017XXXXXXXX',
    estimatedTime: '12 mins',
};

const RECENT_ORDERS = [
    {
        id: 'ORD-8451',
        date: 'Nov 15, 2026 • 8:15 PM',
        items: '1x Crispy Peri-Peri Wings (6 Pcs), 1x Loaded Cheesy Fries',
        total: 340,
        status: 'DELIVERED',
        paymentStatus: 'PAID',
    },
    {
        id: 'ORD-8390',
        date: 'Nov 12, 2026 • 1:40 PM',
        items: '1x Smokey BBQ Beef Burger Combo',
        total: 260,
        status: 'DELIVERED',
        paymentStatus: 'PAID',
    },
    {
        id: 'ORD-8312',
        date: 'Nov 09, 2026 • 9:05 PM',
        items: '2x TR Monster Beef Burger',
        total: 540,
        status: 'CANCELLED',
        paymentStatus: 'REFUNDED',
    },
];

const CustomerDashboardPage = () => {
    return (
        <main className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Top Welcome Banner */}
                <div className="bg-neutral-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-neutral-800 shadow-sm">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                <Flame className="w-3.5 h-3.5" /> Student Portal
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                Welcome back to TR Cafe!
                            </h1>
                            <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-lg">
                                Track your live DIU campus deliveries, view past order receipts, or reorder your favorite meals in one click.
                            </p>
                        </div>

                        <Link
                            href="/menu"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/20 transition-all shrink-0"
                        >
                            <UtensilsCrossed className="w-4 h-4" />
                            <span>Order Food Now</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>

                {/* Summary Metrics Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                            <ShoppingBag className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-neutral-500">Total Orders</p>
                            <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">14</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center shrink-0">
                            <Bike className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-neutral-500">Active Delivery</p>
                            <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">1</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-neutral-500">Completed</p>
                            <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">12</p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-neutral-900 text-amber-400 flex items-center justify-center shrink-0">
                            <CreditCard className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-neutral-500">Total Spent</p>
                            <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">
                                4,280 <span className="text-xs font-semibold text-neutral-500">BDT</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid: Active Delivery Tracker + Recent Orders */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column (2/3): Live Order Tracking Card */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-6">
                            <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-neutral-100">
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
                                        <h2 className="text-base font-bold text-neutral-900">
                                            Live Order Tracking
                                        </h2>
                                    </div>
                                    <p className="text-xs text-neutral-500 mt-0.5">
                                        Order ID: <span className="font-semibold text-neutral-800">{ACTIVE_ORDER.id}</span>
                                    </p>
                                </div>

                                <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold uppercase tracking-wide">
                                    Out For Delivery • ETA {ACTIVE_ORDER.estimatedTime}
                                </span>
                            </div>

                            {/* 4-Step Delivery Progress Bar */}
                            <div className="my-6">
                                <div className="grid grid-cols-4 gap-2 text-center">
                                    {[
                                        { label: 'Pending', done: true },
                                        { label: 'Preparing', done: true },
                                        { label: 'On the Way', active: true },
                                        { label: 'Delivered', done: false },
                                    ].map((step, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <div
                                                className={`h-2 rounded-full transition-all ${step.done
                                                    ? 'bg-emerald-500'
                                                    : step.active
                                                        ? 'bg-amber-500'
                                                        : 'bg-neutral-200'
                                                    }`}
                                            />
                                            <p
                                                className={`text-[11px] font-semibold ${step.done
                                                    ? 'text-emerald-700'
                                                    : step.active
                                                        ? 'text-amber-600'
                                                        : 'text-neutral-400'
                                                    }`}
                                            >
                                                {step.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Order Items & Delivery Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 space-y-2">
                                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                        Order Items
                                    </p>
                                    <ul className="space-y-1 text-xs font-medium text-neutral-800">
                                        {ACTIVE_ORDER.items.map((item, i) => (
                                            <li key={i}>• {item}</li>
                                        ))}
                                    </ul>
                                    <div className="pt-2 border-t border-neutral-200/70 flex items-center justify-between text-xs">
                                        <span className="text-neutral-500">Total (incl. 20 BDT fee)</span>
                                        <span className="font-extrabold text-neutral-900">{ACTIVE_ORDER.total} BDT</span>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 space-y-2.5">
                                    <p className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                                        Campus Delivery Details
                                    </p>
                                    <div className="flex items-start gap-2 text-xs text-neutral-700">
                                        <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                        <span className="font-medium">{ACTIVE_ORDER.deliveryLocation}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-neutral-700">
                                        <Bike className="w-4 h-4 text-amber-600 shrink-0" />
                                        <span>
                                            Rider: <strong className="text-neutral-900">{ACTIVE_ORDER.riderName}</strong> ({ACTIVE_ORDER.riderPhone})
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-neutral-700">
                                        <Receipt className="w-4 h-4 text-amber-600 shrink-0" />
                                        <span>
                                            {ACTIVE_ORDER.paymentMethod} •{' '}
                                            <span className="font-semibold text-amber-600">{ACTIVE_ORDER.paymentStatus}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column (1/3): Recent Order History */}
                    <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                                <h2 className="text-base font-bold text-neutral-900">Recent Orders</h2>
                                <Link
                                    href="/orders"
                                    className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                                >
                                    View All &rarr;
                                </Link>
                            </div>

                            <div className="divide-y divide-neutral-100 mt-2">
                                {RECENT_ORDERS.map((order) => (
                                    <div key={order.id} className="py-3.5 space-y-1.5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-neutral-900">{order.id}</span>
                                            <span
                                                className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${order.status === 'DELIVERED'
                                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                                                    : 'bg-red-50 text-red-600 border border-red-200/60'
                                                    }`}
                                            >
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-xs text-neutral-600 line-clamp-1">{order.items}</p>
                                        <div className="flex items-center justify-between text-[11px] text-neutral-400 pt-0.5">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3 h-3" /> {order.date}
                                            </span>
                                            <span className="font-bold text-neutral-800">{order.total} BDT</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <Link
                            href="/menu"
                            className="mt-4 w-full py-2.5 text-center rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-800 font-semibold text-xs transition-colors"
                        >
                            Browse Menu Again
                        </Link>
                    </div>

                </div>
            </div>
        </main>
    );
};

export default CustomerDashboardPage;