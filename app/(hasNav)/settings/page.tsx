import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Trash, LockKeyhole, LogOut, Mail } from "lucide-react";

export default async function Index() {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data } = await supabase
        .from("profiles")
        .select()
        .eq("id", user?.id)
        .single();

    // console.log(data);

    return (
        <div className="w-full mt-12 px-3 mx-auto max-w-body-content">
            <div className="flex-1 w-full flex flex-col gap-8">
                <h1 className="text-xl font-bold">Suas configurações</h1>
                <div className="flex flex-col gap-4 bg-woodsmoke-700 rounded-3xl px-6 py-4">
                    <div className="flex flex-col">
                        <div className="flex flex-col gap-2">
                            <span className="text-base">
                                Nome: {data?.full_name}
                            </span>
                            <span className="text-base">
                                Email: {user?.email}
                            </span>

                            <span className="text-base">
                                {user?.identities! && (
                                    <>
                                        Criado em:{" "}
                                        {new Date(
                                            user?.identities[0]!.created_at ??
                                                0,
                                        ).toLocaleDateString()}
                                    </>
                                )}
                            </span>
                        </div>
                    </div>

                </div>
                <div className="w-full flex flex-col divide-y divide-woodsmoke-600">
                    <Link
                        href="/reset/password"
                        className={`
                                    w-full gap-2 flex flex-row p-4 
                                    bg-transparent hover:bg-woodsmoke-700 
                                    transition duration-200
                                `}
                    >
                        <LockKeyhole size={18} />
                        <span className="">Redefinir senha</span>
                    </Link>

                    <Link
                        href="/update-email"
                        className={`
                                    w-full gap-2 flex flex-row p-4 
                                    bg-transparent hover:bg-woodsmoke-700 
                                    transition duration-200
                                `}
                    >
                        <Mail size={18} />
                        <span className="">Alterar e-mail</span>
                    </Link>
                    <Link
                        href="/profile/settings/account"
                        className={`
                                    w-full gap-2 flex flex-row p-4 
                                    bg-transparent hover:bg-woodsmoke-700 
                                    transition duration-200
                                `}
                    >
                        <Trash size={18} />
                        <span className="">Excluir conta</span>
                    </Link>
                    <form
                        action="/auth/signout"
                        method="post"
                        className="w-full"
                    >
                        <button
                            className="w-full gap-2 flex flex-row p-4 text-red-500 bg-transparent hover:bg-woodsmoke-700 transition duration-200"
                            type="submit"
                        >
                            <LogOut size={18} />

                            <span>Sair</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
