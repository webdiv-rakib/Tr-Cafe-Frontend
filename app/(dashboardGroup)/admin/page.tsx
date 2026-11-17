import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Wallet,
  ShoppingBag,
  Users,
  UtensilsCrossed,
  Clock,
  ChefHat,
  Bike,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Receipt,
  MapPin,
} from 'lucide-react';
import { getAdminDashboardStatsAction, IAdminOrder } from './_actions/adminActions';
// Adjust import path if needed

const AdminDashboardPage = async () => {
  const stats = await getAdminDashboardStatsAction();

  const formatDate = (isoString: string) => {
    try {
      return new Intl.DateTimeFormat('en-BD', {
        month: 'short',
        day: '2-digit',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(new Date(isoString));
    } catch {
      return isoString;
    }
  };

  const getStatusBadge = (status: IAdminOrder['status']) => {
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

        {/* Top Admin Header Banner */}
        <div className="bg-neutral-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-neutral-800 shadow-sm">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5" /> TR Cafe Command Center
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Admin Analytics & Operations
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-xl">
                Monitor live DIU campus revenue, track order fulfillment, manage user roles, and oversee menu inventory in real time.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <Link
                href="/dashboard/admin/users"
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 font-semibold text-xs transition-all"
              >
                Manage Users
              </Link>
              <Link
                href="/dashboard/admin/menu"
                className="px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 font-semibold text-xs transition-all"
              >
                Manage Menu
              </Link>
              <Link
                href="/dashboard/staff"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs shadow-lg shadow-amber-500/20 transition-all"
              >
                <span>Kitchen Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Primary KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Collected Revenue */}
          <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-500">Collected Revenue</span>
              <div className="h-9 w-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center">
                <Wallet className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-neutral-900">
                {stats.totalRevenue}{' '}
                <span className="text-xs font-semibold text-neutral-500">BDT</span>
              </p>
              <p className="text-[11px] text-neutral-400 mt-1">
                +{stats.pendingRevenue} BDT pending COD/active
              </p>
            </div>
          </div>

          {/* Total Orders */}
          <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-500">Total Campus Orders</span>
              <div className="h-9 w-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-neutral-900">{stats.totalOrders}</p>
              <p className="text-[11px] text-neutral-400 mt-1">
                {stats.activeOrdersCount} active • {stats.deliveredOrdersCount} delivered
              </p>
            </div>
          </div>

          {/* Registered Users */}
          <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-500">Registered Accounts</span>
              <div className="h-9 w-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-neutral-900">{stats.totalUsers}</p>
              <p className="text-[11px] text-neutral-400 mt-1">
                Includes {stats.ridersCount} campus {stats.ridersCount === 1 ? 'rider' : 'riders'}
              </p>
            </div>
          </div>

          {/* Menu Catalog */}
          <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-500">Menu Availability</span>
              <div className="h-9 w-9 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 flex items-center justify-center">
                <UtensilsCrossed className="w-4 h-4" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-neutral-900">
                {stats.inStockMenuItems} / {stats.totalMenuItems}
              </p>
              <p className="text-[11px] text-neutral-400 mt-1">
                Items currently in stock
              </p>
            </div>
          </div>
        </div>

        {/* Order Status Breakdown Strip */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white px-5 py-4 rounded-2xl border border-neutral-200/80 shadow-2xs flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-600">Active In-Progress</span>
            <span className="text-base font-extrabold text-amber-600">{stats.activeOrdersCount}</span>
          </div>
          <div className="bg-white px-5 py-4 rounded-2xl border border-neutral-200/80 shadow-2xs flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-600">Completed Deliveries</span>
            <span className="text-base font-extrabold text-emerald-600">{stats.deliveredOrdersCount}</span>
          </div>
          <div className="bg-white px-5 py-4 rounded-2xl border border-neutral-200/80 shadow-2xs flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-600">Cancelled Orders</span>
            <span className="text-base font-extrabold text-red-600">{stats.cancelledOrdersCount}</span>
          </div>
        </div>

        {/* Recent Campus Orders Table */}
        <section className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-neutral-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-neutral-900">Recent Campus Orders</h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Latest transactions across DIU permanent campus
              </p>
            </div>

            <Link
              href="/dashboard/staff"
              className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1"
            >
              <span>Open Live Queue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {stats.recentOrders.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <p className="text-sm font-bold text-neutral-900">No orders recorded yet</p>
              <p className="text-xs text-neutral-500">
                Once students place orders from the menu, live revenue and order activity will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50 border-b border-neutral-100 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    <th className="py-3.5 px-6">Order ID</th>
                    <th className="py-3.5 px-4">Customer & Location</th>
                    <th className="py-3.5 px-4">Items</th>
                    <th className="py-3.5 px-4">Payment</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-xs">
                  {stats.recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-neutral-50/60 transition-colors"
                    >
                      <td className="py-4 px-6 whitespace-nowrap">
                        <p className="font-extrabold text-neutral-900">
                          #{order.id.slice(-8).toUpperCase()}
                        </p>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          {formatDate(order.createdAt)}
                        </p>
                      </td>

                      <td className="py-4 px-4 max-w-[240px]">
                        <p className="font-bold text-neutral-900">
                          {order.user?.name || 'DIU Student'}
                        </p>
                        <p className="text-[11px] text-neutral-500 flex items-center gap-1 truncate mt-0.5">
                          <MapPin className="w-3 h-3 text-amber-600 shrink-0" />
                          <span className="truncate">{order.deliveryAddress}</span>
                        </p>
                      </td>

                      <td className="py-4 px-4 max-w-[220px]">
                        <p className="text-neutral-700 font-medium truncate">
                          {order.items
                            .map((i) => `${i.quantity}x ${i.menuItem?.name || 'Item'}`)
                            .join(', ')}
                        </p>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 font-semibold text-neutral-700">
                          <Receipt className="w-3 h-3 text-amber-600" />
                          {order.payment?.provider || 'COD'}
                        </span>
                        <span
                          className={`block text-[10px] font-bold uppercase mt-0.5 ${order.payment?.status === 'PAID'
                              ? 'text-emerald-600'
                              : 'text-amber-600'
                            }`}
                        >
                          {order.payment?.status || 'PENDING'}
                        </span>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap font-extrabold text-neutral-900">
                        {order.totalAmount} BDT
                      </td>

                      <td className="py-4 px-6 whitespace-nowrap text-right">
                        {getStatusBadge(order.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

      </div>
    </main>
  );
};

export default AdminDashboardPage;