/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
export interface RegisterState {
    success: boolean
    statusCode?: number,
    message?: string,
    data?: any
}

export const registerAction = async (formData: FormData) => {
    console.log(formData);
    const name = formData.get("name")
    const email = formData.get("email");
    const password = formData.get("password");
    const phone = formData.get("phone")
    const payload = {
        name,
        email,
        password,
        phone
    }
    try {
        const res = await fetch(`${process.env.BACKEND_APP_URL}/api/auth/register`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(payload)

        })
        const result = await res.json()
        return result
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error?.message || 'Failed to connect to the server. Please try again.'
        }
    }
}