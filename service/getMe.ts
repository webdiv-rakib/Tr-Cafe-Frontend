/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { cookies } from 'next/headers';

export const getMe = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    if (!accessToken) {
        return {
            success: false,
            message: 'User Not Logged In',
        };
    }

    try {
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/auth/profile`, {
            headers: {
                // Authorization: `Bearer ${accessToken}`,
                Cookie: `accessToken=${accessToken}`,
            },
            next: {
                revalidate: 60 * 60 * 24,
                tags: ['my-profile'],
            },
        });

        const result = await res.json();
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: 'Failed to fetch user profile',
        };
    }
};