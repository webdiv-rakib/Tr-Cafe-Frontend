'use server';

import { cookies } from 'next/headers';

export interface IAdminOrder {
  id: string;
  status: 'PENDING' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';
  totalAmount: number;
  deliveryAddress: string;
  deliveryZone: string;
  contactPhone: string;
  createdAt: string;
  user?: {
    id: string;
    name: string;
    email?: string;
  } | null;
  rider?: {
    id: string;
    name: string;
  } | null;
  payment?: {
    status: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
    provider: 'COD' | 'SSLCOMMERZ' | 'STRIPE' | string;
  } | null;
  items: {
    id: string;
    quantity: number;
    unitPrice: number;
    menuItem?: {
      id: string;
      name: string;
    };
  }[];
}

export interface IAdminUser {
  id: string;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'STAFF' | 'RIDER' | 'ADMIN';
  isActive?: string;
}

export interface IAdminDashboardStats {
  totalRevenue: number;
  pendingRevenue: number;
  totalOrders: number;
  activeOrdersCount: number;
  deliveredOrdersCount: number;
  cancelledOrdersCount: number;
  totalUsers: number;
  ridersCount: number;
  totalMenuItems: number;
  inStockMenuItems: number;
  recentOrders: IAdminOrder[];
}

export const getAdminDashboardStatsAction = async (): Promise<IAdminDashboardStats> => {
  const emptyStats: IAdminDashboardStats = {
    totalRevenue: 0,
    pendingRevenue: 0,
    totalOrders: 0,
    activeOrdersCount: 0,
    deliveredOrdersCount: 0,
    cancelledOrdersCount: 0,
    totalUsers: 0,
    ridersCount: 0,
    totalMenuItems: 0,
    inStockMenuItems: 0,
    recentOrders: [],
  };

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    if (!token) return emptyStats;

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const [ordersRes, usersRes, menuRes] = await Promise.all([
      fetch(`${process.env.BACKEND_APP_URL}/api/order`, {
        headers,
        cache: 'no-store',
      }),
      fetch(`${process.env.BACKEND_APP_URL}/api/user`, {
        headers,
        cache: 'no-store',
      }),
      fetch(`${process.env.BACKEND_APP_URL}/api/menu`, {
        headers,
        cache: 'no-store',
      }),
    ]);

    const [ordersJson, usersJson, menuJson] = await Promise.all([
      ordersRes.ok ? ordersRes.json() : { success: false },
      usersRes.ok ? usersRes.json() : { success: false },
      menuRes.ok ? menuRes.json() : { success: false },
    ]);

    const orders: IAdminOrder[] = ordersJson.success
      ? Array.isArray(ordersJson.data)
        ? ordersJson.data
        : ordersJson.data?.orders || []
      : [];

    const users: IAdminUser[] = usersJson.success
      ? Array.isArray(usersJson.data)
        ? usersJson.data
        : usersJson.data?.users || []
      : [];

    const menuItems: { id: string; isAvailable?: boolean }[] = menuJson.success
      ? Array.isArray(menuJson.data)
        ? menuJson.data
        : menuJson.data?.menuItems || menuJson.data?.items || []
      : [];

    // Collected revenue: PAID online payments or DELIVERED COD orders
    const totalRevenue = orders.reduce((sum, order) => {
      if (order.status === 'CANCELLED') return sum;
      if (order.payment?.status === 'PAID' || order.status === 'DELIVERED') {
        return sum + Number(order.totalAmount || 0);
      }
      return sum;
    }, 0);

    // Uncollected active order value
    const pendingRevenue = orders.reduce((sum, order) => {
      if (
        ['PENDING', 'PREPARING', 'OUT_FOR_DELIVERY'].includes(order.status) &&
        order.payment?.status !== 'PAID'
      ) {
        return sum + Number(order.totalAmount || 0);
      }
      return sum;
    }, 0);

    const activeOrdersCount = orders.filter((o) =>
      ['PENDING', 'PREPARING', 'OUT_FOR_DELIVERY'].includes(o.status)
    ).length;

    const deliveredOrdersCount = orders.filter((o) => o.status === 'DELIVERED').length;
    const cancelledOrdersCount = orders.filter((o) => o.status === 'CANCELLED').length;

    const ridersCount = users.filter((u) => u.role === 'RIDER').length;
    const inStockMenuItems = menuItems.filter((m) => m.isAvailable !== false).length;

    return {
      totalRevenue,
      pendingRevenue,
      totalOrders: orders.length,
      activeOrdersCount,
      deliveredOrdersCount,
      cancelledOrdersCount,
      totalUsers: users.length,
      ridersCount,
      totalMenuItems: menuItems.length,
      inStockMenuItems,
      recentOrders: orders.slice(0, 8),
    };
  } catch (error) {
    console.error('Error loading admin dashboard stats:', error);
    return emptyStats;
  }
};