import RoomMain from "@/components/room/RoomMain";
import { createClient } from "@/utils/supabase/server";
import DetailsHeader from "@/components/core/header/DetailsHeader";

import Image from "next/image";
import Link from "next/link";
import { formatTimeAsDate, formatTimeAsTime } from "@/lib/utils/time";
import PastRelativeTime from "@/components/core/PastRelativeTime";
// import ShowViews from "@/components/posts/ShowViews";
import Avatar from "@/components/posts/AvatarDisplay";
import Divider from "@/components/Divider";
import { Textarea } from "@mantine/core";

// import SetAComment from "@/components/room/comments/SetComment";
// import Comments from "@/components/room/comments/Comments";

// import classes from "@/styles/Textarea.module.css";

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: "Post",
    description: "...",
};

export default async function Page({ params }: { params: { room: string } }) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("posts")
        .select(
            `*,
	        profiles!posts_author_id_fkey("*")`,
        )
        .eq("room", params.room)
        .eq("public", true)
        .single();

    if (error) {
        console.error(error);
    }

    const criado = formatTimeAsDate(new Date(data?.created_at));
    // const atualizadoAs = formatTimeAsTime(new Date(data?.updated_at));

    const json = data?.content;
    // console.log(data.profiles);

    return (
        <>
            {error ? (
                <div className="w-full h-dvh flex justify-center items-center">
                    <span className="">
                        Parece que esse post não está mais disponível.
                    </span>
                </div>
            ) : (
                <>
                    <DetailsHeader
                        content="Details"
                        chapterTitle={data?.title}
                        fullname={data?.profiles.full_name}
                        username={data?.profiles.username}
                        img={data?.profiles.avatar_url}
                        isPost={true}
                    />
                    <div className="w-full mt-24 lg:mt-32">
                        <div className="px-4 mx-auto w-full max-w-2xl sm:px-0 flex flex-col mb-2 text-woodsmoke-300">
                            <div className="flex flex-row w-fit">
                                <picture className="rounded-full overflow-hidden size-10 mr-3 relative">
                                    <div className="flex relative flex-col justify-center items-center size-10 rounded-full ">
                                        <Avatar
                                            size={42}
                                            url={data?.profiles.avatar_url}
                                            username={data?.profiles.username}
                                            intrisicSize={"size-10"}
                                        />
                                    </div>
                                </picture>
                                <div className="flex flex-col h-full justify-center">
                                    <h2 className="text-sm">
                                        <span className="text-white font-bold">
                                            {data?.profiles.full_name}
                                        </span>{" "}
                                        <span className="text-xs">
                                            @{data?.profiles.username}
                                        </span>
                                    </h2>
                                    <span className="text-xs">
                                        {criado}
                                    </span>
                                </div>
                            </div>
                            {/* <ShowViews slug={params.room} /> */}
                        </div>

                        <RoomMain json={json} />
                    </div>
                    <div className="w-full max-w-2xl px-4 lg:px-0 mx-auto">
                        <Divider />
                    </div>
                    <Link
                        href={`/profile/${data?.author_username}`}
                        className="flex flex-col mb-2 w-fit"
                    >
                        <picture className="rounded-full overflow-hidden size-16 relative mb-2">
                            <div className="flex relative flex-col justify-center items-center size-16 rounded-full ">
                                <Avatar
                                    size={66}
                                    url={data?.profiles.avatar_url}
                                    username={data?.profiles.username}
                                    intrisicSize={"size-16"}
                                />
                            </div>
                        </picture>
                        <h2 className="text-xl font-bold PFRegalTextPro">
                            <span className="dark:text-white">
                                {data?.profiles.full_name}
                            </span>{" "}
                            <span className="text-sm">
                                @{data?.profiles.username}
                            </span>
                        </h2>
                    </Link>
                    <span className="text-xs">
                        {criado} | Atualizado{" "}
                        <PastRelativeTime date={new Date(data?.updated_at)} />
                    </span>
                    {/* <div className="px-4 mb-24 mx-auto w-full max-w-2xl sm:px-0 flex flex-col">
                        <SetAComment data={data} />
                        <h2 className="text-2xl font-bold PFRegalTextPro">
                            Comentários
                        </h2>
                        <div
                            className={`
                                w-full flex flex-col items-center mt-6
                            `}
                        >
                            <Comments post={data} />
                            {/* <div
                                className={`
                                    w-full flex flex-row gap-2
                                    border-2 border-woodsmoke-300/40 bg-woodsmoke-200 rounded-xl p-3 
                                `}
                            >
                                <picture className="rounded-full overflow-hidden size-11 relative mb-2">
                                    <div className="flex relative flex-col justify-center items-center size-11 rounded-full ">
                                        <Avatar
                                            size={44}
                                            url={data?.profiles.avatar_url}
                                            username={data?.profiles.username}
                                            intrisicSize={"size-11"}
                                        />
                                    </div>
                                </picture>
                                <div className="flex flex-col text-sm w-10/12">
                                    <div className="flex flex-row items-center gap-1">
                                        <h2 className=" font-bold">
                                            kai{" "}
                                            <span className="text-xs font-400 PFRegalTextPro text-woodsmoke-500">
                                                @kaizin
                                            </span>
                                        </h2>

                                        <p className="text-xs text-woodsmoke-500">
                                            |{" "}
                                            <span className="">
                                                5 minutos atrás
                                            </span>
                                        </p>
                                    </div>
                                    <p className="">
                                        imma mess mess mess mess mess mess
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </>
            )}
        </>
    );
}
