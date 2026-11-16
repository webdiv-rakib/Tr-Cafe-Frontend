'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    UtensilsCrossed,
    ShoppingBag,
    Menu,
    X,
    Bike,
    User,
    LayoutDashboard,
    LogOut,
    ChevronDown,
    ShieldCheck,
} from 'lucide-react';

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Menu', href: '/menu' },
    { label: 'My Orders', href: '/orders' },
];
/**
 {
    "success": true,
    "statusCode": 200,
    "message": "User profile retrived successfully",
    "data": {
        "profile": {
            "id": "ad38df1f-0af5-4a92-8c48-8b285261ec43",
            "name": "Toymur",
            "email": "toymur@gmail.com",
            "phone": "01889966347",
            "image": "https://scontent.fdac5-1.fna.fbcdn.net/v/t39.30808-6/589533926_1275815664584997_5453308533796787298_n.jpg?stp=dst-jpg_tt6&cstp=mx1103x1111&ctp=s1103x1111&_nc_cat=105&_nc_map=urlgen_bucketless&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFuR3WJZ2yjITX6AL5hJyX-sL9u3zJ6ml-wv27fMnqaX5bX_xhAP67vG5zVwxmqd3kAkJ71hrARXPtmYb2hJru_&_nc_ohc=NEVzQiT6CkcQ7kNvwG9sDuE&_nc_oc=AdpzIi-pqpc2wJyxUZZauihESuaz9f3iks1ADj7LBvwbOiZyHckyvVbmpYzygO1tZdI&_nc_zt=23&_nc_ht=scontent.fdac5-1.fna&_nc_gid=8gsu98b75AkiB2q270iUkw&_nc_ss=7b2a8&oh=00_AQTvuiG8TI43s0LdKImcctu8rOH-yzje0tXgDRT4_eSHlw&oe=6AF4CD7D",
            "isActive": "ACTIVE",
            "role": "CUSTOMER",
            "createdAt": "2026-11-05T11:03:47.696Z",
            "updatedAt": "2026-11-07T11:43:14.748Z"
        }
    }
}
 */

type IUser = {
    success: boolean;
    statusCode: number;
    message: string;
    data: {
        profile: {
            id: string;
            name: string;
            email: string;
            phone: string;
            image: string;
            isActive: string;
            role: 'CUSTOMER' | 'RIDER' | 'STAFF' | 'ADMIN';
            createdAt: string;
            updatedAt: string;
        };
    };
}
type NavBarProps = {
    user: IUser | null;
};

export const Navbar = ({ user }: NavBarProps) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-40 w-full bg-neutral-900/95 backdrop-blur-md border-b border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Left: Brand Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="h-9 w-9 rounded-xl bg-amber-500 group-hover:bg-amber-400 text-white flex items-center justify-center shadow-md shadow-amber-500/20 transition-colors">
                            <UtensilsCrossed className="w-5 h-5" />
                        </div>
                        <div>
                            <span className="text-lg font-extrabold text-white tracking-tight block leading-none">
                                TR Cafe
                            </span>
                            <span className="text-[10px] font-semibold text-amber-400 flex items-center gap-1 mt-0.5">
                                <Bike className="w-2.5 h-2.5" /> DIU Delivery
                            </span>
                        </div>
                    </Link>

                    {/* Center: Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="px-4 py-2 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800/70 transition-all"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right: Cart + Auth Buttons + User Dropdown */}
                    <div className="flex items-center gap-3">
                        {/* Cart Button */}
                        <Link
                            href="/cart"
                            className="relative p-2.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/80 text-neutral-200 hover:text-amber-400 transition-colors"
                            title="View Cart"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span className="absolute -top-1.5 -right-1.5 h-4 min-w-[16px] px-1 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                                2
                            </span>
                        </Link>

                        {/* Sign In / Register Buttons */}
                        <div className="hidden lg:flex items-center gap-2">
                            <Link
                                href="/login"
                                className="px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/register"
                                className="px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-sm transition-colors"
                            >
                                Register
                            </Link>
                        </div>

                        {/* Integrated User Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 border border-neutral-700/80 transition-all cursor-pointer"
                            >
                                <div className="h-7 w-7 rounded-lg bg-amber-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                                    A
                                </div>
                                <div className="hidden sm:flex flex-col items-start text-left">
                                    <span className="text-xs font-semibold text-neutral-100 leading-none">
                                        {user?.data.profile.name}
                                    </span>
                                    <span className="text-[10px] font-medium text-amber-400 uppercase tracking-wider mt-0.5">
                                        {user?.data.profile.role}
                                    </span>
                                </div>
                                <ChevronDown
                                    className={`w-3.5 h-3.5 text-neutral-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-xl py-1.5 z-50">
                                    {/* User Info Header */}
                                    <div className="px-4 py-2.5 border-b border-neutral-800">
                                        <p className="text-xs font-bold text-white truncate">
                                            {user?.data.profile.name}
                                        </p>
                                        <p className="text-[11px] text-neutral-400 truncate mt-0.5">
                                            {user?.data.profile.email}
                                        </p>
                                        <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-semibold uppercase">
                                            <ShieldCheck className="w-3 h-3" /> {user?.data.profile.role}
                                        </span>
                                    </div>

                                    {/* Dropdown Options: Profile, Dashboard */}
                                    <div className="py-1 px-1.5 space-y-0.5">
                                        <Link
                                            href="/profile"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors"
                                        >
                                            <User className="w-4 h-4 text-neutral-400" />
                                            <span>Profile</span>
                                        </Link>

                                        <Link
                                            href="/dashboard"
                                            onClick={() => setDropdownOpen(false)}
                                            className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-neutral-300 hover:text-white hover:bg-neutral-800 rounded-xl transition-colors"
                                        >
                                            <LayoutDashboard className="w-4 h-4 text-amber-400" />
                                            <span>Dashboard</span>
                                        </Link>
                                    </div>

                                    {/* Dropdown Option: Logout */}
                                    <div className="border-t border-neutral-800 pt-1 px-1.5">
                                        <button
                                            type="button"
                                            onClick={() => setDropdownOpen(false)}
                                            className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Mobile Hamburger Button */}
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-xl text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                            aria-label="Toggle Menu"
                        >
                            {mobileMenuOpen ? (
                                <X className="w-5 h-5" />
                            ) : (
                                <Menu className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-neutral-900 border-t border-neutral-800 px-4 pt-3 pb-4 space-y-1.5">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-3.5 py-2.5 rounded-xl text-xs font-semibold text-neutral-300 hover:text-white hover:bg-neutral-800 transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="pt-3 mt-2 border-t border-neutral-800 grid grid-cols-2 gap-2">
                        <Link
                            href="/login"
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-2.5 text-center rounded-xl text-xs font-semibold bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            onClick={() => setMobileMenuOpen(false)}
                            className="py-2.5 text-center rounded-xl text-xs font-semibold bg-amber-500 text-white hover:bg-amber-600"
                        >
                            Register
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};