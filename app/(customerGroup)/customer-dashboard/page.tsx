import React from 'react';
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
  UtensilsCrossed,
  ArrowRight,
  Wallet,
  Receipt,
  Sparkles,
} from 'lucide-react';
import { getMyOrdersAction, IOrder } from '../_actions/orderAction';
 // Adjust import path if needed

const CustomerDashboardPage = async () => {
  const orders = await getMyOrdersAction();

  // Compute live metrics from real database orders
  const validOrders = orders.filter((o) => o.status !== 'CANCELLED');
  const activeOrders = orders.filter((o) =>
    ['PENDING', 'PREPARING', 'OUT_FOR_DELIVERY'].includes(o.status)
  );
  const currentActiveOrder = activeOrders[0] || null;

  const totalSpent = orders.reduce((sum, order) => {
    if (order.status === 'CANCELLED') return sum;
    if (order.status === 'DELIVERED' || order.payment?.status === 'PAID') {
      return sum + Number(order.totalAmount || 0);
    }
    return sum;
  }, 0);

  const recentOrders = orders.slice(0, 5);

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

  const formatDate = (isoString: string) => {
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

  const getStatusPill = (status: IOrder['status']) => {
    switch (status) {
      case 'PENDING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-bold uppercase">
            <Clock className="w-3 h-3" /> Pending
          </span>
        );
      case 'PREPARING':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-bold uppercase">
            <ChefHat className="w-3 h-3" /> Preparing
          </span>
        );
      case 'OUT_FOR_DELIVERY':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-700 text-[10px] font-bold uppercase">
            <Bike className="w-3 h-3" /> On the Way
          </span>
        );
      case 'DELIVERED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold uppercase">
            <CheckCircle2 className="w-3 h-3" /> Delivered
          </span>
        );
      case 'CANCELLED':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-[10px] font-bold uppercase">
            <XCircle className="w-3 h-3" /> Cancelled
          </span>
        );
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Student Welcome Banner */}
        <div className="bg-neutral-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-neutral-800 shadow-sm">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <Sparkles className="w-3.5 h-3.5" /> DIU Student Food Hub
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome Back to TR Cafe
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-xl">
                Track your live DIU permanent campus orders, review past meals, and reorder your favorites in one tap.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/orders"
                className="px-4 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 font-semibold text-xs transition-all"
              >
                All Orders ({orders.length})
              </Link>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Order Food</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Live Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">Total Orders</p>
              <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">
                {validOrders.length}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">Total Spent</p>
              <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">
                {totalSpent}{' '}
                <span className="text-xs font-semibold text-neutral-500">BDT</span>
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center shrink-0">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">Active Deliveries</p>
              <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">
                {activeOrders.length}
              </p>
            </div>
          </div>
        </div>

        {/* Live Active Order Tracker */}
        {currentActiveOrder && (
          <section className="bg-white rounded-2xl border border-amber-300/80 shadow-sm p-6 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-neutral-100">
              <div>
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <h2 className="text-base font-extrabold text-neutral-900">
                    Live Order Tracker • #{currentActiveOrder.id.slice(-8).toUpperCase()}
                  </h2>
                </div>
                <p className="text-xs text-neutral-500 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{currentActiveOrder.deliveryAddress}</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                {getStatusPill(currentActiveOrder.status)}
                <Link
                  href="/orders"
                  className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
                >
                  <span>Manage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* 4-Step Progress Bar */}
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { step: 1, label: 'Pending' },
                { step: 2, label: 'Preparing' },
                { step: 3, label: 'On the Way' },
                { step: 4, label: 'Delivered' },
              ].map((s) => {
                const currentStep = getProgressStep(currentActiveOrder.status);
                const isDone = currentStep > s.step;
                const isCurrent = currentStep === s.step;

                return (
                  <div key={s.step} className="space-y-1.5">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isDone
                          ? 'bg-emerald-500'
                          : isCurrent
                          ? 'bg-amber-500'
                          : 'bg-neutral-200'
                      }`}
                    />
                    <p
                      className={`text-[11px] font-semibold ${
                        isDone
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

            {/* Bottom Summary + Rider Info */}
            <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-neutral-600">
                <strong className="text-neutral-900">
                  {currentActiveOrder.items.reduce((s, i) => s + i.quantity, 0)} items
                </strong>{' '}
                • Total:{' '}
                <strong className="text-neutral-900">{currentActiveOrder.totalAmount} BDT</strong> (
                {currentActiveOrder.payment?.provider || 'COD'} •{' '}
                {currentActiveOrder.payment?.status || 'PENDING'})
              </div>

              {currentActiveOrder.rider?.name && (
                <div className="flex items-center gap-2">
                  <span className="text-neutral-600">
                    Rider: <strong className="text-neutral-900">{currentActiveOrder.rider.name}</strong>
                  </span>
                  {currentActiveOrder.rider.phone && (
                    <a
                      href={`tel:${currentActiveOrder.rider.phone}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 font-semibold hover:bg-amber-100 transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Call</span>
                    </a>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Recent Orders Section */}
        <section className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-neutral-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-neutral-900">Recent Campus Orders</h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Your latest fast food orders from TR Cafe
              </p>
            </div>

            {orders.length > 0 && (
              <Link
                href="/orders"
                className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
              >
                <span>View Full History</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {recentOrders.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mx-auto">
                <UtensilsCrossed className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">No orders yet</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                You haven&apos;t placed any campus food orders yet. Check out our burgers, wings, and student combos!
              </p>
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold transition-all"
              >
                <span>Explore Menu</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-50/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-extrabold text-neutral-900">
                        #{order.id.slice(-8).toUpperCase()}
                      </span>
                      {getStatusPill(order.status)}
                    </div>
                    <p className="text-xs text-neutral-700 font-medium">
                      {order.items
                        .map((i) => `${i.quantity}x ${i.menuItem?.name || 'Item'}`)
                        .join(', ')}
                    </p>
                    <p className="text-[11px] text-neutral-400">
                      {formatDate(order.createdAt)} • {order.deliveryAddress}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <div className="text-left sm:text-right">
                      <p className="text-sm font-extrabold text-neutral-900">
                        {order.totalAmount}{' '}
                        <span className="text-[11px] font-semibold text-neutral-500">BDT</span>
                      </p>
                      <p className="text-[11px] font-semibold text-neutral-500 inline-flex items-center gap-1">
                        <Receipt className="w-3 h-3 text-amber-600" />
                        {order.payment?.provider || 'COD'} • {order.payment?.status || 'PENDING'}
                      </p>
                    </div>

                    <Link
                      href="/orders"
                      className="px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200/80 text-neutral-800 text-xs font-semibold transition-colors"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
};

export default CustomerDashboardPage;