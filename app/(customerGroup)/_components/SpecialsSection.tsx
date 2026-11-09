import React from 'react';
import Link from 'next/link';
import { ChefHat, Plus, Flame } from 'lucide-react';

const FEATURED_ITEMS = [
    {
        id: '1',
        name: 'TR Monster Beef Burger',
        category: 'Burgers',
        price: 260,
        desc: 'Double grilled beef patty, melted cheddar, crisp lettuce, spicy garlic mayo.',
        tag: 'Best Seller',
        isSpecial: true,
    },
    {
        id: '2',
        name: 'Crispy Peri-Peri Wings (6 Pcs)',
        category: 'Chicken',
        price: 180,
        desc: 'Deep fried crispy chicken wings tossed in fiery peri-peri glaze.',
        tag: 'Chef Special',
        isSpecial: true,
    },
    {
        id: '3',
        name: 'Loaded Cheesy Fries',
        category: 'Sides',
        price: 140,
        desc: 'Crispy skin-on french fries smothered in warm cheese sauce & smoked herbs.',
        tag: 'Popular',
        isSpecial: false,
    },
    {
        id: '4',
        name: 'TR Iced Choco Frappe',
        category: 'Beverages',
        price: 120,
        desc: 'Rich dark espresso blended with creamy chocolate and fresh milk froth.',
        tag: 'Cool Down',
        isSpecial: false,
    },
];

export const SpecialsSection = () => {
    return (
        <section className="py-16 bg-neutral-50 border-y border-neutral-200/80">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-amber-600 font-semibold text-xs tracking-wider uppercase mb-1">
                            <ChefHat className="w-4 h-4" />
                            <span>Kitchen Specials</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900">
                            Campus Favorites & Specials
                        </h2>
                    </div>
                    <Link
                        href="/menu"
                        className="text-sm font-semibold text-amber-600 hover:text-amber-700 transition"
                    >
                        View Complete Menu &rarr;
                    </Link>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {FEATURED_ITEMS.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-2xl border border-neutral-200/70 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                        >
                            <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
                                        {item.category}
                                    </span>
                                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                                        <Flame className="w-3 h-3" />
                                        {item.tag}
                                    </span>
                                </div>

                                <h3 className="font-bold text-neutral-900 group-hover:text-amber-600 transition text-base">
                                    {item.name}
                                </h3>
                                <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed line-clamp-2">
                                    {item.desc}
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-5 mt-4 border-t border-neutral-100">
                                <div>
                                    <span className="text-xs text-neutral-400">Price</span>
                                    <p className="text-base font-extrabold text-neutral-900">
                                        {item.price} <span className="text-xs font-semibold text-neutral-500">BDT</span>
                                    </p>
                                </div>
                                <Link
                                    href="/menu"
                                    className="h-9 w-9 rounded-xl bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center transition active:scale-95 shadow-sm cursor-pointer"
                                    title="View Menu"
                                >
                                    <Plus className="w-4 h-4" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};