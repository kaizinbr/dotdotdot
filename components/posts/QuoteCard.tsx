/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import Avatar, { AvatarCard } from "./AvatarDisplay";
import PastRelativeTime from "../core/PastRelativeTime";
import EditOptions from "./EditOptions";
import { motion } from "framer-motion";

import Icon from "../core/Icon";
import LikeBtn from "./LikeBtn";

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

export default function QuoteCard({
    post,
}: {
    post: any;
}) {
    const supabase = createClient();
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [userImg, setUserImg] = useState<string | null>(null);
    const [postImg, setPostImg] = useState<string | null>(null);

    const [reducedContent, setReducedContent] = useState<any | null>(null);

    const [postData, setPostData] = useState<any | null>(null);

    const [avatarUrl, setAvatarUrl] = useState<string | null>("");
    console.log("Post data:", post);

    async function fetchUserProfile(author_id: string) {
        const supabase = createClient();
        const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", author_id)
            .single();

        if (error) {
            console.log(error);
            return null;
        }
        setUserProfile(data);
        setUserImg(data.avatar_url);
        localStorage.setItem(
            `userProfile-${author_id}`,
            JSON.stringify(data),
        );
    }

    async function downloadImage(path: string) {
        try {
            const { data } = supabase.storage
                .from("avatars")
                .getPublicUrl(path);

            setAvatarUrl(data.publicUrl);
            console.log("Downloaded image:", data);
        } catch (error) {
            console.log("Error downloading image: ", error);
        }
    }

    const getPostData = useCallback(async () => {
        try {
            // setLoading(true);

            const { data, error, status } = await supabase
                .from("posts")
                .select()
                .eq("id", post)
                .eq("public", true);

            if (error && status !== 406) {
                console.log(error);
                throw error;
            }
            setPostData(data);
            console.log("get post data:", data);

            if (!data) {
                return null;
            }

            const cachedUserProfile = localStorage.getItem(
                `userProfile-${data[0].author_id}`,
            );
            if (cachedUserProfile) {
                const parsedProfile = JSON.parse(cachedUserProfile);
                setUserProfile(parsedProfile);
                setUserImg(parsedProfile.avatar_url);
            } else {
                fetchUserProfile(data[0].author_id);
            }

            if (userImg) {
                downloadImage(userImg);
            }

            const reduced = data[0].content.content
                .filter((item: any) => item.type !== "imageBlock")
                .slice(0, 3);
            setReducedContent(reduced);



        } catch (error) {
            alert("Error loading user data!");
        }
    }, [post, supabase]);

    useEffect(() => {
        getPostData();
    }, [getPostData]);

    // const reduced = post.content.content
    //     .filter((item: any) => item.type !== "imageBlock")
    //     .slice(0, 3);

    // useEffect(() => {
    //     async function fetchUserProfile() {
    //         const supabase = createClient();
    //         const { data, error } = await supabase
    //             .from("profiles")
    //             .select("*")
    //             .eq("id", post.author_id)
    //             .single();

    //         if (error) {
    //             console.log(error);
    //             return null;
    //         }
    //         setUserProfile(data);
    //         setUserImg(data.avatar_url);
    //         localStorage.setItem(
    //             `userProfile-${post.author_id}`,
    //             JSON.stringify(data),
    //         );
    //     }

    //     const cachedUserProfile = localStorage.getItem(
    //         `userProfile-${post.author_id}`,
    //     );
    //     if (cachedUserProfile) {
    //         const parsedProfile = JSON.parse(cachedUserProfile);
    //         setUserProfile(parsedProfile);
    //         setUserImg(parsedProfile.avatar_url);
    //     } else {
    //         fetchUserProfile();
    //     }
    // }, []);

    // useEffect(() => {
    //     const supabase = createClient();
    //     async function downloadImage(path: string) {
    //         try {
    //             const { data } = supabase.storage
    //                 .from("avatars")
    //                 .getPublicUrl(path);

    //             setAvatarUrl(data.publicUrl);
    //             console.log("Downloaded image:", data);
    //         } catch (error) {
    //             console.log("Error downloading image: ", error);
    //         }
    //     }

    //     // const cachedAvatar = localStorage.getItem(`userAvatar-${post.author_id}`);
    //     // if (cachedAvatar) {
    //     //     setAvatarUrl(cachedAvatar);
    //     //     console.log("Cached avatar:", cachedAvatar);
    //     // } else {
    //     if (userImg) {
    //         downloadImage(userImg);
    //     }
    // }, [userImg]);


    const output = useMemo(() => {
        return generateHTML(
            {
                type: "doc",
                content: reducedContent,
            },
            [...ExtensionKit()],
        );
    }, [post]);

    // useEffect(() => {
    //     async function fetchPostImage() {
    //         const url = post.content.content.find(
    //             (item: any) => item.type === "imageBlock",
    //         )?.attrs.src;

    //         if (url) {
    //             setPostImg(url);
    //             localStorage.setItem(`postImg-${post.id}`, url);
    //         }
    //     }

    //     const cachedPostImg = localStorage.getItem(`postImg-${post.id}`);
    //     if (cachedPostImg) {
    //         setPostImg(cachedPostImg);
    //     } else {
    //         fetchPostImage();
    //     }
    // }, [post]);

    // if (post.content.length === 0) {
    //     return null;
    // }

    return (
        <div
            // whileTap={{ scale: 0.8 }}
            className={`
            flex flex-col 
            bg-woodsmoke-800 border border-woodsmoke-700
            max-w-[600px] w-full
            transition-all duration-200 ease-in-out   
            rounded-3xl overflow-hidden relative
        `}
        >
            <div className="flex flex-row justify-between items-center gap-1 p-3 pb-0 relative">
                {userProfile && (
                    <Link
                        href={`/profile/${userProfile.username}`}
                        className="flex flex-row items-center gap-2"
                    >
                        <div className="flex relative flex-col justify-center items-center size-8 rounded-full">
                            <AvatarCard
                                size={32}
                                url={avatarUrl}
                                username={userProfile.username}
                                intrisicSize={"size-8"}
                            />
                        </div>
                        <div className="flex items-center justify-center flex-row gap-2">
                            <h2 className="text-sm h-full flex items-center gap-1">
                                <span className="text-white font-bold">
                                    {userProfile!.full_name}
                                </span>{" "}
                                <span className="text-xs">
                                    @{userProfile!.username}
                                </span>
                            </h2>
                            <span className=" h-full flex items-center text-xs text-stone-500 dark:text-stone-400">
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
                        <div className="flex items-</span>center justify-center flex-row gap-2">
                            <h2 className="text-sm"> </h2>
                            <span className=" text-xs text-stone-400"></span>
                        </div>
                    </div>
                )}
            </div>
            <Link
                href={`/status/${post.id}`}
                className="z-20"
            >
                <div className="flex flex-col gap-3 p-3 pt-2 max-h-[500px] overflow-clip">
                    {output && (
                        <div
                            className="text-stone-300 text-sm cardContent"
                            dangerouslySetInnerHTML={{ __html: output }}
                        ></div>
                    )}
                </div>
            </Link>

            {/* {post.is_quote && (
                <div className="flex flex-col gap-3 p-3">
                    <div className="flex flex-col items-start bg-woodsmoke-800 border border-woodsmoke-700 rounded-3xl">
                        <div className="flex flex-row items-center gap-2 p-3 pb-0">
                            <div className="flex relative flex-col justify-center items-center size-6 rounded-full">
                                <AvatarCard
                                    size={24}
                                    url={avatarUrl}
                                    username={userProfile!.username}
                                    intrisicSize={"size-6"}
                                />
                            </div>
                            <div className="flex items-center justify-center flex-row gap-2">
                                <h2 className="text-sm h-full flex items-center gap-1">
                                    <span className="text-white font-bold">
                                        {userProfile!.full_name}
                                    </span>{" "}
                                    <span className="text-xs">
                                        @{userProfile!.username}
                                    </span>
                                </h2>
                                <span className=" h-full flex items-center text-xs text-stone-500 dark:text-stone-400">
                                    <PastRelativeTime
                                        date={new Date(post.updated_at)}
                                    />
                                </span>
                            </div>
                        </div>
                        <span className="text-stone-400 text-xs p-3 pt-3">
                            {post.quoted_id}
                        </span>
                    </div>
                </div>
            )} */}
        </div>
    );
}
