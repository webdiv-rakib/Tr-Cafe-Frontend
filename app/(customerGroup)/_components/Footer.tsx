import React from 'react';
import Link from 'next/link';
import { UtensilsCrossed, Bike, Heart } from 'lucide-react';

export const Footer = () => {
    return (
        <footer className="bg-neutral-900 text-neutral-400 text-xs border-t border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

                    {/* Brand */}
                    <div className="space-y-3 md:col-span-2">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                                <UtensilsCrossed className="w-4 h-4" />
                            </div>
                            <span className="text-lg font-bold text-white tracking-tight">TR Cafe</span>
                        </div>
                        <p className="max-w-sm text-neutral-400 leading-relaxed">
                            Fast food and speedy in-house delivery service serving students and staff across the Daffodil International University (DIU) campus.
                        </p>
                        <div className="inline-flex items-center gap-1.5 text-amber-400 font-medium">
                            <Bike className="w-4 h-4" /> Flat 20 BDT delivery fee across campus
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-neutral-200 text-sm mb-3">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/menu" className="hover:text-amber-400 transition">Our Menu</Link></li>
                            <li><Link href="/login" className="hover:text-amber-400 transition">Student / Staff Login</Link></li>
                            <li><Link href="/register" className="hover:text-amber-400 transition">Create Account</Link></li>
                        </ul>
                    </div>

                    {/* Service Hours */}
                    <div>
                        <h4 className="font-semibold text-neutral-200 text-sm mb-3">Service Hours</h4>
                        <ul className="space-y-1.5 text-neutral-400">
                            <li>Saturday – Thursday: <span className="text-neutral-200 font-medium">9:00 AM – 10:00 PM</span></li>
                            <li>Friday: <span className="text-neutral-200 font-medium">2:00 PM – 10:00 PM</span></li>
                            <li className="pt-2 text-amber-400 font-medium">Delivery: DIU Residence Halls & Campus</li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p>© 2026 TR Cafe. All rights reserved.</p>
                    {/* {new Date().getFullYear()} */}
                    <p className="flex items-center gap-1 text-neutral-500">
                        Crafted for DIU Campus
                    </p>
                </div>
            </div>
        </footer>
    );
};