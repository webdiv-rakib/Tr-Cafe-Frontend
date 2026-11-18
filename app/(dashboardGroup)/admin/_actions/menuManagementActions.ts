'use server';

import { cookies } from 'next/headers';
import { revalidatePath, revalidateTag } from 'next/cache';

export interface ICategory {
    id: string;
    name: string;
    description?: string | null;
    _count?: {
        menuItems?: number;
    };
}

export interface IMenuItem {
    id: string;
    name: string;
    description?: string | null;
    price: number;
    imageUrl?: string | null;
    categoryId: string;
    isAvailable: boolean;
    isSpecial: boolean;
    category?: {
        id: string;
        name: string;
    };
}

const getAuthHeaders = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get('accessToken')?.value;
    return {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

// ==================== READ ====================

export const getCategoriesAction = async (): Promise<ICategory[]> => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/categories`, {
            headers,
            cache: 'no-store',
        });

        const result = await res.json();
        if (!res.ok || !result.success) return [];

        return Array.isArray(result.data)
            ? result.data
            : result.data?.categories || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export const getAdminMenuItemsAction = async (): Promise<IMenuItem[]> => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/menu-items`, {
            headers,
            cache: 'no-store',
        });

        if (res.ok) {
            const result = await res.json();
            if (result.success) {
                return Array.isArray(result.data)
                    ? result.data
                    : result.data?.menuItems || result.data?.items || [];
            }
        }

        // Fallback to /api/menu if that is your primary GET route
        const fallbackRes = await fetch(`${process.env.BACKEND_APP_URL}/api/menu`, {
            headers,
            cache: 'no-store',
        });
        const fallbackResult = await fallbackRes.json();
        if (!fallbackResult.success) return [];

        return Array.isArray(fallbackResult.data)
            ? fallbackResult.data
            : fallbackResult.data?.menuItems || fallbackResult.data?.items || [];
    } catch (error) {
        console.error('Error fetching admin menu items:', error);
        return [];
    }
};

// ==================== CATEGORY CRUD ====================

export const createCategoryAction = async (payload: {
    name: string;
    description?: string;
}) => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/categories`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
        });

        const result = await res.json();
        if (!res.ok || !result.success) {
            return {
                success: false,
                message: result.message || 'Failed to create category.',
            };
        }

        revalidatePath('/dashboard/admin/menu');
        revalidateTag('menu-items', 'max');

        return {
            success: true,
            message: result.message || 'Category created successfully.',
            data: result.data,
        };
    } catch (error) {
        console.error('Error creating category:', error);
        return { success: false, message: 'Network error creating category.' };
    }
};

export const updateCategoryAction = async (
    categoryId: string,
    payload: { name: string; description?: string }
) => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(
            `${process.env.BACKEND_APP_URL}/api/categories/${categoryId}`,
            {
                method: 'PATCH',
                headers,
                body: JSON.stringify(payload),
            }
        );

        const result = await res.json();
        if (!res.ok || !result.success) {
            return {
                success: false,
                message: result.message || 'Failed to update category.',
            };
        }

        revalidatePath('/dashboard/admin/menu');
        revalidateTag('menu-items', 'max');

        return {
            success: true,
            message: result.message || 'Category updated successfully.',
        };
    } catch (error) {
        console.error('Error updating category:', error);
        return { success: false, message: 'Network error updating category.' };
    }
};

export const deleteCategoryAction = async (categoryId: string) => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(
            `${process.env.BACKEND_APP_URL}/api/categories/${categoryId}`,
            {
                method: 'DELETE',
                headers,
            }
        );

        const result = await res.json();
        if (!res.ok || !result.success) {
            return {
                success: false,
                message: result.message || 'Failed to delete category.',
            };
        }

        revalidatePath('/dashboard/admin/menu');
        revalidateTag('menu-items', 'max');

        return {
            success: true,
            message: result.message || 'Category deleted.',
        };
    } catch (error) {
        console.error('Error deleting category:', error);
        return { success: false, message: 'Network error deleting category.' };
    }
};

// ==================== MENU ITEM CRUD ====================

export interface MenuItemPayload {
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    categoryId: string;
    isAvailable?: boolean;
    isSpecial?: boolean;
}

export const createMenuItemAction = async (payload: MenuItemPayload) => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/menu-items`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload),
        });

        const result = await res.json();
        if (!res.ok || !result.success) {
            return {
                success: false,
                message: result.message || 'Failed to create menu item.',
            };
        }

        revalidatePath('/dashboard/admin/menu');
        revalidatePath('/menu');
        revalidateTag('menu-items', 'max');

        return {
            success: true,
            message: result.message || 'Menu item created successfully.',
            data: result.data,
        };
    } catch (error) {
        console.error('Error creating menu item:', error);
        return { success: false, message: 'Network error creating menu item.' };
    }
};

export const updateMenuItemAction = async (
    menuItemId: string,
    payload: Partial<MenuItemPayload>
) => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(
            `${process.env.BACKEND_APP_URL}/api/menu-items/${menuItemId}`,
            {
                method: 'PATCH',
                headers,
                body: JSON.stringify(payload),
            }
        );

        const result = await res.json();
        if (!res.ok || !result.success) {
            return {
                success: false,
                message: result.message || 'Failed to update menu item.',
            };
        }

        revalidatePath('/dashboard/admin/menu');
        revalidatePath('/menu');
        revalidateTag('menu-items', 'max');

        return {
            success: true,
            message: result.message || 'Menu item updated successfully.',
        };
    } catch (error) {
        console.error('Error updating menu item:', error);
        return { success: false, message: 'Network error updating menu item.' };
    }
};

export const deleteMenuItemAction = async (menuItemId: string) => {
    try {
        const headers = await getAuthHeaders();
        const res = await fetch(
            `${process.env.BACKEND_APP_URL}/api/menu-items/${menuItemId}`,
            {
                method: 'DELETE',
                headers,
            }
        );

        const result = await res.json();
        if (!res.ok || !result.success) {
            return {
                success: false,
                message: result.message || 'Failed to delete menu item.',
            };
        }

        revalidatePath('/dashboard/admin/menu');
        revalidatePath('/menu');
        revalidateTag('menu-items', 'max');

        return {
            success: true,
            message: result.message || 'Menu item deleted.',
        };
    } catch (error) {
        console.error('Error deleting menu item:', error);
        return { success: false, message: 'Network error deleting menu item.' };
    }
};

export const toggleAdminMenuFlagAction = async (
    menuItemId: string,
    flagType: 'availability' | 'special',
    isAvailable?: boolean
) => {
    try {
        const headers = await getAuthHeaders();
        const endpoint =
            flagType === 'special'
                ? `${process.env.BACKEND_APP_URL}/api/menu-items/${menuItemId}/toggle-special`
                : `${process.env.BACKEND_APP_URL}/api/menu-items/${menuItemId}/availability`;

        const res = await fetch(endpoint, {
            method: 'PATCH',
            headers,
            ...(flagType === 'availability'
                ? { body: JSON.stringify({ isAvailable }) }
                : {}),
        });

        const result = await res.json();
        if (!res.ok || !result.success) {
            return {
                success: false,
                message: result.message || 'Failed to toggle item status.',
            };
        }

        revalidatePath('/dashboard/admin/menu');
        revalidatePath('/menu');
        revalidateTag('menu-items', 'max');

        return { success: true, message: 'Updated.' };
    } catch (error) {
        console.error('Error toggling menu flag:', error);
        return { success: false, message: 'Network error updating flag.' };
    }
};