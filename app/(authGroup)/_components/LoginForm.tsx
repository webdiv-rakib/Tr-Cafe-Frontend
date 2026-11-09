import React from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { loginAction } from '../_actions/loginAction'; // adjust path to where your action is

const LoginForm = () => {
  return (
    <form action={loginAction} className="space-y-4">
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

      {/* Password Input */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors"
          >
            Forgot password?
          </Link>
        </div>
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

      {/* Remember Me */}
      <div className="flex items-center">
        <input
          id="remember-me"
          name="rememberMe"           
          type="checkbox"
          className="h-4 w-4 rounded border-neutral-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
        />
        <label
          htmlFor="remember-me"
          className="ml-2 block text-xs font-medium text-neutral-600 cursor-pointer"
        >
          Keep me logged in on this device
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-2 py-2.5 px-4 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-medium text-sm rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 group cursor-pointer"
      >
        <span>Sign In</span>
        <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Footer Register Prompt */}
      <p className="text-center text-xs text-neutral-500 pt-2">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-semibold text-neutral-900 hover:text-amber-600 transition-colors underline underline-offset-4"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;