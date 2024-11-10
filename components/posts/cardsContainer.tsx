
"use client";
import React from "react";
// import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import CardPost from "./CardPost";
import { Masonry } from "react-plock";

export default function CardsContainer({
    posts,
    edit,
}: {
    posts: any[] | null;
    edit?: Boolean;
}) {
    return (
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

        <div className="px-4 gap-5 flex flex-col w-full max-w-[632px]">
            {posts?.map((post, idx) => (
                <CardPost key={post.id} post={post} edit={edit} />
            ))}
        </div>
    );
}
