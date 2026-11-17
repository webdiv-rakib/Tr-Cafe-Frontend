'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    ShieldCheck,
    MapPin,
    Phone,
    User,
    Bike,
    Banknote,
    CreditCard,
    ArrowLeft,
    ArrowRight,
    Clock,
    Lock,
    UtensilsCrossed,
} from 'lucide-react';

const ORDER_ITEMS = [
    { id: '1', name: 'TR Monster Beef Burger', qty: 2, price: 260 },
    { id: '2', name: 'Loaded Cheesy Fries', qty: 1, price: 140 },
    { id: '3', name: 'TR Iced Choco Frappe', qty: 2, price: 120 },
];

const CAMPUS_DROP_POINTS = [
    'YKSG-2 Hall Gate, DIU Campus',
    'YKSG-1 Hall Gate, DIU Campus',
    'Rowshan Ara Hall Gate, DIU Campus',
    'AB-4 Academic Building Front',
    'Knowledge Tower / Central Field',
];

const CheckoutPage = () => {
    const [name, setName] = useState('Toymur');
    const [phone, setPhone] = useState('01889966347');
    const [dropPoint, setDropPoint] = useState(CAMPUS_DROP_POINTS[0]);
    const [note, setNote] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'SSLCOMMERZ' | 'STRIPE'>('COD');

    const DELIVERY_FEE = 20;
    const subtotal = ORDER_ITEMS.reduce((sum, item) => sum + item.price * item.qty, 0);
    const total = subtotal + DELIVERY_FEE;

    return (
        <main className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Top Checkout Header Banner */}
                <div className="bg-neutral-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-neutral-800 shadow-sm">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                <Lock className="w-3.5 h-3.5" /> Secure Campus Checkout
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                Complete Your TR Cafe Order
                            </h1>
                            <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-lg">
                                Verify your DIU contact number, hall gate drop-off spot, and preferred payment gateway before confirming.
                            </p>
                        </div>

                        <Link
                            href="/cart"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 font-semibold text-xs rounded-xl transition-all shrink-0"
                        >
                            <ArrowLeft className="w-4 h-4 text-amber-400" />
                            <span>Back to Cart</span>
                        </Link>
                    </div>
                </div>

                {/* Main 2-Column Checkout Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* Left Column (7 cols): Delivery Info + Payment Gateway Selection */}
                    <div className="lg:col-span-7 space-y-6">

                        {/* Step 1: Student & Campus Delivery Details */}
                        <section className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-6 space-y-5">
                            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                                <div className="flex items-center gap-2.5">
                                    <span className="h-7 w-7 rounded-lg bg-amber-500 text-white text-xs font-extrabold flex items-center justify-center">
                                        1
                                    </span>
                                    <div>
                                        <h2 className="text-sm sm:text-base font-bold text-neutral-900">
                                            DIU Delivery & Contact Details
                                        </h2>
                                        <p className="text-[11px] text-neutral-500">
                                            Our campus rider will call this number upon reaching your gate
                                        </p>
                                    </div>
                                </div>
                                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                                    <Clock className="w-3 h-3" /> 20–30 mins ETA
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Receiver Name */}
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                                        Receiver Name
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                                            <User className="h-4 w-4" />
                                        </div>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your full name"
                                            className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-50/60 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-neutral-900"
                                        />
                                    </div>
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                                        Active Phone Number
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                                            <Phone className="h-4 w-4" />
                                        </div>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="01XXXXXXXXX"
                                            className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-50/60 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-neutral-900"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Campus Drop-off Point */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                                    DIU Drop-off Point
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-600">
                                        <MapPin className="h-4 w-4" />
                                    </div>
                                    <select
                                        value={dropPoint}
                                        onChange={(e) => setDropPoint(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 text-sm font-medium bg-neutral-50/60 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-neutral-900"
                                    >
                                        {CAMPUS_DROP_POINTS.map((point) => (
                                            <option key={point} value={point}>
                                                {point}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Delivery Note */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                                    Rider Instructions (Optional)
                                </label>
                                <textarea
                                    rows={2}
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="e.g. Waiting near the tea stall beside YKSG-2 main gate..."
                                    className="w-full px-4 py-2.5 text-sm bg-neutral-50/60 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-neutral-900 placeholder:text-neutral-400"
                                />
                            </div>
                        </section>

                        {/* Step 2: Payment Method Selection */}
                        <section className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-6 space-y-4">
                            <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
                                <span className="h-7 w-7 rounded-lg bg-amber-500 text-white text-xs font-extrabold flex items-center justify-center">
                                    2
                                </span>
                                <div>
                                    <h2 className="text-sm sm:text-base font-bold text-neutral-900">
                                        Select Payment Method
                                    </h2>
                                    <p className="text-[11px] text-neutral-500">
                                        Pay in cash at your hall gate or complete instant online payment
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {/* Cash on Delivery */}
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('COD')}
                                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${paymentMethod === 'COD'
                                            ? 'bg-amber-50/70 border-amber-500 ring-2 ring-amber-500/15'
                                            : 'bg-neutral-50/50 border-neutral-200 hover:bg-neutral-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className="h-10 w-10 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center shrink-0">
                                            <Banknote className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-xs sm:text-sm font-bold text-neutral-900">
                                                    Cash on Delivery (COD)
                                                </p>
                                                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 text-[10px] font-bold uppercase">
                                                    Most Popular
                                                </span>
                                            </div>
                                            <p className="text-xs text-neutral-500 mt-0.5">
                                                Pay {total} BDT in cash directly to the TR Cafe rider upon delivery
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${paymentMethod === 'COD'
                                                ? 'border-amber-600 bg-amber-500'
                                                : 'border-neutral-300'
                                            }`}
                                    >
                                        {paymentMethod === 'COD' && (
                                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                        )}
                                    </span>
                                </button>

                                {/* SSLCommerz */}
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('SSLCOMMERZ')}
                                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${paymentMethod === 'SSLCOMMERZ'
                                            ? 'bg-amber-50/70 border-amber-500 ring-2 ring-amber-500/15'
                                            : 'bg-neutral-50/50 border-neutral-200 hover:bg-neutral-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className="h-10 w-10 rounded-xl bg-emerald-500/15 text-emerald-600 flex items-center justify-center shrink-0">
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs sm:text-sm font-bold text-neutral-900">
                                                SSLCommerz (bKash, Nagad, Rocket & BD Cards)
                                            </p>
                                            <p className="text-xs text-neutral-500 mt-0.5">
                                                Redirect to SSLCommerz gateway for instant BDT payment
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${paymentMethod === 'SSLCOMMERZ'
                                                ? 'border-amber-600 bg-amber-500'
                                                : 'border-neutral-300'
                                            }`}
                                    >
                                        {paymentMethod === 'SSLCOMMERZ' && (
                                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                        )}
                                    </span>
                                </button>

                                {/* Stripe */}
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('STRIPE')}
                                    className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${paymentMethod === 'STRIPE'
                                            ? 'bg-amber-50/70 border-amber-500 ring-2 ring-amber-500/15'
                                            : 'bg-neutral-50/50 border-neutral-200 hover:bg-neutral-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3.5">
                                        <div className="h-10 w-10 rounded-xl bg-blue-500/15 text-blue-600 flex items-center justify-center shrink-0">
                                            <CreditCard className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-xs sm:text-sm font-bold text-neutral-900">
                                                Stripe Card Checkout
                                            </p>
                                            <p className="text-xs text-neutral-500 mt-0.5">
                                                Pay securely using Visa, Mastercard, or international cards
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`h-4 w-4 rounded-full border flex items-center justify-center shrink-0 ${paymentMethod === 'STRIPE'
                                                ? 'border-amber-600 bg-amber-500'
                                                : 'border-neutral-300'
                                            }`}
                                    >
                                        {paymentMethod === 'STRIPE' && (
                                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                        )}
                                    </span>
                                </button>
                            </div>
                        </section>
                    </div>

                    {/* Right Column (5 cols): Sticky Final Order Receipt */}
                    <aside className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-6 space-y-5 sticky top-24">
                        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                                <UtensilsCrossed className="w-4 h-4 text-amber-600" />
                                Order Receipt
                            </h2>
                            <span className="text-xs font-semibold text-neutral-400">
                                {ORDER_ITEMS.reduce((sum, i) => sum + i.qty, 0)} items
                            </span>
                        </div>

                        {/* Itemized List */}
                        <div className="divide-y divide-neutral-100">
                            {ORDER_ITEMS.map((item) => (
                                <div key={item.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                                    <div>
                                        <p className="font-bold text-neutral-900">
                                            {item.qty}x {item.name}
                                        </p>
                                        <p className="text-[11px] text-neutral-400 mt-0.5">
                                            {item.price} BDT each
                                        </p>
                                    </div>
                                    <p className="font-extrabold text-neutral-900 shrink-0">
                                        {item.price * item.qty} BDT
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Delivery Destination Pill */}
                        <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-100 space-y-1.5 text-xs">
                            <div className="flex items-center gap-1.5 text-amber-700 font-bold">
                                <Bike className="w-3.5 h-3.5" />
                                <span>Campus Drop-off Summary</span>
                            </div>
                            <p className="text-neutral-700 font-medium">{dropPoint}</p>
                            <p className="text-[11px] text-neutral-500">
                                Contact: {name || 'Receiver'} ({phone || 'No phone'})
                            </p>
                        </div>

                        {/* Totals Breakdown */}
                        <div className="pt-3 border-t border-neutral-100 space-y-2 text-xs">
                            <div className="flex items-center justify-between text-neutral-500">
                                <span>Subtotal</span>
                                <span className="font-semibold text-neutral-900">{subtotal} BDT</span>
                            </div>
                            <div className="flex items-center justify-between text-neutral-500">
                                <span>DIU Campus Delivery Fee</span>
                                <span className="font-semibold text-amber-600">+{DELIVERY_FEE} BDT</span>
                            </div>
                            <div className="pt-3 border-t border-neutral-200/80 flex items-center justify-between">
                                <span className="text-sm font-bold text-neutral-900">Grand Total</span>
                                <span className="text-2xl font-extrabold text-neutral-900">
                                    {total} <span className="text-xs font-semibold text-neutral-500">BDT</span>
                                </span>
                            </div>
                        </div>

                        {/* Confirm Order CTA */}
                        <button
                            type="button"
                            className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                        >
                            <span>
                                {paymentMethod === 'COD'
                                    ? `Confirm Order (${total} BDT COD)`
                                    : `Pay ${total} BDT via ${paymentMethod === 'SSLCOMMERZ' ? 'SSLCommerz' : 'Stripe'}`}
                            </span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                        </button>

                        <p className="text-[11px] text-center text-neutral-400">
                            By placing your order, you agree to be available at the selected DIU gate when the rider arrives.
                        </p>
                    </aside>

                </div>
            </div>
        </main>
    );
};

export default CheckoutPage;