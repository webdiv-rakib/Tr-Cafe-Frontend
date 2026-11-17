'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Search,
    Flame,
    Sparkles,
    Plus,
    Minus,
    ShoppingBag,
    Bike,
    UtensilsCrossed,
    Clock,
    SlidersHorizontal,
} from 'lucide-react';

const CATEGORIES = ['All', 'Burgers', 'Chicken', 'Sides', 'Combos', 'Beverages'];

const MENU_ITEMS = [
    {
        id: '1',
        name: 'TR Monster Beef Burger',
        category: 'Burgers',
        price: 260,
        description:
            'Double grilled beef patty, melted cheddar slice, crispy onion rings, and signature smoky TR sauce.',
        isSpecial: true,
        isAvailable: true,
        prepTime: '15 min',
        emoji: '🍔',
    },
    {
        id: '2',
        name: 'Smokey BBQ Chicken Burger',
        category: 'Burgers',
        price: 210,
        description:
            'Char-grilled chicken breast glazed with sweet & smoky BBQ sauce, fresh lettuce, and garlic mayo.',
        isSpecial: false,
        isAvailable: true,
        prepTime: '12 min',
        emoji: '🍔',
    },
    {
        id: '3',
        name: 'Crispy Peri-Peri Wings (6 Pcs)',
        category: 'Chicken',
        price: 180,
        description:
            'Crunchy golden fried chicken wings tossed in fiery house-made peri-peri chili glaze.',
        isSpecial: true,
        isAvailable: true,
        prepTime: '15 min',
        emoji: '🍗',
    },
    {
        id: '4',
        name: 'Spicy Nashville Chicken Strips',
        category: 'Chicken',
        price: 195,
        description:
            'Tender boneless chicken tenders coated in Nashville hot spice oil with creamy ranch dip.',
        isSpecial: false,
        isAvailable: true,
        prepTime: '12 min',
        emoji: '🍗',
    },
    {
        id: '5',
        name: 'Loaded Cheesy Fries',
        category: 'Sides',
        price: 140,
        description:
            'Crispy skin-on french fries smothered in warm cheddar cheese sauce, jalapenos, and herbs.',
        isSpecial: true,
        isAvailable: true,
        prepTime: '8 min',
        emoji: '🍟',
    },
    {
        id: '6',
        name: 'Garlic Butter Wedges',
        category: 'Sides',
        price: 110,
        description:
            'Seasoned potato wedges tossed in roasted garlic herb butter and served with spicy mayo.',
        isSpecial: false,
        isAvailable: true,
        prepTime: '8 min',
        emoji: '🥔',
    },
    {
        id: '7',
        name: 'DIU Student Feast Combo',
        category: 'Combos',
        price: 340,
        description:
            '1x Smokey BBQ Chicken Burger, 1x Regular Fries, 2x Crispy Wings, and 1x Chilled Drink.',
        isSpecial: true,
        isAvailable: true,
        prepTime: '18 min',
        emoji: '🍱',
    },
    {
        id: '8',
        name: 'TR Iced Choco Frappe',
        category: 'Beverages',
        price: 120,
        description:
            'Rich espresso blended with dark Belgian chocolate syrup, crushed ice, and whipped cream.',
        isSpecial: false,
        isAvailable: true,
        prepTime: '5 min',
        emoji: '🥤',
    },
    {
        id: '9',
        name: 'Mint Lemon Cooler',
        category: 'Beverages',
        price: 80,
        description:
            'Freshly squeezed lime juice muddled with garden mint leaves and chilled sparkling water.',
        isSpecial: false,
        isAvailable: false,
        prepTime: '5 min',
        emoji: '🍋',
    },
];

const MenuPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [specialsOnly, setSpecialsOnly] = useState(false);
    const [quantities, setQuantities] = useState<Record<string, number>>({
        '1': 2,
        '5': 1,
    });

    const handleAdd = (id: string) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    const handleRemove = (id: string) => {
        setQuantities((prev) => {
            const current = prev[id] || 0;
            if (current <= 1) {
                const updated = { ...prev };
                delete updated[id];
                return updated;
            }
            return { ...prev, [id]: current - 1 };
        });
    };

    const filteredItems = MENU_ITEMS.filter((item) => {
        const matchesCategory =
            selectedCategory === 'All' || item.category === selectedCategory;
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSpecial = !specialsOnly || item.isSpecial;
        return matchesCategory && matchesSearch && matchesSpecial;
    });

    const totalBagCount = Object.values(quantities).reduce((sum, q) => sum + q, 0);
    const totalBagAmount = Object.entries(quantities).reduce((sum, [id, qty]) => {
        const item = MENU_ITEMS.find((m) => m.id === id);
        return sum + (item ? item.price * qty : 0);
    }, 0);

    return (
        <main className="min-h-screen bg-neutral-50 py-8 px-4 sm:px-6 lg:px-8 pb-28">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Top Menu Hero Header */}
                <div className="bg-neutral-900 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden border border-neutral-800 shadow-sm">
                    <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
                                <UtensilsCrossed className="w-3.5 h-3.5" /> Freshly Prepared Menu
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                Explore TR Cafe Fast Food
                            </h1>
                            <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-xl">
                                Craving burgers, crispy peri-peri wings, or student combos? Add items to your bag for flat 20 BDT delivery straight to your DIU hall gate.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <div className="px-4 py-3 rounded-2xl bg-neutral-800/80 border border-neutral-700/80 text-xs">
                                <p className="text-neutral-400">Campus Delivery</p>
                                <p className="font-bold text-amber-400 flex items-center gap-1.5 mt-0.5">
                                    <Bike className="w-4 h-4" /> Flat 20 BDT • 20–30 min
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search & Filter Controls Bar */}
                <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-4 sm:p-5 space-y-4">
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                        {/* Search Input */}
                        <div className="relative flex-1 max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                                <Search className="w-4 h-4" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search burgers, wings, fries, combos..."
                                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all"
                            />
                        </div>

                        {/* Chef Specials Filter Toggle */}
                        <button
                            type="button"
                            onClick={() => setSpecialsOnly((prev) => !prev)}
                            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${specialsOnly
                                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                                    : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                                }`}
                        >
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Chef Specials Only</span>
                        </button>
                    </div>

                    {/* Category Pills */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 border-t border-neutral-100">
                        <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400 shrink-0 mr-1" />
                        {CATEGORIES.map((category) => {
                            const isActive = selectedCategory === category;
                            return (
                                <button
                                    key={category}
                                    type="button"
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${isActive
                                            ? 'bg-neutral-900 text-amber-400 shadow-2xs'
                                            : 'bg-neutral-100 hover:bg-neutral-200/70 text-neutral-600'
                                        }`}
                                >
                                    {category}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Menu Items Grid */}
                {filteredItems.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-neutral-200/80 p-12 text-center space-y-3">
                        <p className="text-base font-bold text-neutral-900">No matching items found</p>
                        <p className="text-xs text-neutral-500">
                            Try clearing your search filter or switching back to &quot;All&quot; categories.
                        </p>
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedCategory('All');
                                setSearchQuery('');
                                setSpecialsOnly(false);
                            }}
                            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-semibold cursor-pointer"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map((item) => {
                            const qty = quantities[item.id] || 0;

                            return (
                                <div
                                    key={item.id}
                                    className={`bg-white rounded-2xl border border-neutral-200/80 shadow-sm p-5 flex flex-col justify-between transition-all ${item.isAvailable
                                            ? 'hover:shadow-md hover:border-amber-300/80'
                                            : 'opacity-70'
                                        }`}
                                >
                                    <div>
                                        {/* Top Row: Category + Special / Stock Badges */}
                                        <div className="flex items-center justify-between gap-2 mb-3">
                                            <span className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
                                                {item.category}
                                            </span>

                                            <div className="flex items-center gap-1.5">
                                                {item.isSpecial && (
                                                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-700 text-[10px] font-bold">
                                                        <Flame className="w-3 h-3" /> Special
                                                    </span>
                                                )}
                                                {!item.isAvailable && (
                                                    <span className="px-2 py-0.5 rounded-full bg-red-50 border border-red-200 text-red-600 text-[10px] font-bold uppercase">
                                                        Sold Out
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Visual Food Display Box */}
                                        <div className="h-32 w-full rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center relative mb-4">
                                            <span className="text-5xl select-none">{item.emoji}</span>
                                            <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-white/90 border border-neutral-200/70 text-[10px] font-semibold text-neutral-600">
                                                <Clock className="w-2.5 h-2.5 text-amber-600" /> {item.prepTime}
                                            </span>
                                        </div>

                                        {/* Name & Description */}
                                        <h2 className="text-base font-bold text-neutral-900">
                                            {item.name}
                                        </h2>
                                        <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed line-clamp-2">
                                            {item.description}
                                        </p>
                                    </div>

                                    {/* Bottom Row: Price & Add-to-Cart Stepper */}
                                    <div className="flex items-center justify-between pt-4 mt-5 border-t border-neutral-100">
                                        <div>
                                            <span className="text-[11px] text-neutral-400 block">Price</span>
                                            <span className="text-lg font-extrabold text-neutral-900">
                                                {item.price}{' '}
                                                <span className="text-xs font-semibold text-neutral-500">BDT</span>
                                            </span>
                                        </div>

                                        {!item.isAvailable ? (
                                            <button
                                                type="button"
                                                disabled
                                                className="px-4 py-2 rounded-xl bg-neutral-100 text-neutral-400 text-xs font-semibold cursor-not-allowed"
                                            >
                                                Unavailable
                                            </button>
                                        ) : qty === 0 ? (
                                            <button
                                                type="button"
                                                onClick={() => handleAdd(item.id)}
                                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                                            >
                                                <Plus className="w-3.5 h-3.5" />
                                                <span>Add to Bag</span>
                                            </button>
                                        ) : (
                                            <div className="flex items-center bg-neutral-900 rounded-xl p-1 gap-1">
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemove(item.id)}
                                                    className="h-7 w-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center transition-colors cursor-pointer"
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="w-7 text-center text-xs font-extrabold text-amber-400">
                                                    {qty}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleAdd(item.id)}
                                                    className="h-7 w-7 rounded-lg bg-amber-500 hover:bg-amber-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Floating Sticky Cart Summary Bar */}
            {totalBagCount > 0 && (
                <div className="fixed bottom-4 inset-x-0 z-30 px-4">
                    <div className="max-w-3xl mx-auto bg-neutral-900 border border-neutral-800 text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-amber-500 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                                {totalBagCount}
                            </div>
                            <div>
                                <p className="text-xs text-neutral-400">Bag Subtotal (+20 BDT delivery)</p>
                                <p className="text-base font-extrabold text-white">
                                    {totalBagAmount} <span className="text-xs font-semibold text-amber-400">BDT</span>
                                </p>
                            </div>
                        </div>

                        <Link
                            href="/cart"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/20 transition-all"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span>View Cart</span>
                        </Link>
                    </div>
                </div>
            )}
        </main>
    );
};

export default MenuPage;