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
import { PenSquare } from "lucide-react";

import { generateHTML } from "@tiptap/html";
import ExtensionKit from "@/extensions/extension-kit-display";
import ShareBtn from "./ShareBtn";
import QuoteCard from "./QuoteCard";

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
    const supabase = createClient();
    const [userProfile, setUserProfile] = useState<User | null>(null);
    const [userImg, setUserImg] = useState<string | null>(null);
    const [postImg, setPostImg] = useState<string | null>(null);

    const [postData, setPostData] = useState<any | null>(null);

    const [avatarUrl, setAvatarUrl] = useState<string | null>("");
    const [amIAuthor, setAmIAuthor] = useState<boolean>(false);

    const getPostData = useCallback(async () => {
        try {
            // setLoading(true);
            const {
                data: { user },
            } = await supabase.auth.getUser();

            const { data, error, status } = await supabase
                .from("posts")
                .select()
                .eq("id", post.id)
                .eq("public", true);

            if (error && status !== 406) {
                console.log(error);
                throw error;
            }
            setPostData(data);
            // if (data.)
        } catch (error) {
            alert("Error loading user data!");
        }
    }, [post, supabase]);

    const reduced = post.content.content
        .filter((item: any) => item.type !== "imageBlock")
        .slice(0, 5);

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
            setUserProfile(data);
            setUserImg(data.avatar_url);
            localStorage.setItem(
                `userProfile-${post.author_id}`,
                JSON.stringify(data),
            );
        }

        const cachedUserProfile = localStorage.getItem(
            `userProfile-${post.author_id}`,
        );

        // ele puxa os dados do local storage se existir pra otimizar a exibição pro usuário
        // depois vai puxar os dados do DB, o que demora mais, e atualizar no local storage e pro usuario
        if (cachedUserProfile) {
            const parsedProfile = JSON.parse(cachedUserProfile);
            setUserProfile(parsedProfile);
            setUserImg(parsedProfile.avatar_url);
        } 
        fetchUserProfile();
    }, [post]);

    useEffect(() => {
        const supabase = createClient();
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

        if (userImg) {
            downloadImage(userImg);
        }
    }, [userImg]);

    // useEffect(() => {
    //     async function checkAuthor() {
    //         const {
    //             data: { user },
    //         } = await supabase.auth.getUser();

    //         console.log(post.author_id, user?.id);

    //         if (post.author_id == user?.id) {
    //             setAmIAuthor(true);
    //         } else {
    //             setAmIAuthor(false);
    //         }
    //             console.log(amIAuthor, "aaaa");
    //     }

    //     checkAuthor();
    // }, []);

    // useEffect(() => {
    //     const supabase = createClient();
    //     async function downloadImage(path: string) {
    //         try {
    //             // console.log("Downloading image:", path);
    //             const { data, error } = await supabase.storage
    //                 .from("avatars")
    //                 .download(path);
    //             if (error) {
    //                 throw error;
    //             }

    //             const url = URL.createObjectURL(data);
    //             setAvatarUrl(url);

    //             // const { data, error } = await supabase.storage
    //             //     .from("avatars")
    //             //     .createSignedUrl(path, 3600);

    //             localStorage.setItem(`userAvatar-${post.author_id}`, url);
    //             // localStorage.setItem(`postImg-${post.id}`, url);
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

    //         // }
    //     }
    // }, [userImg]);

    const output = useMemo(() => {
        return generateHTML(
            {
                type: "doc",
                content: reduced,
            },
            [...ExtensionKit()],
        );
    }, [post]);

    useEffect(() => {
        async function fetchPostImage() {
            const url = post.content.content.find(
                (item: any) => item.type === "imageBlock",
            )?.attrs.src;

            if (url) {
                setPostImg(url);
                // localStorage.setItem(`postImg-${post.id}`, url);
            }
        }

        fetchPostImage();
    }, [post]);

    if (post.content.length === 0) {
        return null;
    }

    return (
        <div
            // whileTap={{ scale: 0.8 }}
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
                        <div className="flex relative flex-col justify-center items-center size-8 rounded-full bg-woodsmoke-550"></div>
                        <div className="flex items-center justify-center flex-row gap-2">
                            <h2 className="text-sm"> </h2>
                            <span className=" text-xs text-stone-400"></span>
                        </div>
                    </div>
                )}
                <EditOptions post={post} edit={edit} />
            </div>
            <Link
                href={`/${edit ? "compose" : "status"}/${post.room}`}
                className="z-20"
            >
                <div className="flex flex-col gap-3 px-3 pt-2 pb-0 max-h-[500px] overflow-clip displaying">
                    {output && (
                        <div
                            className="text-stone-300 text-sm cardContent cardPostProseMirror"
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

            {post.is_quote && (
                <div className="flex flex-col gap-3 p-3">
                    <QuoteCard post={post.quoted_id} />
                </div>
            )}

            <div className="flex w-full flex-row justify gap-3 p-3 ">
                {edit ? <Link
                            href={`/compose/${post.room}`}
                            className=" text-xs text-woodsmoke-100"
                        >
                            <PenSquare
                                className="size-6"
                            />
                        </Link> : (
                    <>
                        <Link
                            href={`/status/${post.room}`}
                            className=" text-xs text-woodsmoke-100"
                        >
                            <Icon
                                name="eye"
                                type="comment"
                                className="size-6"
                            />
                        </Link>
                        <ShareBtn room={post.room} edit={edit} />
                        <LikeBtn postId={post.id} />
                    </>
                )}
            </div>
        </div>
    );
}
