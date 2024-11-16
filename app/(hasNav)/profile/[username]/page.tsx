import AccountForm from "@/components/profile/user/account-form";
import { createClient } from "@/utils/supabase/server";
import DisplayUser from "@/components/profile/user/displayUser";
import DisplayPosts from "@/components/profile/user/DisplayPosts";
import Link from "next/link";

import type { Metadata, ResolvingMetadata } from "next";

type Props = {
    params: Promise<{ username: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata,
): Promise<Metadata> {
    const supabase = createClient();
    // read route params
    const username = (await params).username;

    if (username == "me") {
        const { data: { user } } = await supabase.auth.getUser();
        const { data: profile } = await supabase.from("profiles").select().eq("id", user!.id).single()
        return {
            title: profile?.full_name,
            description: "Seu perfil",
            openGraph: {
                images: [profile?.avatar_url],
            },
        };
    } else {
        const lowercasedUsername = username.toLowerCase();
        let { data, error } = await supabase
            .from("profiles")
            .select()
            .eq("lower_username", lowercasedUsername);

        return {
            title: data![0]?.full_name,
            description: "Perfil de " + data![0]?.full_name,
            openGraph: {
                images: [data![0]?.avatar_url],
            },
        };
    }

    // fetch data
    // const product = await fetch(`https://.../${id}`).then((res) => res.json());

    // optionally access and extend (rather than replace) parent metadata
    // const previousImages = (await parent).openGraph?.images || [];

    // return {
    //     title: product.title,
    //     openGraph: {
    //         images: ["/some-specific-page-image.jpg", ...previousImages],
    //     },
    // };
}

export default async function Account({
    params,
}: {
    params: { username: string };
}) {
    const username = (await params).username;
    const supabase = createClient();
    let itsMe = false;

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // console.log("user", user!.id);

    let userId;

    const lowercasedUsername = username.toLowerCase();

    let { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("lower_username", lowercasedUsername);

    console.log("data", data![0]?.id);

    userId = data![0]?.id;

    if (username == "me") {
        console.log("user", username);
        itsMe = true;
        userId = user!.id;
    } else if (data?.length === 0) {
        console.log("Usuario nao encontrado");
    } else {
        itsMe = user?.id === data![0].id;
    }

    return (
        <div className="flex flex-col w-full md:flex-row">
            {data?.length === 0 && itsMe == false ? (
                <div className="flex-1 w-full flex flex-col gap-20 items-center">
                    <div
                        className={`
                    h-lvh w-full flex justify-center items-center
                    flex-col
                    px-10
                `}
                    >
                        <span className="text-center mb-6">
                            Opa! Parece que esse usuário não existe...
                        </span>
                        <Link
                            href="/"
                            className="flex flex-row items-center gap-2 w-fit bg-sandybrown-400 transition hover:bg-sandybrown-500 rounded-xl border-2 border-b-defaultB border-fantasy-950 px-4 py-2 text-woodsmoke-800 font-bold mb-2"
                        >
                            <span className="text-lg">Voltar ao ínicio</span>
                        </Link>
                    </div>
                </div>
            ) : (
                <>
                    {itsMe ? (
                        <AccountForm user={user} />
                    ) : (
                        <DisplayUser user={data} />
                    )}
                    <DisplayPosts user={userId} />
                </>
            )}
        </div>
    );
}
