"use client";

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";
// import Icon from "../core/Icon";
// import { GoHeart, GoHeartFill } from "react-icons/go";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

type LikeBtnProps = {
    postId?: string;
    onClick?: () => void;
};

const checkIfLiked = async ({
    supabase,
    setIsLiked,
    postId,
}: {
    supabase: any;
    setIsLiked: Function;
    postId: string;
}) => {
    // pega os dados do usuario logado
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
        .from("likes")
        .select("*")
        .eq("user_id", user.id)
        .eq("post_id", postId);

    if (error) console.error("Error getting likes", error);
    // console.log(data);

    if (data!.length > 0) {
        setIsLiked(true);
        return true;
    } else {
        setIsLiked(false);
        return false;
    }
};


export default function LikeBtn({ postId, onClick }: LikeBtnProps) {
    const supabase = createClient();
    // console.log(postId)

    const [isLiked, setIsLiked] = useState<boolean | null>(null);

    useEffect(() => {
        if (postId) checkIfLiked({ supabase, setIsLiked, postId });
    }, [postId]);

    const likePost = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!postId) return;
        if (!user) return;

        // checkIfLiked({ supabase, setIsLiked, postId })

        // if (id == null) return;
        const doILiked = await checkIfLiked({
            supabase,
            setIsLiked,
            postId,
        });

        // console.log("eu sigo?", doIFollow);
        if (doILiked) {
            console.log("descurtindo post...");
            const { data, error } = await supabase
                .from("likes")
                .delete()
                .eq("user_id", user.id)
                .eq("post_id", postId);
            if (error) console.error("Error liking post", error);

            setIsLiked(false);

            return;
        } else {
            console.log("Seguindo...");
            const { data, error } = await supabase
                .from("likes")
                .insert([
                    {
                        user_id: user.id,
                        post_id: postId,
                    },
                ]);
            if (error) console.error("Error liking post", error);

            if (error) console.error("Error inserting follow", error);

            setIsLiked(true);
            // setFollowers(followers + 1);
        }
    };
    return (
        <button
            onClick={likePost}
            className={`
                    flex items-center space-x-2  hover:text-red-500
                    transition-colors duration-200 ease-in-out
                    ${isLiked ? "text-red-500" : ""}
                `}
        >
            {isLiked ? <AiFillHeart className="size-7" /> : <AiOutlineHeart className="size-7" />}
            {/* <Icon name="heart" size="sm" /> */}
            {/* <Icon name="heart-fill" size="sm" /> */}
        </button>
    );
}
