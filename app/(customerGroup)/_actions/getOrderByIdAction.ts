'use server'
import { cookies } from "next/headers";
import { getMyOrdersAction, IOrder } from "./orderAction";

export const getOrderDetailsForReceiptAction = async (
    orderId: string
): Promise<IOrder | null> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('accessToken')?.value;
        if (!token || !orderId) return null;

        // Try single-order endpoint first, fallback to filtering my-orders
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/order/${orderId}`, {
            headers: { Authorization: `Bearer ${token}` },
            cache: 'no-store',
        });

        if (res.ok) {
            const result = await res.json();
            if (result.success && result.data) {
                return result.data;
            }
        }

        const myOrders = await getMyOrdersAction();
        return myOrders.find((o) => o.id === orderId) || null;
    } catch (error) {
        console.error('Error fetching order receipt details:', error);
        return null;
    }
};