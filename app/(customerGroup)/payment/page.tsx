'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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
    Loader2,
} from 'lucide-react';
import { getMyOrdersAction, IOrder } from '../_actions/orderAction';
import { getOrderDetailsForReceiptAction } from '../_actions/getOrderByIdAction';
 // Adjust path if needed

type PaymentStatus = 'success' | 'failed' | 'cancelled';

const PaymentResultContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const urlStatus = searchParams.get('status')?.toLowerCase() as PaymentStatus | undefined;
    const orderIdParam = searchParams.get('orderId') || '';
    const urlTranId =
        searchParams.get('tranId') ||
        searchParams.get('transactionId') ||
        searchParams.get('session_id') ||
        '';
    const urlAmount = searchParams.get('amount') || '';
    const urlMethod = searchParams.get('method') || searchParams.get('provider') || '';

    const [orderDetails, setOrderDetails] = useState<IOrder | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const status: PaymentStatus =
        urlStatus && ['success', 'failed', 'cancelled'].includes(urlStatus)
            ? urlStatus
            : 'success';

    useEffect(() => {
        router.refresh();

        let isMounted = true;
        let attempts = 0;
        const maxAttempts = 5;

        const fetchOrderReceipt = async () => {
            attempts += 1;

            let data: IOrder | null = null;
            if (orderIdParam) {
                data = await getOrderDetailsForReceiptAction(orderIdParam);
            } else {
                // Fallback: if Stripe success_url didn't include orderId, grab most recent order
                const orders = await getMyOrdersAction();
                data = orders[0] || null;
            }

            if (!isMounted) return;

            if (data) {
                setOrderDetails(data);
            }

            // If payment succeeded but webhook hasn't saved transactionId yet, retry briefly
            if (
                status === 'success' &&
                !data?.payment?.transactionId &&
                !urlTranId &&
                attempts < maxAttempts
            ) {
                setTimeout(fetchOrderReceipt, 1500);
            } else {
                setIsLoading(false);
            }
        };

        fetchOrderReceipt();

        return () => {
            isMounted = false;
        };
    }, [orderIdParam, status, urlTranId, router]);

    const displayOrderId = orderDetails?.id
        ? `#${orderDetails.id.slice(-8).toUpperCase()}`
        : orderIdParam
            ? `#${orderIdParam.slice(-8).toUpperCase()}`
            : 'N/A';

    const displayTranId =
        orderDetails?.payment?.transactionId ||
        urlTranId ||
        (status === 'success' ? 'Processing Webhook...' : 'Not Generated');

    const displayAmount =
        orderDetails?.totalAmount ??
        orderDetails?.payment?.amount ??
        (urlAmount || '0');

    const displayMethod =
        orderDetails?.payment?.provider ||
        urlMethod ||
        (urlTranId.startsWith('cs_') || urlTranId.startsWith('pi_') ? 'STRIPE' : 'ONLINE');

    return (
        <main className="min-h-screen bg-neutral-50 py-10 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
            <div className="w-full max-w-xl space-y-6">
                <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm overflow-hidden">

                    {/* Top Status Banner */}
                    {status === 'success' && (
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

                    {status === 'failed' && (
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

                    {status === 'cancelled' && (
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
                                    You cancelled the online payment session before completion. You can retry payment from My Orders or switch to Cash on Delivery (COD).
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Transaction Receipt Body */}
                    <div className="p-6 sm:p-8 space-y-6">
                        {isLoading ? (
                            <div className="p-8 rounded-2xl bg-neutral-50 border border-neutral-200/70 flex items-center justify-center gap-2 text-xs font-semibold text-neutral-500">
                                <Loader2 className="w-4 h-4 animate-spin text-amber-600" />
                                <span>Fetching Stripe transaction ID...</span>
                            </div>
                        ) : (
                            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-3 text-xs">
                                <div className="flex items-center justify-between pb-2.5 border-b border-neutral-200/70">
                                    <span className="font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1.5">
                                        <Receipt className="w-3.5 h-3.5 text-amber-600" /> Transaction Summary
                                    </span>
                                    <span className="inline-flex items-center gap-1 font-bold uppercase text-neutral-800">
                                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {displayMethod}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-neutral-500">Order Reference</span>
                                    <span className="font-extrabold text-neutral-900">{displayOrderId}</span>
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <span className="text-neutral-500 shrink-0">Transaction ID</span>
                                    <span
                                        className="font-mono font-semibold text-neutral-800 truncate max-w-60"
                                        title={displayTranId}
                                    >
                                        {displayTranId}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-neutral-500">Delivery Zone</span>
                                    <span className="font-semibold text-neutral-800 inline-flex items-center gap-1">
                                        <Bike className="w-3.5 h-3.5 text-amber-600" />
                                        {orderDetails?.deliveryZone
                                            ? orderDetails.deliveryZone.replaceAll('_', ' ')
                                            : 'DIU Campus (20 BDT Fee)'}
                                    </span>
                                </div>

                                <div className="pt-2.5 border-t border-neutral-200/70 flex items-center justify-between">
                                    <span className="font-bold text-neutral-700">
                                        {status === 'success' ? 'Amount Paid' : 'Order Amount'}
                                    </span>
                                    <span className="text-lg font-extrabold text-neutral-900">
                                        {displayAmount} <span className="text-xs font-semibold text-neutral-500">BDT</span>
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons Based on Status */}
                        {status === 'success' ? (
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
                                    href="/orders"
                                    className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-xs shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    <span>Retry Payment in My Orders</span>
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