"use client";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import { Avatar as Ava2 } from "@mantine/core";
import { Pen } from "lucide-react";

export default function Avatar({
    uid,
    url,
    size,
    onUpload,
    username,
}: {
    uid: string | null;
    url: string | null;
    size: number;
    onUpload: (url: string) => void;
    username?: string | null;
}) {
    const supabase = createClient();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        async function downloadImage(path: string) {
            try {
                const { data, error } = await supabase.storage
                    .from("avatars")
                    .download(path);
                if (error) {
                    throw error;
                }

                const url = URL.createObjectURL(data);
                setAvatarUrl(url);
            } catch (error) {
                console.log("Error downloading image: ", error);
            }
        }

        if (url) downloadImage(url);
    }, [url, supabase]);

    const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (
        event,
    ) => {
        try {
            setUploading(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("You must select an image to upload.");
            }

            const file = event.target.files[0];
            const fileExt = file.name.split(".").pop();
            const filePath = `${uid}-${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from("avatars")
                .upload(filePath, file);

            if (uploadError) {
                throw uploadError;
            }

            onUpload(filePath);
        } catch (error) {
            alert("Error uploading avatar!");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="flex relative flex-col justify-center items-center h-48 w-48 rounded-full ">
            {avatarUrl ? (
                <picture
                    className={`
                        flex flex-row justify-center items-center
                        bg-neutral-800 rounded-full overflow-hidden
                        w-48 h-48
                        
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
                        style={{ height: size, width: size }}
                    />
                </picture>
            ) : (
                <Ava2
                    size={size}
                    radius="xl"
                    src={avatarUrl}
                    className="rounded-full"
                    alt="Avatar"
                    style={{ height: size, width: size }}
                />
            )}
            <div style={{ width: size }} className="absolute w-full h-full">
                <label
                    className="w-48 h-48 cursor-pointer flex rounded-full justify-center items-center"
                    htmlFor="single"
                >
                    {uploading ? (
                        <div className="h-48 w-48 flex rounded-full justify-center items-center bg-black/40">
                            Uploading ...
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="button primary block bg-main-500 p-3 rounded-full absolute right-2 bottom-2 z-20">
                        <Pen size={14} className="" />
                    </div>
                </label>
                <input
                    style={{
                        visibility: "hidden",
                        position: "absolute",
                    }}
                    type="file"
                    id="single"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                />
            </div>
        </div>
    );
}
