/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { ChefHat, Plus, Flame, UtensilsCrossed } from 'lucide-react';

interface IMenuItem {
    id: string;
    name: string;
    price: number;
    description?: string | null;
    imageUrl?: string | null;
    isAvailable?: boolean;
    isSpecial?: boolean;
    category?: {
        id: string;
        name: string;
    } | null;
}

async function getFeaturedMenuItems(): Promise<IMenuItem[]> {
    try {
        const baseUrl =
            process.env.BACKEND_APP_URL || process.env.NEXT_PUBLIC_BACKEND_APP_URL;
        if (!baseUrl) return [];

        let res = await fetch(`${baseUrl}/api/menu-items`, {
            next: { tags: ['menu-items'], revalidate: 60 },
        });

        if (!res.ok) {
            res = await fetch(`${baseUrl}/api/menu`, {
                next: { tags: ['menu-items'], revalidate: 60 },
            });
        }

        if (!res.ok) return [];

        const result = await res.json();
        if (!result.success) return [];

        const items: IMenuItem[] = Array.isArray(result.data)
            ? result.data
            : result.data?.menuItems || result.data?.items || [];

        // Prioritize available items & Chef Specials first
        return [...items]
            .filter((item) => item.isAvailable !== false)
            .sort((a, b) => Number(Boolean(b.isSpecial)) - Number(Boolean(a.isSpecial)))
            .slice(0, 4);
    } catch (error) {
        console.error('Error fetching featured items:', error);
        return [];
    }
}

export const SpecialsSection = async () => {
    const featuredItems = await getFeaturedMenuItems();

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
                            Campus Favorites &amp; Specials
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
                {featuredItems.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-neutral-200/70 p-8 text-center">
                        <p className="text-sm font-bold text-neutral-900">No menu items available right now</p>
                        <p className="text-xs text-neutral-500 mt-1">
                            Check back shortly or browse our full campus menu.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {featuredItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-2xl border border-neutral-200/70 p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
                            >
                                <div>
                                    {/* Dish Image */}
                                    <div className="relative h-40 w-full rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200/60 mb-4">
                                        {item.imageUrl ? (
                                            <img
                                                src={item.imageUrl}
                                                alt={item.name}
                                                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="h-full w-full flex flex-col items-center justify-center text-neutral-400">
                                                <UtensilsCrossed className="w-7 h-7 mb-1 text-amber-500/70" />
                                                <span className="text-[10px] font-semibold uppercase tracking-wider">
                                                    TR Cafe
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex items-center justify-between gap-2 mb-3">
                                        <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
                                            {item.category?.name || 'Special'}
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">
                                            <Flame className="w-3 h-3" />
                                            {item.isSpecial ? 'Chef Special' : 'Popular'}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-neutral-900 group-hover:text-amber-600 transition text-base">
                                        {item.name}
                                    </h3>
                                    <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed line-clamp-2">
                                        {item.description || 'Freshly prepared at TR Cafe for DIU campus delivery.'}
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
                )}

            </div>
        </section>
    );
};