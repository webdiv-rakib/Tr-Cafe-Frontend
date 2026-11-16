/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { redirect } from 'next/navigation';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

type RegisterState = {
    success: boolean;
    statusCode: number;
    message: string;
    data?: {
        id: string;
        name: string;
        email: string;
        phone: string | null;
        role: string;
        createdAt: string;
        updatedAt: string;
    };
};

export const registerAction = async (prevState: RegisterState, formData: FormData) => {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const phone = formData.get('phone');

    const payload = {
        name,
        email,
        password,
        phone: phone || undefined, // Send undefined instead of empty string "" if optional
    };

    try {
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const result = await res.json();

        // if (result.success) {
        //     redirect('/login');
        // }

        return result;
    } catch (error: any) {
        // 👇 Let Next.js handle its own redirect error!
        if (isRedirectError(error)) {
            throw error;
        }

        return {
            success: false,
            statusCode: 500,
            message: error?.message || 'Failed to connect to the server. Please try again.',
        };
    }
};