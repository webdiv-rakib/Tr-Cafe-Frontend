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

export interface IStaffOrder {
    id: string;
    status: 'PENDING' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
    totalAmount: number;
    deliveryAddress: string;
    contactPhone: string;
    orderNotes?: string | null;
    createdAt: string;
    user?: {
        id: string;
        name: string;
        email?: string;
        phone?: string | null;
    } | null;
    rider?: {
        id: string;
        name: string;
        phone?: string | null;
    } | null;
    payment?: {
        status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
        provider: string;
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

export interface IRiderOption {
    id: string;
    name: string;
    phone?: string | null;
}

export interface IStaffMenuItem {
    id: string;
    name: string;
    price: number;
    isAvailable: boolean;
    isSpecial: boolean;
    category?: {
        id: string;
        name: string;
    };
}

export const getAllOrdersForStaffAction = async (): Promise<IStaffOrder[]> => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/order`, {
            headers,
            cache: 'no-store',
        });

        const result = await res.json();
        if (!result.success) return [];

        return Array.isArray(result.data) ? result.data : result.data?.orders || [];
    } catch (error) {
        console.error('Error fetching all orders for staff:', error);
        return [];
    }
};

export const getAvailableRidersAction = async (): Promise<IRiderOption[]> => {
    try {
        const headers = await getAuthHeaders();
        // Fetches users; filters active RIDER role accounts safely even if backend ignores query param
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/auth/users?role=RIDER`, {
            headers,
            cache: 'no-store',
        });

        const result = await res.json();
        if (!result.success) return [];

        const users = Array.isArray(result.data) ? result.data : result.data?.users || [];
        return users.filter(
            (u: { role?: string; isActive?: string }) =>
                u.role === 'RIDER' && u.isActive !== 'BANNED'
        );
    } catch (error) {
        console.error('Error fetching riders:', error);
        return [];
    }
};

export const getStaffMenuItemsAction = async (): Promise<IStaffMenuItem[]> => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/menu-items`, {
            headers,
            cache: 'no-store',
        });

        const result = await res.json();
        if (!result.success) return [];

        return Array.isArray(result.data)
            ? result.data
            : result.data?.menuItems || result.data?.items || [];
    } catch (error) {
        console.error('Error fetching staff menu items:', error);
        return [];
    }
};

export const updateOrderStatusByStaffAction = async (
    orderId: string,
    status: 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED'
) => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(
            `${process.env.BACKEND_APP_URL}/api/order/${orderId}/status`,
            {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ status }),
            }
        );

        const result = await res.json();
        if (!res.ok || !result.success) {
            return { success: false, message: result.message || 'Failed to update order status.' };
        }

        revalidateTag('my-orders', 'max');
        revalidateTag('all-orders', 'max');

        return { success: true, message: result.message || 'Order status updated.' };
    } catch (error) {
        console.error('Error updating order status:', error);
        return { success: false, message: 'Network error updating order status.' };
    }
};

export const assignRiderAction = async (orderId: string, riderId: string) => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(
            `${process.env.BACKEND_APP_URL}/api/order/${orderId}/assign-rider`,
            {
                method: 'PATCH',
                headers,
                body: JSON.stringify({ riderId }),
            }
        );

        const result = await res.json();
        if (!res.ok || !result.success) {
            return { success: false, message: result.message || 'Failed to assign rider.' };
        }

        revalidateTag('my-orders', 'max');
        revalidateTag('all-orders', 'max');

        return { success: true, message: result.message || 'Rider dispatched!' };
    } catch (error) {
        console.error('Error assigning rider:', error);
        return { success: false, message: 'Network error dispatching rider.' };
    }
};

export const toggleMenuItemFlagAction = async (
    menuItemId: string,
    payload: { isAvailable?: boolean; isSpecial?: boolean }
) => {
    try {
        const headers = await getAuthHeaders();
        const isTogglingSpecial = typeof payload.isSpecial === 'boolean';

        const endpoint = isTogglingSpecial
            ? `${process.env.BACKEND_APP_URL}/api/menu-items/${menuItemId}/toggle-special`
            : `${process.env.BACKEND_APP_URL}/api/menu-items/${menuItemId}/availability`;

        const res = await fetch(endpoint, {
            method: 'PATCH',
            headers,
            ...(isTogglingSpecial ? {} : { body: JSON.stringify(payload) }),
        });

        const result = await res.json();
        if (!res.ok || !result.success) {
            return { success: false, message: result.message || 'Failed to update menu item.' };
        }

        revalidateTag('menu-items', 'max');

        return { success: true, message: 'Menu item updated.' };
    } catch (error) {
        console.error('Error updating menu item:', error);
        return { success: false, message: 'Network error updating menu item.' };
    }
};