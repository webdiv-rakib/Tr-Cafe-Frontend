'use client';

import React, { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ShieldCheck,
  MapPin,
  Phone,
  Bike,
  Banknote,
  CreditCard,
  ArrowLeft,
  ArrowRight,
  Clock,
  Lock,
  UtensilsCrossed,
  ShoppingBag,
  AlertCircle,
  Loader2,
  Building2,
} from 'lucide-react';
import { useCart } from '../cart/_components/CartContext';
import { createOrderAction, PaymentMethodType } from '../_actions/orderAction';
// Adjust import path if needed

const CAMPUS_DROP_POINTS = [
  'DIU_PERMANENT_CAMPUS',
  'YOUNUS_KHAN_SCHOLARS_GARGEN_1',
  'YOUNUS_KHAN_SCHOLARS_GARGEN_2',
  'YOUNUS_KHAN_SCHOLARS_GARGEN_3',
  'ROWSHAN_ARA_GARDEN_1',
  'ROWSHAN_ARA_GARDEN_2',
  'KHAGAN',
  'DATTA_PARA',
  'ASHULIA_BAZAR',
  'OTHER_NEARBY'
];

const CheckoutContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    items: cartItems,
    totalItems,
    subtotal,
    deliveryFee,
    grandTotal,
    clearCart,
  } = useCart();

  const paramLocation = searchParams.get('location');
  const paramPayment = searchParams.get('payment') as PaymentMethodType | null;
  const paramNote = searchParams.get('note');

  const [selectedHall, setSelectedHall] = useState(
    paramLocation && CAMPUS_DROP_POINTS.includes(paramLocation)
      ? paramLocation
      : CAMPUS_DROP_POINTS[0]
  );
  const [roomOrDetails, setRoomOrDetails] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [orderNotes, setOrderNotes] = useState(paramNote || '');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>(
    paramPayment && ['COD', 'SSLCOMMERZ', 'STRIPE'].includes(paramPayment)
      ? paramPayment
      : 'COD'
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fullDeliveryAddress = roomOrDetails.trim()
    ? `${roomOrDetails.trim()}, ${selectedHall}`
    : selectedHall;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!contactPhone.trim()) {
      setErrorMessage('Please enter your active phone number so the rider can reach you.');
      return;
    }

    if (cartItems.length === 0) {
      setErrorMessage('Your cart is empty.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createOrderAction({
        deliveryAddress: fullDeliveryAddress,
        contactPhone: contactPhone.trim(),
        orderNotes: orderNotes.trim() || undefined,
        deliveryZone: 'DIU_PERMANENT_CAMPUS',
        paymentMethod,
        items: cartItems.map((item) => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity,
        })),
      });

      if (!response.success) {
        setErrorMessage(response.message);
        setIsSubmitting(false);
        return;
      }

      // Clear local cart once backend order is created
      clearCart();

      // Redirect to SSLCommerz / Stripe gateway if URL returned, otherwise go to My Orders
      if (response.paymentUrl) {
        window.location.href = response.paymentUrl;
      } else {
        router.push('/orders');
      }
    } catch {
      setErrorMessage('Something went wrong while placing your order.');
      setIsSubmitting(false);
    }
  };

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
                Verify your DIU contact number, hall gate or room details, and preferred payment gateway before confirming.
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

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-sm p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mx-auto">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-extrabold text-neutral-900">Nothing to checkout</h2>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Your cart is currently empty. Pick some burgers, wings, or student combos from the menu before proceeding to checkout.
            </p>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-xs rounded-xl shadow-sm transition-all"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <form
            onSubmit={handlePlaceOrder}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* Left Column (7 cols): Delivery Info + Payment Gateway Selection */}
            <div className="lg:col-span-7 space-y-6">

              {/* Error Banner */}
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

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
                        Zone: <strong className="text-neutral-700">DIU Permanent Campus</strong> (Flat 20 BDT)
                      </p>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                    <Clock className="w-3 h-3" /> 20–30 mins ETA
                  </span>
                </div>

                {/* Campus Hall / Building Select */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Campus Hall / Building
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-amber-600">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <select
                      value={selectedHall}
                      onChange={(e) => setSelectedHall(e.target.value)}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Room / Gate Detail */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Room No. / Gate Detail (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <Building2 className="h-4 w-4" />
                      </div>
                      <input
                        type="text"
                        value={roomOrDetails}
                        onChange={(e) => setRoomOrDetails(e.target.value)}
                        placeholder="e.g. Room 402 or Main Gate"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-50/60 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-neutral-900"
                      />
                    </div>
                  </div>

                  {/* Active Phone Number */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                      Active Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <Phone className="h-4 w-4" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="01889966347"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-50/60 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-neutral-900"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Notes */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="e.g. Knock quietly, extra chili sauce..."
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
                          Pay {grandTotal} BDT in cash directly to the TR Cafe rider upon delivery
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
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Dynamic Cart Items List */}
              <div className="divide-y divide-neutral-100">
                {cartItems.map((item) => (
                  <div
                    key={item.menuItemId}
                    className="py-3 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <p className="font-bold text-neutral-900">
                        {item.quantity}x {item.name}
                      </p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">
                        {item.price} BDT each
                      </p>
                    </div>
                    <p className="font-extrabold text-neutral-900 shrink-0">
                      {item.price * item.quantity} BDT
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
                <p className="text-neutral-700 font-medium">{fullDeliveryAddress}</p>
                <p className="text-[11px] text-neutral-500">
                  Phone: {contactPhone || 'Enter active phone number'}
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
                  <span className="font-semibold text-amber-600">+{deliveryFee} BDT</span>
                </div>
                <div className="pt-3 border-t border-neutral-200/80 flex items-center justify-between">
                  <span className="text-sm font-bold text-neutral-900">Grand Total</span>
                  <span className="text-2xl font-extrabold text-neutral-900">
                    {grandTotal} <span className="text-xs font-semibold text-neutral-500">BDT</span>
                  </span>
                </div>
              </div>

              {/* Confirm Order CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 disabled:bg-amber-400 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 group cursor-pointer disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Placing Order...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {paymentMethod === 'COD'
                        ? `Confirm Order (${grandTotal} BDT COD)`
                        : `Pay ${grandTotal} BDT via ${paymentMethod === 'SSLCOMMERZ' ? 'SSLCommerz' : 'Stripe'}`}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-neutral-400">
                By placing your order, you agree to be available at the selected DIU gate when the rider arrives.
              </p>
            </aside>
          </form>
        )}
      </div>
    </main>
  );
};

const CheckoutPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-neutral-50 flex items-center justify-center text-xs font-semibold text-neutral-500">
          Loading checkout summary...
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
};

export default CheckoutPage;