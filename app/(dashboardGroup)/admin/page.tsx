import React from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ShoppingBag,
  Users,
  Bike,
  UtensilsCrossed,
  ShieldCheck,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChefHat,
  CreditCard,
} from 'lucide-react';

const RECENT_ORDERS = [
  {
    id: 'ORD-8495',
    customer: 'Toymur',
    location: 'YKSG-2 Hall Gate',
    items: '2x TR Monster Beef Burger, 1x Fries',
    total: 680,
    payment: 'SSLCommerz (PAID)',
    status: 'PREPARING',
    rider: 'Unassigned',
  },
  {
    id: 'ORD-8492',
    customer: 'Afraj',
    location: 'Rowshan Ara Hall',
    items: '1x Smokey BBQ Beef Burger Combo',
    total: 260,
    payment: 'COD (PENDING)',
    status: 'OUT_FOR_DELIVERY',
    rider: 'Shakil Ahmed',
  },
  {
    id: 'ORD-8488',
    customer: 'Nusrat Jahan',
    location: 'AB-4 Academic Building',
    items: '1x Crispy Peri-Peri Wings, 1x Frappe',
    total: 320,
    payment: 'Stripe (PAID)',
    status: 'DELIVERED',
    rider: 'Tanvir Hasan',
  },
];

const USER_ACCOUNTS = [
  {
    id: 'USR-01',
    name: 'Shakil Ahmed',
    email: 'shakil.rider@diu.edu.bd',
    role: 'RIDER',
    status: 'ACTIVE',
  },
  {
    id: 'USR-02',
    name: 'Rafiul Islam',
    email: 'rafiul.kitchen@trcafe.com',
    role: 'STAFF',
    status: 'ACTIVE',
  },
  {
    id: 'USR-03',
    name: 'Toymur',
    email: 'toymur@gmail.com',
    role: 'CUSTOMER',
    status: 'ACTIVE',
  },
  {
    id: 'USR-04',
    name: 'Siam Hossain',
    email: 'siam.test@gmail.com',
    role: 'CUSTOMER',
    status: 'BANNED',
  },
];

const AdminDashboardPage = () => {
  return (
    <main className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Top Admin Control Banner */}
        <div className="bg-neutral-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-neutral-800 shadow-sm">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <ShieldCheck className="w-3.5 h-3.5" /> Admin Control Center
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                TR Cafe Operations Overview
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-xl">
                Monitor daily campus sales, assign DIU delivery riders, manage staff & user roles, and toggle kitchen menu availability.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/dashboard/admin/users"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 font-semibold text-xs rounded-xl transition-all"
              >
                <Users className="w-4 h-4 text-amber-400" />
                <span>Manage Users</span>
              </Link>
              <Link
                href="/dashboard/staff/menu"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all"
              >
                <UtensilsCrossed className="w-4 h-4" />
                <span>Manage Menu</span>
              </Link>
            </div>
          </div>
        </div>

        {/* KPI Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                +18.4% <ArrowUpRight className="w-3 h-3" />
              </span>
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">Total Revenue (This Month)</p>
              <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">
                48,650 <span className="text-xs font-semibold text-neutral-500">BDT</span>
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-600 flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                6 Active
              </span>
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">Total Orders</p>
              <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">192</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center">
                <Bike className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                4 Online
              </span>
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">Active Campus Riders</p>
              <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">6</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-11 w-11 rounded-2xl bg-neutral-900 text-amber-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-xs font-semibold text-neutral-500">DIU Students</span>
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">Registered Users</p>
              <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">314</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid: Live Orders Table + User & Role Control */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column (2/3): Live Campus Orders & Rider Dispatch */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-neutral-200/80 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-neutral-100 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-neutral-900">
                  Live Campus Orders & Dispatch
                </h2>
                <p className="text-xs text-neutral-500 mt-0.5">
                  Monitor incoming orders, payment methods, and assigned DIU riders
                </p>
              </div>
              <Link
                href="/dashboard/staff/orders"
                className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
              >
                Full Order Queue &rarr;
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50/80 border-b border-neutral-100 text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    <th className="py-3.5 px-6">Order / Customer</th>
                    <th className="py-3.5 px-4">Total & Payment</th>
                    <th className="py-3.5 px-4">Assigned Rider</th>
                    <th className="py-3.5 px-6 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-xs">
                  {RECENT_ORDERS.map((order) => (
                    <tr key={order.id} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="py-4 px-6">
                        <div className="font-bold text-neutral-900">{order.id} • {order.customer}</div>
                        <div className="text-[11px] text-neutral-500 mt-0.5">{order.location}</div>
                        <div className="text-[11px] text-neutral-400 mt-0.5 line-clamp-1">{order.items}</div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-extrabold text-neutral-900">{order.total} BDT</div>
                        <div className="inline-flex items-center gap-1 text-[11px] text-neutral-500 mt-0.5">
                          <CreditCard className="w-3 h-3 text-amber-600" />
                          {order.payment}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {order.rider === 'Unassigned' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-50 border border-amber-200/80 text-amber-700 font-semibold text-[11px]">
                            <AlertCircle className="w-3 h-3" /> Needs Rider
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 font-medium text-neutral-800">
                            <Bike className="w-3.5 h-3.5 text-amber-600" />
                            {order.rider}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            order.status === 'DELIVERED'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60'
                              : order.status === 'OUT_FOR_DELIVERY'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                              : 'bg-amber-50 text-amber-700 border border-amber-200/60'
                          }`}
                        >
                          {order.status === 'DELIVERED' && <CheckCircle2 className="w-3 h-3" />}
                          {order.status === 'OUT_FOR_DELIVERY' && <Bike className="w-3 h-3" />}
                          {order.status === 'PREPARING' && <ChefHat className="w-3 h-3" />}
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column (1/3): User & Role Management Preview */}
          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
                <div>
                  <h2 className="text-base font-bold text-neutral-900">Users & Roles</h2>
                  <p className="text-[11px] text-neutral-500 mt-0.5">RBAC & Account Status</p>
                </div>
                <Link
                  href="/dashboard/admin/users"
                  className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                >
                  All Users &rarr;
                </Link>
              </div>

              <div className="divide-y divide-neutral-100 mt-2">
                {USER_ACCOUNTS.map((account) => (
                  <div key={account.id} className="py-3.5 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-neutral-900 truncate">
                          {account.name}
                        </p>
                        {account.status === 'BANNED' && (
                          <span className="px-1.5 py-0.5 rounded bg-red-50 text-red-600 border border-red-200/60 text-[9px] font-bold uppercase">
                            BANNED
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-neutral-500 truncate mt-0.5">
                        {account.email}
                      </p>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase shrink-0 ${
                        account.role === 'RIDER'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200/60'
                          : account.role === 'STAFF'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200/60'
                          : 'bg-neutral-100 text-neutral-700 border border-neutral-200/60'
                      }`}
                    >
                      {account.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-2 border-t border-neutral-100 grid grid-cols-2 gap-2">
              <Link
                href="/dashboard/admin/users"
                className="py-2.5 text-center rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs transition-colors"
              >
                Assign Roles
              </Link>
              <Link
                href="/dashboard/staff/menu"
                className="py-2.5 text-center rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 font-semibold text-xs transition-colors"
              >
                Stock Toggles
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default AdminDashboardPage;