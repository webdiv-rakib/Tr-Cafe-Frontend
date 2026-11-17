'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

const getAuthHeaders = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

export interface IRiderOrder {
    id: string;
    status: 'PENDING' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
    totalAmount: number;
    deliveryAddress: string;
    contactPhone: string;
    orderNotes?: string | null;
    createdAt: string;
    updatedAt: string;
    user?: {
        id: string;
        name: string;
        phone?: string | null;
    } | null;
    payment?: {
        status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
        provider: 'COD' | 'SSLCOMMERZ' | 'STRIPE' | string;
    } | null;
    items: {
        id: string;
        quantity: number;
        unitPrice: number;
        menuItem: {
            id: string;
            name: string;
        };
    }[];
}

export const getRiderAssignedOrdersAction = async (): Promise<IRiderOrder[]> => {
    try {
        const headers = await getAuthHeaders();
        // Uses GET /api/order/my-deliveries (falls back to GET /api/order if your router scopes by riderId automatically)
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/order/assigned-deliveries`, {
            headers,
            cache: 'no-store',
        });

        if (res.ok) {
            const result = await res.json();
            if (result.success) {
                return Array.isArray(result.data)
                    ? result.data
                    : result.data?.orders || [];
            }
        }

        // Fallback to general /api/order if backend filters by req.user.role === 'RIDER'
        const fallbackRes = await fetch(`${process.env.BACKEND_APP_URL}/api/order`, {
            headers,
            cache: 'no-store',
        });

        const fallbackResult = await fallbackRes.json();
        if (!fallbackResult.success) return [];

        return Array.isArray(fallbackResult.data)
            ? fallbackResult.data
            : fallbackResult.data?.orders || [];
    } catch (error) {
        console.error('Error fetching rider assigned deliveries:', error);
        return [];
    }
};

export const markOrderDeliveredAction = async (orderId: string) => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(
            `${process.env.BACKEND_APP_URL}/api/order/${orderId}/status`,
            {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ status: 'DELIVERED' }),
            }
        );

        const result = await res.json();
        if (!res.ok || !result.success) {
            return {
                success: false,
                message: result.message || 'Failed to mark order as delivered.',
            };
        }

        revalidateTag('my-orders', 'max');
        revalidateTag('all-orders', 'max');

        return {
            success: true,
            message: result.message || 'Order marked as delivered!',
        };
    } catch (error) {
        console.error('Error marking order delivered:', error);
        return {
            success: false,
            message: 'Network error while updating delivery status.',
        };
    }
};