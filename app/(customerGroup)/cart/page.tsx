'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    ShoppingBag,
    Trash2,
    Plus,
    Minus,
    Bike,
    MapPin,
    CreditCard,
    Banknote,
    ArrowRight,
    UtensilsCrossed,
    ShieldCheck,
    ArrowLeft,
} from 'lucide-react';

const INITIAL_CART_ITEMS = [
    {
        id: '1',
        name: 'TR Monster Beef Burger',
        category: 'Burgers',
        price: 260,
        quantity: 2,
        tag: 'Best Seller',
    },
    {
        id: '2',
        name: 'Loaded Cheesy Fries',
        category: 'Sides',
        price: 140,
        quantity: 1,
        tag: 'Popular',
    },
    {
        id: '3',
        name: 'TR Iced Choco Frappe',
        category: 'Beverages',
        price: 120,
        quantity: 2,
        tag: 'Cool Down',
    },
];

const CAMPUS_DROP_POINTS = [
    'YKSG-2 Hall Gate, DIU Campus',
    'YKSG-1 Hall Gate, DIU Campus',
    'Rowshan Ara Hall Gate, DIU Campus',
    'AB-4 Academic Building Front',
    'Knowledge Tower / Central Field',
];

const CartPage = () => {
    const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
    const [deliveryLocation, setDeliveryLocation] = useState(CAMPUS_DROP_POINTS[0]);
    const [paymentMethod, setPaymentMethod] = useState<'COD' | 'SSLCOMMERZ' | 'STRIPE'>('COD');

    const DELIVERY_FEE = cartItems.length > 0 ? 20 : 0;

    const updateQuantity = (id: string, delta: number) => {
        setCartItems((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id: string) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    const total = subtotal + DELIVERY_FEE;

    return (
        <main className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Top Header Banner */}
                <div className="bg-neutral-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-neutral-800 shadow-sm">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                <ShoppingBag className="w-3.5 h-3.5" /> Your Order Bag
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                Review Cart & Campus Delivery
                            </h1>
                            <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-lg">
                                Confirm your items, choose your DIU hall drop-off gate, and select Cash on Delivery or online payment.
                            </p>
                        </div>

                        <Link
                            href="/menu"
                            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 font-semibold text-xs rounded-xl transition-all shrink-0"
                        >
                            <ArrowLeft className="w-4 h-4 text-amber-400" />
                            <span>Add More Items</span>
                        </Link>
                    </div>
                </div>

                {cartItems.length === 0 ? (
                    /* Empty Cart State */
                    <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-12 text-center max-w-lg mx-auto space-y-4">
                        <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mx-auto">
                            <UtensilsCrossed className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-extrabold text-neutral-900">Your cart is empty</h2>
                        <p className="text-xs text-neutral-500 leading-relaxed">
                            Looks like you haven&apos;t added any burgers, wings, or chillers yet. Explore our kitchen specials and get hot food delivered across DIU campus!
                        </p>
                        <Link
                            href="/menu"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
                        >
                            <span>Browse Full Menu</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                ) : (
                    /* Main Cart Grid */
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                        {/* Left Column (7 cols): Cart Items List & Delivery Location */}
                        <div className="lg:col-span-7 space-y-6">

                            {/* Cart Items Card */}
                            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden">
                                <div className="p-5 sm:p-6 border-b border-neutral-100 flex items-center justify-between">
                                    <h2 className="text-base font-bold text-neutral-900">
                                        Selected Items ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
                                    </h2>
                                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600">
                                        <Bike className="w-3.5 h-3.5" /> Flat 20 BDT DIU Delivery
                                    </span>
                                </div>

                                <div className="divide-y divide-neutral-100">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50/50 transition-colors"
                                        >
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                                                        {item.category}
                                                    </span>
                                                    <span className="px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-700 text-[10px] font-semibold">
                                                        {item.tag}
                                                    </span>
                                                </div>
                                                <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                                                    {item.name}
                                                </h3>
                                                <p className="text-xs font-semibold text-neutral-500">
                                                    {item.price} BDT each
                                                </p>
                                            </div>

                                            {/* Quantity Stepper & Subtotal */}
                                            <div className="flex items-center justify-between sm:justify-end gap-4">
                                                <div className="flex items-center bg-neutral-100 rounded-xl p-1 border border-neutral-200/70">
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="h-7 w-7 rounded-lg bg-white hover:bg-neutral-50 text-neutral-700 flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
                                                        aria-label="Decrease quantity"
                                                    >
                                                        <Minus className="w-3.5 h-3.5" />
                                                    </button>
                                                    <span className="w-8 text-center text-xs font-extrabold text-neutral-900">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="h-7 w-7 rounded-lg bg-white hover:bg-neutral-50 text-neutral-700 flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
                                                        aria-label="Increase quantity"
                                                    >
                                                        <Plus className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>

                                                <div className="text-right min-w-[76px]">
                                                    <p className="text-sm font-extrabold text-neutral-900">
                                                        {item.price * item.quantity} <span className="text-[11px] font-semibold text-neutral-500">BDT</span>
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => removeItem(item.id)}
                                                    className="p-2 rounded-xl text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                                    title="Remove item"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* DIU Drop-off Point Selector */}
                            <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5 sm:p-6 space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className="h-8 w-8 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center">
                                        <MapPin className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-bold text-neutral-900">
                                            DIU Campus Drop-off Location
                                        </h2>
                                        <p className="text-[11px] text-neutral-500">
                                            Select your residence hall gate or academic building
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                                            Campus Point
                                        </label>
                                        <select
                                            value={deliveryLocation}
                                            onChange={(e) => setDeliveryLocation(e.target.value)}
                                            className="w-full px-3.5 py-2.5 text-xs font-semibold bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                                        >
                                            {CAMPUS_DROP_POINTS.map((point) => (
                                                <option key={point} value={point}>
                                                    {point}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-neutral-500 mb-1.5">
                                            Delivery Note (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Call me when reaching main gate"
                                            className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column (5 cols): Payment Method & Order Summary */}
                        <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-6 space-y-6 sticky top-24">
                            <div>
                                <h2 className="text-base font-bold text-neutral-900">
                                    Order Summary & Payment
                                </h2>
                                <p className="text-xs text-neutral-500 mt-0.5">
                                    Choose how you want to pay for your order
                                </p>
                            </div>

                            {/* Payment Method Options */}
                            <div className="space-y-2.5">
                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('COD')}
                                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${paymentMethod === 'COD'
                                            ? 'bg-amber-50/70 border-amber-500 ring-2 ring-amber-500/15'
                                            : 'bg-neutral-50/50 border-neutral-200 hover:bg-neutral-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-lg bg-amber-500/15 text-amber-600 flex items-center justify-center">
                                            <Banknote className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-neutral-900">
                                                Cash on Delivery (COD)
                                            </p>
                                            <p className="text-[11px] text-neutral-500">
                                                Pay cash directly to your campus rider
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`h-4 w-4 rounded-full border flex items-center justify-center ${paymentMethod === 'COD'
                                                ? 'border-amber-600 bg-amber-500'
                                                : 'border-neutral-300'
                                            }`}
                                    >
                                        {paymentMethod === 'COD' && (
                                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                        )}
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('SSLCOMMERZ')}
                                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${paymentMethod === 'SSLCOMMERZ'
                                            ? 'bg-amber-50/70 border-amber-500 ring-2 ring-amber-500/15'
                                            : 'bg-neutral-50/50 border-neutral-200 hover:bg-neutral-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-lg bg-emerald-500/15 text-emerald-600 flex items-center justify-center">
                                            <ShieldCheck className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-neutral-900">
                                                SSLCommerz (bKash / Nagad / BD Cards)
                                            </p>
                                            <p className="text-[11px] text-neutral-500">
                                                Instant mobile banking or local card checkout
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`h-4 w-4 rounded-full border flex items-center justify-center ${paymentMethod === 'SSLCOMMERZ'
                                                ? 'border-amber-600 bg-amber-500'
                                                : 'border-neutral-300'
                                            }`}
                                    >
                                        {paymentMethod === 'SSLCOMMERZ' && (
                                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                        )}
                                    </span>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setPaymentMethod('STRIPE')}
                                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${paymentMethod === 'STRIPE'
                                            ? 'bg-amber-50/70 border-amber-500 ring-2 ring-amber-500/15'
                                            : 'bg-neutral-50/50 border-neutral-200 hover:bg-neutral-50'
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-9 w-9 rounded-lg bg-blue-500/15 text-blue-600 flex items-center justify-center">
                                            <CreditCard className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-neutral-900">
                                                Stripe Checkout
                                            </p>
                                            <p className="text-[11px] text-neutral-500">
                                                Pay securely with international credit/debit cards
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`h-4 w-4 rounded-full border flex items-center justify-center ${paymentMethod === 'STRIPE'
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

                            {/* Price Breakdown */}
                            <div className="pt-4 border-t border-neutral-100 space-y-2.5 text-xs">
                                <div className="flex items-center justify-between text-neutral-500">
                                    <span>Items Subtotal</span>
                                    <span className="font-semibold text-neutral-900">{subtotal} BDT</span>
                                </div>
                                <div className="flex items-center justify-between text-neutral-500">
                                    <span className="flex items-center gap-1">
                                        DIU Campus Delivery Fee
                                    </span>
                                    <span className="font-semibold text-amber-600">+{DELIVERY_FEE} BDT</span>
                                </div>
                                <div className="flex items-center justify-between text-neutral-500">
                                    <span>Drop-off Point</span>
                                    <span className="font-semibold text-neutral-800 truncate max-w-[180px]">
                                        {deliveryLocation}
                                    </span>
                                </div>

                                <div className="pt-3 border-t border-neutral-200/80 flex items-center justify-between">
                                    <span className="text-sm font-bold text-neutral-900">Total Payable</span>
                                    <span className="text-xl font-extrabold text-neutral-900">
                                        {total} <span className="text-xs font-semibold text-neutral-500">BDT</span>
                                    </span>
                                </div>
                            </div>

                            {/* Place Order Button */}
                            <button
                                type="button"
                                className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                            >
                                <span>
                                    {paymentMethod === 'COD'
                                        ? 'Place Cash on Delivery Order'
                                        : `Proceed to ${paymentMethod === 'SSLCOMMERZ' ? 'SSLCommerz' : 'Stripe'}`}
                                </span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </main>
    );
};

export default CartPage;