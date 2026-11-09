import Link from 'next/link';
import { ArrowRight, Sparkles, Clock, ShieldCheck, Flame } from 'lucide-react';

export const HeroSection = () => {
    return (
        <section className="relative overflow-hidden bg-neutral-900 text-white py-16 sm:py-24">
            {/* Background Accent Glow */}
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Left Content */}
                    <div className="space-y-6 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold tracking-wide uppercase">
                            <Flame className="w-3.5 h-3.5" />
                            <span>DIU Campus In-House Delivery</span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                            Craving Fast Food? <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">
                                Delivered Hot & Fresh.
                            </span>
                        </h1>

                        <p className="text-neutral-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Order signature burgers, crispy fries, wraps, and chillers directly to your residence hall or campus spot with flat 20 BDT delivery.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                            <Link
                                href="/menu"
                                className="w-full sm:w-auto px-8 py-3.5 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 group cursor-pointer"
                            >
                                <span>Explore Full Menu</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <Link
                                href="/login"
                                className="w-full sm:w-auto px-6 py-3.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-neutral-200 font-medium rounded-xl transition-all text-center"
                            >
                                Sign In to Track Orders
                            </Link>
                        </div>

                        {/* Value Props Pills */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-800 text-left">
                            <div>
                                <p className="text-xl font-bold text-white">20 BDT</p>
                                <p className="text-xs text-neutral-400 mt-0.5">Flat Campus Delivery</p>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-white">20-30 min</p>
                                <p className="text-xs text-neutral-400 mt-0.5">Hall Gate Drop-off</p>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-white">Cash / Online</p>
                                <p className="text-xs text-neutral-400 mt-0.5">COD, bKash & Card</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Hero Graphic Card */}
                    <div className="relative flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-md bg-gradient-to-b from-neutral-800/80 to-neutral-900 border border-neutral-700/60 rounded-3xl p-6 shadow-2xl backdrop-blur-sm">
                            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                                <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                                    <Sparkles className="w-4 h-4" /> Today&apos;s Featured Pick
                                </span>
                                <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-xs rounded-full font-medium">
                                    Hot Deal
                                </span>
                            </div>

                            {/* Graphic Mockup Box */}
                            <div className="h-52 w-full my-4 rounded-2xl bg-neutral-950 flex flex-col items-center justify-center text-center p-4 border border-neutral-800 relative overflow-hidden">
                                <div className="text-6xl mb-2 select-none">🍔</div>
                                <h4 className="text-lg font-bold text-white">Smokey BBQ Beef Burger</h4>
                                <p className="text-xs text-neutral-400 mt-1 max-w-xs">Double patty, cheddar slice, caramelized onions & secret TR sauce</p>
                            </div>

                            <div className="flex items-center justify-between pt-2">
                                <div>
                                    <p className="text-xs text-neutral-400">Combo Special</p>
                                    <p className="text-xl font-extrabold text-amber-400">240 BDT</p>
                                </div>
                                <Link
                                    href="/menu"
                                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition"
                                >
                                    Order Now
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};