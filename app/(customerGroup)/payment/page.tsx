'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Receipt,
    ArrowRight,
    RotateCcw,
    Home,
    ShoppingBag,
    ShieldCheck,
    Bike,
} from 'lucide-react';

type PaymentStatus = 'success' | 'failed' | 'cancelled';

const PaymentResultContent = () => {
    const searchParams = useSearchParams();

    const urlStatus = searchParams.get('status')?.toLowerCase() as PaymentStatus | undefined;
    const orderId = searchParams.get('orderId') || 'ORD-8499';
    const tranId = searchParams.get('tranId') || 'TR-SSL-90481275';
    const amount = searchParams.get('amount') || '920';
    const method = searchParams.get('method') || 'SSLCommerz';

    // Local state defaults to URL param, with a preview switcher so you can inspect all 3 states easily
    const [previewStatus, setPreviewStatus] = useState<PaymentStatus>(
        urlStatus && ['success', 'failed', 'cancelled'].includes(urlStatus)
            ? urlStatus
            : 'success'
    );

    return (
        <main className="min-h-screen bg-neutral-50 py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-xl space-y-6">

                {/* Quick Preview State Switcher (Useful during UI design before wiring live gateway callbacks) */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 p-2 flex items-center justify-between gap-1.5 shadow-2xs">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400 pl-2.5">
                        Preview State:
                    </span>
                    <div className="flex items-center gap-1">
                        {(['success', 'failed', 'cancelled'] as const).map((state) => (
                            <button
                                key={state}
                                type="button"
                                onClick={() => setPreviewStatus(state)}
                                className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all cursor-pointer ${previewStatus === state
                                        ? 'bg-neutral-900 text-amber-400'
                                        : 'text-neutral-500 hover:bg-neutral-100'
                                    }`}
                            >
                                {state}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Result Card */}
                <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm overflow-hidden">

                    {/* Top Status Banner */}
                    {previewStatus === 'success' && (
                        <div className="bg-neutral-900 p-8 text-center text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-56 h-56 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="h-16 w-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
                                    <CheckCircle2 className="w-9 h-9" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                                    Payment Confirmed
                                </span>
                                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                    Order Paid & Sent to Kitchen!
                                </h1>
                                <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-md">
                                    Your payment has been verified. TR Cafe kitchen staff has received your order for DIU campus delivery.
                                </p>
                            </div>
                        </div>
                    )}

                    {previewStatus === 'failed' && (
                        <div className="bg-neutral-900 p-8 text-center text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-56 h-56 bg-red-500/15 rounded-full blur-3xl pointer-events-none" />
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="h-16 w-16 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-400 flex items-center justify-center mb-4">
                                    <XCircle className="w-9 h-9" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-red-500/15 border border-red-500/25 text-red-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                                    Transaction Failed
                                </span>
                                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                    Payment Could Not Be Completed
                                </h1>
                                <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-md">
                                    The payment gateway declined or timed out your transaction. No amount was deducted, or any hold will auto-reverse.
                                </p>
                            </div>
                        </div>
                    )}

                    {previewStatus === 'cancelled' && (
                        <div className="bg-neutral-900 p-8 text-center text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-56 h-56 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                            <div className="relative z-10 flex flex-col items-center">
                                <div className="h-16 w-16 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-4">
                                    <AlertTriangle className="w-9 h-9" />
                                </div>
                                <span className="px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-[11px] font-bold uppercase tracking-wider mb-2">
                                    Payment Cancelled
                                </span>
                                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                    Checkout Payment Aborted
                                </h1>
                                <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-md">
                                    You cancelled the online payment session before completion. You can retry online payment or switch to Cash on Delivery (COD).
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Transaction Receipt Body */}
                    <div className="p-6 sm:p-8 space-y-6">
                        <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-3 text-xs">
                            <div className="flex items-center justify-between pb-2.5 border-b border-neutral-200/70">
                                <span className="font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                                    <Receipt className="w-3.5 h-3.5 text-amber-600" /> Transaction Summary
                                </span>
                                <span className="inline-flex items-center gap-1 font-semibold text-neutral-700">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {method}
                                </span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-neutral-500">Order Reference</span>
                                <span className="font-extrabold text-neutral-900">{orderId}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-neutral-500">Transaction ID</span>
                                <span className="font-mono font-semibold text-neutral-800">{tranId}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-neutral-500">Delivery Zone</span>
                                <span className="font-semibold text-neutral-800 inline-flex items-center gap-1">
                                    <Bike className="w-3.5 h-3.5 text-amber-600" /> DIU Campus (20 BDT Fee)
                                </span>
                            </div>

                            <div className="pt-2.5 border-t border-neutral-200/70 flex items-center justify-between">
                                <span className="font-bold text-neutral-700">
                                    {previewStatus === 'success' ? 'Amount Paid' : 'Order Amount'}
                                </span>
                                <span className="text-lg font-extrabold text-neutral-900">
                                    {amount} <span className="text-xs font-semibold text-neutral-500">BDT</span>
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons Based on Status */}
                        {previewStatus === 'success' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Link
                                    href="/orders"
                                    className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    <span>Track Live Order</span>
                                    <ArrowRight className="w-4 h-4" />
                                </Link>

                                <Link
                                    href="/"
                                    className="py-3 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-800 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                                >
                                    <Home className="w-4 h-4" />
                                    <span>Back to Home</span>
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <Link
                                    href="/checkout"
                                    className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    <span>Retry Payment / Use COD</span>
                                </Link>

                                <Link
                                    href="/cart"
                                    className="py-3 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-800 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    <span>Return to Cart</span>
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </main>
    );
};

const PaymentPage = () => {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-neutral-50 flex items-center justify-center text-xs font-semibold text-neutral-500">
                    Verifying payment status...
                </div>
            }
        >
            <PaymentResultContent />
        </Suspense>
    );
};

export default PaymentPage;