import React from 'react';
import RegisterForm from '../_components/RegisterForm';
import { UtensilsCrossed, Bike } from 'lucide-react';

const RegisterPage = () => {
    return (
        <main className="min-h-screen w-full flex items-center justify-center bg-neutral-50 p-4">
            {/* Container Card */}
            <div className="w-full max-w-md bg-white border border-neutral-200/80 rounded-2xl shadow-sm p-8 sm:p-10">

                {/* Header / Brand Badge */}
                <div className="flex flex-col items-center text-center mb-8">
                    <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-600 mb-3.5 shadow-sm">
                        <UtensilsCrossed className="h-6 w-6" />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-neutral-900">
                        Create Account
                    </h1>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-neutral-500 font-medium">
                        <span>TR Cafe</span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1 text-amber-600 font-semibold">
                            <Bike className="h-3 w-3" /> DIU Campus Delivery
                        </span>
                    </div>

                    <p className="mt-3 text-xs text-neutral-500 max-w-xs">
                        Join TR Cafe to order hot fast food straight to your residence hall with flat 20 BDT delivery.
                    </p>
                </div>

                {/* Form Body */}
                <RegisterForm />
            </div>
        </main>
    );
};

export default RegisterPage;