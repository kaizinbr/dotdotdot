"use client";
import { useState,useEffect } from "react";
import { Avatar } from "@mantine/core";

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

import { Home, Settings, Pencil } from "lucide-react";

export default function AvatarB({ url, size }: { url: string | null, size: number}) {

    const supabase = createClient();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
    // const [uploading, setUploading] = useState(false);

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

    // console.log(url);
    return (
            // <Link href="/account">
                
                <Avatar
                    src={avatarUrl}
                    alt="Avatar"
                    className="size-6 rounded-full text-woodsmoke-700"
                    size={size}
                />
            // </Link>
    );
}