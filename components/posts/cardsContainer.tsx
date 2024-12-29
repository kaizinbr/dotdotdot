"use client";
import React, { useState } from "react";
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import CardPost from "./CardPost";
// import { Masonry } from "react-plock";
import { motion } from "framer-motion";

import { createClient } from "@/utils/supabase/client";
import { off } from "process";

export default function CardsContainer({
    posts,
    edit,
    postslength,
    author_id,
}: {
    posts: any[] | null;
    edit?: Boolean;
    postslength: number;
    author_id?: string;
}) {
    console.log(postslength);
    const supabase = createClient();
    const [offset, setOffset] = useState(10);

    const [posts2, setPosts] = useState<any[] | null>(posts);

    async function loadMore() {
        if (offset >= postslength) return;

        if (author_id) {
            const { data: newposts } = await supabase
                .from("posts")
                .select()
                .eq("public", true)
                .eq("author_id", author_id)
                .order("updated_at", { ascending: false })
                .range(offset, offset + 29);

            setOffset(offset + 30);

            if (!newposts) return;
            posts2?.push(...newposts);
        } else {
            const { data: newposts } = await supabase
                .from("posts")
                .select()
                .eq("public", true)
                .order("updated_at", { ascending: false })
                .range(offset, offset + 29);

            setOffset(offset + 30);

            if (!newposts) return;
            posts2?.push(...newposts);
        }
    }

    return (
        <div className="px-3 gap-5 flex flex-col w-full max-w-[632px]">
            {posts2?.map((post, idx) => (
                <CardPost key={idx} post={post} edit={edit} />
            ))}

            {offset < postslength && (
                <motion.button
                    whileTap={{ scale: 0.8 }}
                    onClick={loadMore}
                    className="w-full py-2 bg-main-600 text-white rounded-lg"
                >
                    Carregar mais
                </motion.button>
            )}
        </div>
    );
}

// <Masonry
//     items={posts!}
//     config={{
//         columns: [1, 2, 3],
//         gap: [24, 12, 16],
//         media: [640, 768, 1024],
//     }}
//     render={(post, idx) => (
//         <CardPost key={post.id} post={post} />
//     )}
//     className="w-full px-3 mx-auto max-w-4xl"
// />
