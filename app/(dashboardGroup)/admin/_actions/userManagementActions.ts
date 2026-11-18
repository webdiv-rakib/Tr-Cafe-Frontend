'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export type UserRoleType = 'CUSTOMER' | 'STAFF' | 'RIDER' | 'ADMIN';
export type UserStatusType = 'ACTIVE' | 'BANNED';

export interface IManagedUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: UserRoleType;
  isActive: UserStatusType;
  createdAt?: string;
}

const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const getAllUsersAction = async (): Promise<IManagedUser[]> => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/auth/users`, {
      headers,
      cache: 'no-store',
    });

    const result = await res.json();
    if (!res.ok || !result.success) return [];

    const rawUsers = Array.isArray(result.data)
      ? result.data
      : result.data?.users || [];

    return rawUsers.map((u: IManagedUser) => ({
      ...u,
      isActive: u.isActive || 'ACTIVE',
    }));
  } catch (error) {
    console.error('Error fetching all users:', error);
    return [];
  }
};

export const updateUserRoleAction = async (
  userId: string,
  role: UserRoleType
) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(
      `${process.env.BACKEND_APP_URL}/api/user/${userId}/role`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ role }),
      }
    );

    const result = await res.json();
    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || 'Failed to update user role.',
      };
    }

    revalidatePath('/dashboard/admin/users');
    revalidatePath('/dashboard/admin');

    return {
      success: true,
      message: result.message || `Role updated to ${role}.`,
    };
  } catch (error) {
    console.error('Error updating user role:', error);
    return {
      success: false,
      message: 'Network error while updating user role.',
    };
  }
};

export const updateUserStatusAction = async (
  userId: string,
  isActive: UserStatusType
) => {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(
      `${process.env.BACKEND_APP_URL}/api/user/${userId}/status`,
      {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ isActive }),
      }
    );

    const result = await res.json();
    if (!res.ok || !result.success) {
      return {
        success: false,
        message: result.message || 'Failed to update account status.',
      };
    }

    revalidatePath('/dashboard/admin/users');
    revalidatePath('/dashboard/admin');

    return {
      success: true,
      message:
        result.message ||
        (isActive === 'BANNED'
          ? 'User account suspended.'
          : 'User account reactivated.'),
    };
  } catch (error) {
    console.error('Error updating user status:', error);
    return {
      success: false,
      message: 'Network error while updating account status.',
    };
  }
};