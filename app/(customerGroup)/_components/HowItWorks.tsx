import React from 'react';
import { ShoppingBag, ChefHat, Bike, CheckCircle2 } from 'lucide-react';

const STEPS = [
    {
        step: '01',
        icon: ShoppingBag,
        title: 'Choose Your Meal',
        desc: 'Browse items across burgers, wings, combos, and fresh drinks customized to your appetite.',
    },
    {
        step: '02',
        icon: ChefHat,
        title: 'Kitchen Prepares',
        desc: 'TR Cafe staff accepts and fires your food fresh upon order placement in real time.',
    },
    {
        step: '03',
        icon: Bike,
        title: 'Rider Dispatched',
        desc: 'An assigned campus rider carries your meal directly toward your designated hall or point.',
    },
    {
        step: '04',
        icon: CheckCircle2,
        title: 'Pick Up & Enjoy',
        desc: 'Pay cash upon delivery or pay online via bKash, Nagad, or cards, then grab your meal!',
    },
];

export const HowItWorks = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-2xl mx-auto mb-12">
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-600 mb-1">
                        Fast & Predictable
                    </p>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                        How Campus Delivery Works
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-500 mt-2">
                        Built specifically to solve student food delays in Daffodil International University.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {STEPS.map((s) => {
                        const Icon = s.icon;
                        return (
                            <div key={s.step} className="relative flex flex-col items-center text-center p-6 rounded-2xl bg-neutral-50 border border-neutral-100">
                                <span className="absolute top-4 right-4 text-xs font-extrabold text-neutral-300">
                                    {s.step}
                                </span>
                                <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center mb-4">
                                    <Icon className="w-5 h-5" />
                                </div>
                                <h3 className="font-bold text-neutral-900 text-sm">{s.title}</h3>
                                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{s.desc}</p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};