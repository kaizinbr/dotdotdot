/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

export default function Avatar({
    url,
    size,
    username,
    intrisicSize,
}: {
    url: string | null;
    size: number;
    username?: string | null;
    intrisicSize?: string;
}) {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(url);

    useEffect(() => {
        // console.log("effect")
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

        if (url) downloadImage(url);
    }, []);

    return (
        <>
            {avatarUrl ? (
                <picture
                    className={`
                        flex flex-row justify-center items-center
                        bg-neutral-800 rounded-full overflow-hidden
                        ${intrisicSize}
                        
                    `}
                >
                    <Image
                        width={size}
                        height={size}
                        src={avatarUrl}
                        alt="Avatar"
                        className={`
                                object-cover object-center
                                min-w-full
                                avatar image
                            `}
                        style={{ height: size, width: "auto" }}
                    />
                </picture>
            ) : (
                ""
            )}
        </>
    );
}

export function AvatarCard({
    url,
    size,
    username,
    intrisicSize,
}: {
    url: string | null;
    size: number;
    username?: string | null;
    intrisicSize?: string;
}) {
    const [avatarUrl, setAvatarUrl] = useState<string | null>(url);

    // useEffect(() => {
    //     // console.log("effect")
    // const supabase = createClient();
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
    //             console.log("Downloaded image:", url);
    //         } catch (error) {
    //             console.log("Error downloading image: ", error);
    //         }
    //     }

    //     if (url) downloadImage(url);
    // }, []);

    return (
        <>
            {url ? (
                <picture
                    className={`
                        flex flex-row justify-center items-center
                        bg-neutral-800 rounded-full overflow-hidden
                        ${intrisicSize}
                        
                    `}
                >
                    <Image
                        width={size}
                        height={size}
                        src={url}
                        alt="Avatar"
                        className={`
                                object-cover object-center
                                min-w-full
                                avatar image
                            `}
                        style={{ height: size, width: "auto" }}
                    />
                </picture>
            ) : (
                ""
            )}
        </>
    );
}
