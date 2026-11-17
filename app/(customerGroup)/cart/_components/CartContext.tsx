'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export interface CartItem {
    menuItemId: string;
    name: string;
    price: number;
    imageUrl?: string | null;
    categoryName?: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    totalItems: number;
    subtotal: number;
    deliveryFee: number;
    grandTotal: number;
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    updateQuantity: (menuItemId: string, delta: number) => void;
    removeItem: (menuItemId: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'tr_cafe_cart_v1';

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    // Load saved cart on mount
    // useEffect(() => {
    //     try {
    //         const saved = localStorage.getItem(CART_STORAGE_KEY);
    //         if (saved) {
    //             setItems(JSON.parse(saved));
    //         }
    //     } catch (error) {
    //         console.error('Failed to read cart from localStorage:', error);
    //     } finally {
    //         setIsHydrated(true);
    //     }
    // }, []);

    // Sync cart to localStorage on change
    useEffect(() => {
        if (!isHydrated) return;
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error);
        }
    }, [items, isHydrated]);

    const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
        setItems((prev) => {
            const existing = prev.find((i) => i.menuItemId === newItem.menuItemId);
            if (existing) {
                return prev.map((i) =>
                    i.menuItemId === newItem.menuItemId
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                );
            }
            return [...prev, { ...newItem, quantity: 1 }];
        });
    };

    const updateQuantity = (menuItemId: string, delta: number) => {
        setItems((prev) =>
            prev
                .map((i) =>
                    i.menuItemId === menuItemId
                        ? { ...i, quantity: i.quantity + delta }
                        : i
                )
                .filter((i) => i.quantity > 0)
        );
    };

    const removeItem = (menuItemId: string) => {
        setItems((prev) => prev.filter((i) => i.menuItemId !== menuItemId));
    };

    const clearCart = () => {
        setItems([]);
        localStorage.removeItem(CART_STORAGE_KEY);
    };

    const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const deliveryFee = items.length > 0 ? 20 : 0;
    const grandTotal = subtotal + deliveryFee;

    return (
        <CartContext.Provider
            value={{
                items,
                totalItems,
                subtotal,
                deliveryFee,
                grandTotal,
                addItem,
                updateQuantity,
                removeItem,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};