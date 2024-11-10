import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/core/SubmitBtn";

export default function Login({
    searchParams,
}: {
    searchParams: { message: string };
}) {
    const signIn = async (formData: FormData) => {
        "use server";

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const supabase = createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.log(error)
            return redirect("/login?message=Não conseguimos encontrar esse usuário");
        }

        return redirect("/");
    };

    const signUp = async (formData: FormData) => {
        "use server";

        const origin = (await headers()).get("origin");
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const supabase = createClient();
        // console.log(origin);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${origin}/auth/callback`,
            },
        });

        if (error) {
            console.log(error)
            return redirect("/login?message=Não conseguimos encontrar esse usuário");
        }

        return redirect(
            "/login?message=Verique seu email para confirmar sua conta",
        );
    };

    return (
        <div className="flex w-full min-h-lvh justify-center items-center">
            <div className=" flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
                {/* <Link
                    href="/"
                    className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                    >
                        <polyline points="15 18 9 12 15 6" />
                    </svg>{" "}
                    Back
                </Link> */}
                <form
                    className={`
                        flex-1 flex flex-col w-full justify-center gap-2 
                        text-foreground 
                        p-8
                        bg-woodsmoke-800 rounded-3xl overflow-hidden
                    `}
                >
                    <legend className={`text-xl font-bold text-center mb-8`}>Faça login ou cadastre-se</legend>

                    <label className="text-sm" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-xl px-4 py-2 bg-woodsmoke-700 border-2 border-transparent focus:border-woodsmoke-600 transition-all duration-300 outline-none mb-6"
                        name="email"
                        placeholder="luiZinho@example.com"
                        required
                    />
                    <label className="text-sm" htmlFor="password">
                        Senha
                    </label>
                    <input
                        className="rounded-xl px-4 py-2 bg-inherit border-2 border-woodsmoke-600/50 focus:border-woodsmoke-600 transition-all duration-300 outline-none mb-6"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                    />
                    <SubmitButton
                        formAction={signIn}
                        className="bg-main-600 rounded-xl  px-4 py-2 text-woodsmoke-800 font-bold mb-2"
                        pendingText="Logando..."
                    >
                        Login
                    </SubmitButton>
                    <SubmitButton
                        formAction={signUp}
                        className="rounded-xl border-2 border-main-600 px-4 py-2 text-foreground font-bold mb-2"
                        pendingText="Cadastrando..."
                    >
                        Cadastrar
                    </SubmitButton>
                    <Link href="/reset/password" className="text-center text-sm text-woodsmoke-400">Esqueci minha senha</Link>
                    {searchParams?.message && (
                        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                            {searchParams.message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
