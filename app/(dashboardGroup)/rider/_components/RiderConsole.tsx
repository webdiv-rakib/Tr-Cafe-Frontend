/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import React, { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
    Bike,
    CheckCircle2,
    MapPin,
    Phone,
    Banknote,
    ShieldCheck,
    Clock,
    FileText,
    RefreshCw,
    AlertCircle,
    Loader2,
    PackageCheck,
} from 'lucide-react';
import {
    IRiderOrder,
    markOrderDeliveredAction,
} from '../_actions/riderActions'; // Adjust import path if needed

interface RiderConsoleProps {
    initialOrders: IRiderOrder[];
}

export const RiderConsole = ({ initialOrders }: RiderConsoleProps) => {
    const router = useRouter();
    const [isRefreshing, startTransition] = useTransition();

    const [orders, setOrders] = useState<IRiderOrder[]>(initialOrders);
    const [deliveringId, setDeliveringId] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    React.useEffect(() => {
        setOrders(initialOrders);
    }, [initialOrders]);

    const activeDeliveries = orders.filter((o) => o.status === 'OUT_FOR_DELIVERY');
    const completedDeliveries = orders.filter((o) => o.status === 'DELIVERED');

    // Cash to collect on active COD runs
    const pendingCodAmount = activeDeliveries.reduce((sum, order) => {
        const isCod = !order.payment || order.payment.provider === 'COD';
        return isCod ? sum + order.totalAmount : sum;
    }, 0);

    const handleMarkDelivered = async (orderId: string) => {
        setErrorMessage(null);
        setDeliveringId(orderId);

        const res = await markOrderDeliveredAction(orderId);
        if (!res.success) {
            setErrorMessage(res.message);
            setDeliveringId(null);
            return;
        }

        setOrders((prev) =>
            prev.map((order) =>
                order.id === orderId ? { ...order, status: 'DELIVERED' } : order
            )
        );
        setDeliveringId(null);

        startTransition(() => {
            router.refresh();
        });
    };

    const formatTime = (isoString: string) => {
        try {
            return new Intl.DateTimeFormat('en-BD', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                day: '2-digit',
                month: 'short',
            }).format(new Date(isoString));
        } catch {
            return isoString;
        }
    };

    return (
        <main className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Top Rider Banner */}
                <div className="bg-neutral-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-neutral-800 shadow-sm">
                    <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                <Bike className="w-3.5 h-3.5" /> DIU Campus Delivery Dispatch
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                Rider Delivery Console
                            </h1>
                            <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-xl">
                                View your assigned DIU hall deliveries, call students at the gate, collect COD cash if applicable, and mark orders delivered.
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
                            <span>{isRefreshing ? 'Syncing...' : 'Refresh Runs'}</span>
                        </button>
                    </div>
                </div>

                {/* Error Alert */}
                {errorMessage && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2.5">
                        <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                        <span>{errorMessage}</span>
                    </div>
                )}

                {/* Rider KPI Strip */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                            <Bike className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-neutral-500">Active Drop-offs</p>
                            <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">
                                {activeDeliveries.length}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-neutral-500">Completed Deliveries</p>
                            <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">
                                {completedDeliveries.length}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center shrink-0">
                            <Banknote className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs font-medium text-neutral-500">COD Cash to Collect</p>
                            <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">
                                {pendingCodAmount}{' '}
                                <span className="text-xs font-semibold text-neutral-500">BDT</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Active Deliveries Section */}
                <section className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                            <Bike className="w-4 h-4 text-amber-600" />
                            Active Assigned Deliveries ({activeDeliveries.length})
                        </h2>
                        <span className="text-xs text-neutral-400">Out for delivery</span>
                    </div>

                    {activeDeliveries.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-10 text-center space-y-2">
                            <p className="text-sm font-bold text-neutral-900">No active deliveries right now</p>
                            <p className="text-xs text-neutral-500">
                                When kitchen staff dispatches an order to you, it will appear here immediately.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {activeDeliveries.map((order) => {
                                const shortOrderId = `#${order.id.slice(-8).toUpperCase()}`;
                                const customerName = order.user?.name || 'DIU Student';
                                const customerPhone = order.contactPhone || order.user?.phone || '';
                                const isCod = !order.payment || order.payment.provider === 'COD';
                                const isUpdating = deliveringId === order.id;

                                return (
                                    <div
                                        key={order.id}
                                        className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-6 space-y-5"
                                    >
                                        {/* Header Row */}
                                        <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-neutral-100">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-base font-extrabold text-neutral-900">
                                                        {shortOrderId}
                                                    </span>
                                                    <span className="text-xs font-semibold text-neutral-600">
                                                        • {customerName}
                                                    </span>
                                                </div>
                                                <p className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                                                    <Clock className="w-3 h-3" /> Dispatched • Placed {formatTime(order.createdAt)}
                                                </p>
                                            </div>

                                            {isCod ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
                                                    <Banknote className="w-3.5 h-3.5" /> Collect {order.totalAmount} BDT Cash
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
                                                    <ShieldCheck className="w-3.5 h-3.5" /> Paid Online ({order.payment?.provider})
                                                </span>
                                            )}
                                        </div>

                                        {/* Drop-off Destination & Food Items */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 space-y-2">
                                                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                                                    DIU Drop-off Point
                                                </p>
                                                <p className="text-xs sm:text-sm font-bold text-neutral-900 flex items-start gap-1.5">
                                                    <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                                    <span>{order.deliveryAddress}</span>
                                                </p>
                                                {order.orderNotes && (
                                                    <p className="text-xs text-amber-700 flex items-start gap-1.5 pt-1">
                                                        <FileText className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                                                        <span>&ldquo;{order.orderNotes}&rdquo;</span>
                                                    </p>
                                                )}
                                            </div>

                                            <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 space-y-1.5">
                                                <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                                                    Food Package ({order.items.reduce((s, i) => s + i.quantity, 0)} items)
                                                </p>
                                                <ul className="text-xs font-semibold text-neutral-800 space-y-1">
                                                    {order.items.map((item) => (
                                                        <li key={item.id}>
                                                            • {item.quantity}x {item.menuItem?.name || 'Menu Item'}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        {/* Call Student & Mark Delivered Actions */}
                                        <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                            {customerPhone && (
                                                <a
                                                    href={`tel:${customerPhone}`}
                                                    className="py-3 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-900 font-semibold text-xs transition-colors flex items-center justify-center gap-2 shrink-0"
                                                >
                                                    <Phone className="w-4 h-4 text-amber-600" />
                                                    <span>Call {customerPhone}</span>
                                                </a>
                                            )}

                                            <button
                                                type="button"
                                                disabled={isUpdating}
                                                onClick={() => handleMarkDelivered(order.id)}
                                                className="flex-1 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-60 text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                                            >
                                                {isUpdating ? (
                                                    <>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        <span>Completing Delivery...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <PackageCheck className="w-4 h-4" />
                                                        <span>Mark as Delivered</span>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>

                {/* Completed Deliveries History */}
                {completedDeliveries.length > 0 && (
                    <section className="space-y-4">
                        <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            Recent Completed Deliveries ({completedDeliveries.length})
                        </h2>

                        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm divide-y divide-neutral-100">
                            {completedDeliveries.map((order) => (
                                <div
                                    key={order.id}
                                    className="p-4 sm:p-5 flex flex-wrap items-center justify-between gap-3 text-xs"
                                >
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="font-extrabold text-neutral-900">
                                                #{order.id.slice(-8).toUpperCase()}
                                            </span>
                                            <span className="text-neutral-500">• {order.deliveryAddress}</span>
                                        </div>
                                        <p className="text-[11px] text-neutral-400 mt-0.5">
                                            {order.user?.name || 'DIU Student'} • {formatTime(order.updatedAt)}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className="font-bold text-neutral-800">{order.totalAmount} BDT</span>
                                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase">
                                            DELIVERED
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </main>
    );
};