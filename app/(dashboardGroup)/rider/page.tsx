import React from 'react';
import {
  Bike,
  MapPin,
  Phone,
  CheckCircle2,
  Banknote,
  Clock,
  Package,
  CreditCard,
  Navigation,
} from 'lucide-react';

const ASSIGNED_DELIVERIES = [
  {
    id: 'ORD-8492',
    customerName: 'Afraj',
    customerPhone: '017XXXXXXXX',
    location: 'YKSG-2 Hall Gate, DIU Campus',
    items: ['2x TR Monster Beef Burger', '1x Loaded Cheesy Fries', '2x TR Iced Choco Frappe'],
    total: 920,
    paymentMethod: 'COD',
    paymentStatus: 'PENDING',
    assignedAt: '6:02 PM',
  },
  {
    id: 'ORD-8496',
    customerName: 'Nusrat Jahan',
    customerPhone: '018XXXXXXXX',
    location: 'Rowshan Ara Hall Gate, DIU Campus',
    items: ['1x Crispy Peri-Peri Wings (6 Pcs)', '1x TR Iced Choco Frappe'],
    total: 320,
    paymentMethod: 'SSLCOMMERZ',
    paymentStatus: 'PAID',
    assignedAt: '6:08 PM',
  },
];

const COMPLETED_TODAY = [
  {
    id: 'ORD-8485',
    customerName: 'Toymur',
    location: 'AB-4 Academic Building',
    total: 540,
    paymentMethod: 'COD',
    deliveredAt: '5:40 PM',
  },
  {
    id: 'ORD-8479',
    customerName: 'Siam Hossain',
    location: 'YKSG-1 Hall Gate',
    total: 260,
    paymentMethod: 'STRIPE',
    deliveredAt: '5:12 PM',
  },
];

const RiderDashboard = () => {
  return (
    <main className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Top Rider Shift Header */}
        <div className="bg-neutral-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-neutral-800 shadow-sm">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                On Shift • DIU Campus Zone
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Rider Delivery Console
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-lg">
                View your assigned campus drop-offs, collect Cash on Delivery (COD) payments, and confirm completed hall deliveries.
              </p>
            </div>
          </div>
        </div>

        {/* Shift Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
              <Bike className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">Assigned Queue</p>
              <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">2</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">Delivered Today</p>
              <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">8</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-sm flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-neutral-900 text-amber-400 flex items-center justify-center shrink-0">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-medium text-neutral-500">COD Cash Held</p>
              <p className="text-2xl font-extrabold text-neutral-900 mt-0.5">
                1,460 <span className="text-xs font-semibold text-neutral-500">BDT</span>
              </p>
            </div>
          </div>
        </div>

        {/* Active Assigned Deliveries */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-neutral-900 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-amber-600" />
              Active Assigned Deliveries ({ASSIGNED_DELIVERIES.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ASSIGNED_DELIVERIES.map((delivery) => {
              const isCOD = delivery.paymentMethod === 'COD' && delivery.paymentStatus === 'PENDING';

              return (
                <div
                  key={delivery.id}
                  className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-6 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    {/* Card Header */}
                    <div className="flex items-center justify-between gap-2 pb-3 border-b border-neutral-100">
                      <div>
                        <span className="text-sm font-extrabold text-neutral-900">
                          {delivery.id}
                        </span>
                        <span className="text-[11px] text-neutral-400 ml-2">
                          • Assigned {delivery.assignedAt}
                        </span>
                      </div>

                      {isCOD ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-[11px] font-bold">
                          <Banknote className="w-3.5 h-3.5" /> Collect {delivery.total} BDT
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-bold">
                          <CreditCard className="w-3.5 h-3.5" /> Already Paid
                        </span>
                      )}
                    </div>

                    {/* Drop-off Location & Customer */}
                    <div className="space-y-2.5">
                      <div className="flex items-start gap-2.5">
                        <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 shrink-0 mt-0.5">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                            Drop-off Point
                          </p>
                          <p className="text-sm font-bold text-neutral-900">
                            {delivery.location}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-neutral-50 px-3.5 py-2.5 rounded-xl border border-neutral-100">
                        <div>
                          <p className="text-[11px] text-neutral-400">Customer</p>
                          <p className="text-xs font-bold text-neutral-900">
                            {delivery.customerName}
                          </p>
                        </div>
                        <a
                          href={`tel:${delivery.customerPhone}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-neutral-200 hover:border-amber-400 text-neutral-800 hover:text-amber-600 text-xs font-semibold shadow-2xs transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5 text-amber-600" />
                          <span>{delivery.customerPhone}</span>
                        </a>
                      </div>
                    </div>

                    {/* Package Items */}
                    <div className="p-3.5 rounded-xl bg-neutral-50/70 border border-neutral-100 space-y-1.5">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
                        <Package className="w-3 h-3" /> Order Summary
                      </p>
                      <ul className="text-xs text-neutral-700 space-y-1 font-medium">
                        {delivery.items.map((item, idx) => (
                          <li key={idx}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 space-y-2">
                    {isCOD && (
                      <button
                        type="button"
                        className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-amber-400 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Banknote className="w-4 h-4" />
                        <span>Confirm Cash Collected ({delivery.total} BDT)</span>
                      </button>
                    )}

                    <button
                      type="button"
                      className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Mark Order Delivered</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Completed Deliveries History */}
        <section className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <h2 className="text-base font-bold text-neutral-900">Completed Today</h2>
            <span className="text-xs font-medium text-neutral-400">Recent drop-offs</span>
          </div>

          <div className="divide-y divide-neutral-100 mt-2">
            {COMPLETED_TODAY.map((order) => (
              <div
                key={order.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-neutral-900">{order.id}</span>
                    <span className="text-xs text-neutral-500">• {order.customerName}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[10px] font-bold uppercase">
                      DELIVERED
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500 mt-0.5">{order.location}</p>
                </div>

                <div className="flex items-center sm:justify-end gap-4 text-xs">
                  <span className="text-neutral-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {order.deliveredAt}
                  </span>
                  <span className="font-extrabold text-neutral-900">
                    {order.total} BDT ({order.paymentMethod})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
};

export default RiderDashboard;