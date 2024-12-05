"use client";
import { useState, useEffect } from "react";
import { Avatar } from "@mantine/core";
import { createClient } from "@/utils/supabase/client";

export default function AvatarB({
    url,
    size,
    className,
}: {
    url: string | null;
    size: number;
    className?: string;
}) {
    const supabase = createClient();
    const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
    // const [uploading, setUploading] = useState(false);

    useEffect(() => {
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
    }, [url, supabase]);

    // console.log(url);
    return (
        // <Link href="/account">

        <Avatar
            src={avatarUrl}
            alt="Avatar"
            className={`
                ${className}
                size-6 rounded-full text-woodsmoke-700
            `}
            size={size}
        />
        // </Link>
    );
}
