"use client";

import { createClient } from "@/utils/supabase/client";

export default function ResetPassword() {
    const resetPassword = async (formData: FormData) => {
        "use server";

        const email = formData.get("email") as string;
        const supabase = createClient();

        const { error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) {
            console.log(error);
            return;
        }

        return;
    };

    return (
        <div className="flex w-full min-h-lvh justify-center items-center">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    resetPassword(new FormData(e.currentTarget));
                }}
                className="flex flex-col w-11/12 md:w-1/2"
            >
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="Email"
                    className="input"
                />
                <button type="submit" className="btn">
                    Resetar senha
                </button>
            </form>
        </div>
    );
}