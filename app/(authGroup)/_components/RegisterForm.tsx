'use client'
import Link from 'next/link';
import { User, Mail, Phone, Lock, ArrowRight } from 'lucide-react';

const RegisterForm = () => {
    return (
        <form className="space-y-4">
            {/* Full Name Input */}
            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Full Name
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <User className="h-4 w-4" />
                    </div>
                    <input
                        name="name"
                        type="text"
                        required
                        placeholder="e.g. Afraj"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-50/50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-neutral-900 placeholder:text-neutral-400"
                    />
                </div>
            </div>

            {/* Email Input */}
            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Email Address
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <Mail className="h-4 w-4" />
                    </div>
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="student@diu.edu.bd"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-50/50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-neutral-900 placeholder:text-neutral-400"
                    />
                </div>
            </div>

            {/* Phone Number Input (Useful for DIU Hall Gate Delivery) */}
            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Phone Number
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <Phone className="h-4 w-4" />
                    </div>
                    <input
                        name="phone"
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-50/50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-neutral-900 placeholder:text-neutral-400"
                    />
                </div>
            </div>

            {/* Password Input */}
            <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-1.5">
                    Password
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                        <Lock className="h-4 w-4" />
                    </div>
                    <input
                        name="password"
                        type="password"
                        required
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-neutral-50/50 border border-neutral-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-neutral-900 placeholder:text-neutral-400"
                    />
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full mt-2 py-2.5 px-4 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-medium text-sm rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
                <span>Create Account</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Footer Login Prompt */}
            <p className="text-center text-xs text-neutral-500 pt-2">
                Already have an account?{' '}
                <Link
                    href="/login"
                    className="font-semibold text-neutral-900 hover:text-amber-600 transition-colors underline underline-offset-4"
                >
                    Sign in
                </Link>
            </p>
        </form>
    );
};

export default RegisterForm;