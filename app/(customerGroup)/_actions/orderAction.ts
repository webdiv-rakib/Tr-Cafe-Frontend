'use server';

import { cookies } from 'next/headers';
import { revalidateTag } from 'next/cache';

export type PaymentMethodType = 'COD' | 'SSLCOMMERZ' | 'STRIPE';
export type DeliveryZoneType = 'DIU_PERMANENT_CAMPUS' | 'OUTSIDE_CAMPUS';

export interface CreateOrderPayload {
    deliveryAddress: string;
    contactPhone: string;
    orderNotes?: string;
    deliveryZone: DeliveryZoneType;
    paymentMethod: PaymentMethodType;
    items: {
        menuItemId: string;
        quantity: number;
    }[];
}

export interface CreateOrderResponse {
    success: boolean;
    message: string;
    orderId?: string;
    paymentUrl?: string | null;
}
export interface IOrderItem {
    id: string;
    orderId: string;
    menuItemId: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    menuItem: {
        id: string;
        name: string;
        imageUrl?: string | null;
    };
}
export interface IOrder {
    id: string;
    userId: string;
    riderId?: string | null;
    status: 'PENDING' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
    totalAmount: number;
    deliveryZone: 'DIU_PERMANENT_CAMPUS' | 'OUTSIDE_CAMPUS' | string;
    deliveryAddress: string;
    contactPhone: string;
    orderNotes?: string | null;
    createdAt: string;
    updatedAt: string;
    items: IOrderItem[];
    rider?: {
        id: string;
        name: string;
        phone?: string | null;
    } | null;
    payment?: {
        id: string;
        status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
        provider: 'COD' | 'SSLCOMMERZ' | 'STRIPE' | string;
        amount: string | number;
        transactionId?: string | null;
    } | null;
}

const getAuthHeader = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createOrderAction = async (
    payload: CreateOrderPayload
): Promise<CreateOrderResponse> => {
    try {
        const authHeaders = await getAuthHeader();

        if (!authHeaders.Authorization) {
            return {
                success: false,
                message: 'Please log in to your TR Cafe account before placing an order.',
            };
        }

        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...authHeaders,
            },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
            return {
                success: false,
                message: result.message || 'Failed to place your order. Please try again.',
            };
        }

        revalidateTag('my-orders', 'max');
        revalidateTag('all-orders', 'max');

        const orderData = result.data?.order || result.data;
        const paymentUrl =
            result.data?.paymentUrl ||
            result.data?.gatewayUrl ||
            result.data?.GatewayPageURL ||
            result.data?.url ||
            null;

        return {
            success: true,
            message: result.message || 'Order placed successfully!',
            orderId: orderData?.id,
            paymentUrl,
        };
    } catch (error) {
        console.error('Error in createOrderAction:', error);
        return {
            success: false,
            message: 'Network error while connecting to TR Cafe server.',
        };
    }
};

export const getMyOrdersAction = async (): Promise<IOrder[]> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('accessToken')?.value;

        if (!token) return [];

        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/order/my-orders`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            next: {
                revalidate: 60,
                tags: ['my-orders'],
            },
        });

        const result = await res.json();
        if (!result.success) return [];

        return Array.isArray(result.data) ? result.data : [];
    } catch (error) {
        console.error('Error fetching my orders:', error);
        return [];
    }
};

export const cancelOrderAction = async (orderId: string) => {
    try {
        const authHeaders = await getAuthHeader();
        if (!authHeaders.Authorization) {
            return { success: false, message: 'Unauthorized request.' };
        }

        const res = await fetch(
            `${process.env.BACKEND_APP_URL}/api/order/${orderId}/status`,
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    ...authHeaders,
                },
                body: JSON.stringify({ status: 'CANCELLED' }),
            }
        );

        const result = await res.json();

        if (!res.ok || !result.success) {
            return {
                success: false,
                message: result.message || 'Unable to cancel this order.',
            };
        }

        revalidateTag('my-orders', 'max');
        revalidateTag('all-orders', 'max');

        return {
            success: true,
            message: result.message || 'Order cancelled successfully.',
        };
    } catch (error) {
        console.error('Error cancelling order:', error);
        return {
            success: false,
            message: 'Network error while cancelling order.',
        };
    }
};