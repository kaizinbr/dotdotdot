/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";
import Avatar from "./AvatarDisplay";
import PastRelativeTime from "../core/PastRelativeTime";
import EditOptions from "./EditOptions";
import { motion } from "framer-motion";

import Icon from "../core/Icon";
import { TbBookmark, TbShare3, TbDotsVertical } from "react-icons/tb";

import { generateHTML } from "@tiptap/html";
import ExtensionKit from "@/extensions/extension-kit-display";
import ShareBtn from "./ShareBtn";

interface Post {
    title: string;
    content: string | any;
    public: boolean;
    author_id: string;
    id: string;
    created_at: string;
    updated_at: string;
    room: string;
    image: string;
}

interface User {
    id: string;
    updated_at: string;
    username: string;
    full_name: string;
    avatar_url: string;
    website: string;
    bio: string;
    pronouns: string;
}

export default function CardPost({
    post,
    edit,
}: {
    post: any;
    edit?: Boolean;
}) {
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [userImg, setUserImg] = useState<string | null>(null);
    const [postImg, setPostImg] = useState<string | null>(null);

    if (post.content.length === 0) {
        return null;
    }

    const reduced = post.content.content
        .filter((item: any) => item.type !== "imageBlock")
        .slice(0, 3);

    const output = useMemo(() => {
        return generateHTML(
            {
                type: "doc",
                content: reduced,
            },
            [...ExtensionKit()],
        );
    }, [post]);

    // console.log(post.content.content);
    // console.log(output);

    useEffect(() => {
        async function fetchPostImage() {
            const url = post.content.content.find(
                (item: any) => item.type === "imageBlock",
            )?.attrs.src;

            // console.log(url);

            if (url) {
                setPostImg(url);
            }
        }

        fetchPostImage();
    }, []);

    useEffect(() => {
        async function fetchUserProfile() {
            const supabase = createClient();
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", post.author_id)
                .single();

            if (error) {
                console.log(error);
                return null;
            }
            // console.log(data)
            setUserProfile(data);
            setUserImg(data.avatar_url);
        }

        fetchUserProfile();
    }, []);

    return (
        <motion.div
            whileTap={{ scale: 0.8 }}
            className={`
            flex flex-col 
            
            bg-woodsmoke-700
            max-w-[600px] w-full
            transition-all duration-200 ease-in-out   
            rounded-3xl overflow-hidden relative
        `}
        >
            <div className="flex flex-row justify-between items-center gap-1 p-3 pb-0 relative">
                {userProfile && (
                    <Link
                        href={`/profile/${userProfile.username}`}
                        className="flex flex-row items-center gap-1"
                    >
                        <div className="flex relative flex-col justify-center items-center h-10 w-10 rounded-full ">
                            <Avatar
                                size={36}
                                url={userImg}
                                username={userProfile.username}
                                intrisicSize={"size-8"}
                            />
                        </div>
                        <div className="flex items-center justify-center flex-row gap-2">
                            <h2 className="text-sm">
                                <span className="text-white font-bold">
                                    {userProfile!.full_name}
                                </span>{" "}
                                <span className="text-xs">
                                    @{userProfile!.username}
                                </span>
                            </h2>
                            <span className=" text-xs text-stone-500 dark:text-stone-400">
                                <PastRelativeTime
                                    date={new Date(post.updated_at)}
                                />
                            </span>
                        </div>
                    </Link>
                )}
                {!userProfile && (
                    <div className="flex flex-row items-center gap-1">
                        <div className="flex relative flex-col justify-center items-center h-10 w-10 rounded-full bg-woodsmoke-550"></div>
                        <div className="flex items-center justify-center flex-row gap-2">
                            <h2 className="text-sm"> </h2>
                            <span className=" text-xs text-stone-500 dark:text-stone-400"></span>
                        </div>
                    </div>
                )}
                <EditOptions edit={edit} />
            </div>
            <Link
                href={`/${edit ? "create" : "status"}/${post.room}`}
                className="z-20"
            >
                <div className="flex flex-col gap-3 p-3 pb-0 max-h-[500px] overflow-clip">
                    {output && (
                        <div
                            className="text-stone-300 text-sm cardContent"
                            dangerouslySetInnerHTML={{ __html: output }}
                        ></div>
                    )}
                </div>
                {postImg && (
                    <picture className="w-full flex p-3 pb-0">
                        <Image
                            src={postImg}
                            alt="Authentication"
                            width={500}
                            height={500}
                            className="object-cover w-full max-h-[400px] rounded-2xl"
                        />
                    </picture>
                )}
            </Link>
            <div className="flex w-full flex-row justify gap-3 p-3 ">
                <Link
                    href={`/status/${post.room}`}
                    className=" text-xs text-woodsmoke-100"
                >
                    <Icon name="eye" type="comment" className="size-6" />
                </Link>
                <ShareBtn room={post.room} edit={edit} />
                {/* <span className=" text-xs text-stone-300">
                        <TbDotsVertical className="size-6" />
                    </span> */}
            </div>
        </motion.div>
    );
}
