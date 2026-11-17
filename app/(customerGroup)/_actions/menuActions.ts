'use server';

export interface ICategory {
    id: string;
    name: string;
    description?: string | null;
    image?: string | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface IMenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string | null;
    categoryId: string;
    category?: {
        id: string;
        name: string;
    };
    isAvailable: boolean;
    isSpecial: boolean;
    prepTime?: string;
    createdAt?: string;
    updatedAt?: string;
}

export const getAllCategories = async (): Promise<ICategory[]> => {
    try {
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/categoris`, {
            next: {
                revalidate: 3600,
                tags: ['categories'],
            },
        });

        const result = await res.json();
        if (!result.success) return [];

        // Handles both { data: [...] } and { data: { categories: [...] } }
        return Array.isArray(result.data)
            ? result.data
            : result.data?.categories || [];
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};

export const getAllMenuItems = async (): Promise<IMenuItem[]> => {
    try {
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/menu-items`, {
            next: {
                revalidate: 300,
                tags: ['menu-items'],
            },
        });

        const result = await res.json();
        if (!result.success) return [];

        // Handles both { data: [...] } and { data: { menuItems: [...] } }
        return Array.isArray(result.data)
            ? result.data
            : result.data?.menuItems || result.data?.items || [];
    } catch (error) {
        console.error('Error fetching menu items:', error);
        return [];
    }
};