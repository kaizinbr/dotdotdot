import { createClient } from "@/utils/supabase/server";
import { InvoicesTableSkeleton, InvoicesMobileSkeleton } from "@/components/Skeletons";
import { Suspense } from "react";
import type { Metadata, ResolvingMetadata } from "next";
import getFollowing from "@/lib/utils/getFollowing";
import getFollowers from "@/lib/utils/getFollowers";
import DisplayUserInList from "@/components/DisplayUserInList";

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

        const lowercasedUsername = username.toLowerCase();
        let { data, error } = await supabase
            .from("profiles")
            .select()
            .eq("lower_username", lowercasedUsername);

        return {
            title: "Quem segue " + data![0]?.full_name,
            description: "Perfil de " + data![0]?.full_name,
            openGraph: {
                images: [data![0]?.avatar_url],
            },
        
    }
}

export default async function Account({
    params,
}: {
    params: Promise<{ username: string }>;
}) {
    const username = (await params).username;

    const supabase = createClient();

    const lowercasedUsername = username.toLowerCase();

    let { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("lower_username", lowercasedUsername);

    const userId = data![0]?.id;

    const { followers, totalFollowers } = await getFollowers(userId);

    return (
        <div className="flex flex-col w-full md:flex-row relative">
            <div className="flex-1 w-full flex flex-col gap-20 items-center  mx-auto max-w-4xl px-4 mt-10">
                <h1 className="text-3xl font-bold">Quem segue {data![0]?.full_name}</h1>
                <Suspense fallback={<InvoicesMobileSkeleton />}>
                    <div className="flex flex-col gap-3 w-full">
                        {followers!.map((user: any) => (
                            <DisplayUserInList key={user.id} data={user.profiles} />
                        ))}
                        {totalFollowers === 0 && (
                            <div className="text-woodsmoke-300 text-center">
                                {data![0]?.full_name} não tem seguidores ainda.
                            </div>
                        )}
                    </div>
                </Suspense>
            </div>
        </div>
    );
}
