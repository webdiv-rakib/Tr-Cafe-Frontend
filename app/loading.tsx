import React from 'react';
import { UtensilsCrossed } from 'lucide-react';

const GlobalLoading = () => {
    return (
        <div className="min-h-[80vh] bg-neutral-50 flex flex-col items-center justify-center px-4">
            <div className="flex flex-col items-center gap-4">
                {/* Animated Brand Pulse */}
                <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-amber-500/25 blur-xl animate-pulse" />
                    <div className="relative h-14 w-14 rounded-2xl bg-neutral-900 border border-neutral-800 text-amber-400 flex items-center justify-center shadow-lg">
                        <UtensilsCrossed className="w-7 h-7 animate-bounce" />
                    </div>
                </div>

                <div className="text-center space-y-1">
                    <p className="text-sm font-extrabold text-neutral-900 tracking-tight">
                        TR Cafe <span className="text-amber-600">• DIU Campus</span>
                    </p>
                    <p className="text-xs font-medium text-neutral-500">
                        Preparing your kitchen & order data...
                    </p>
                </div>

                {/* Sleek Indeterminate Progress Bar */}
                <div className="w-48 h-1.5 bg-neutral-200 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-amber-500 rounded-full animate-[pulse_1.2s_ease-in-out_infinite]" />
                </div>
            </div>
        </div>
    );
};

export default GlobalLoading;