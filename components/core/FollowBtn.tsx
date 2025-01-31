"use client";

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from "react";

const checkIfFollowing = async ({
    supabase,
    setIsFollowing,
    id,
}: {
    supabase: any;
    setIsFollowing: Function;
    id: string;
}) => {
    // pega os dados do usuario logado
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
        .from("followers")
        .select("*")
        .eq("follower_id", user.id)
        .eq("following_id", id);

    if (error) console.error("Error getting follow", error);

    if (data!.length > 0) {
        setIsFollowing(true);
        return true;
    } else {
        // setIsFollowing(false);
        return false;
    }
};

export default function FollowBtn({
    id,
    followers,
    setFollowers,
}: {
    id: string | null;
    followers: number;
    setFollowers: Function;
}) {
    const supabase = createClient();

    const [isFollowing, setIsFollowing] = useState<boolean | null>(null);

    useEffect(() => {
        if (id) checkIfFollowing({ supabase, setIsFollowing, id });
    }, [id, supabase]);

    const followUser = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        if (id == null) return;
        const doIFollow = await checkIfFollowing({
            supabase,
            setIsFollowing,
            id,
        });

        console.log("eu sigo?", doIFollow);
        if (doIFollow) {
            console.log("Deixando de seguir...");
            const { data, error } = await supabase
                .from("followers")
                .delete()
                .eq("follower_id", user.id)
                .eq("following_id", id);
            if (error) console.error("Error deleting follow", error);

            setIsFollowing(false);
            setFollowers(followers - 1);

            return;
        } else {
            console.log("Seguindo...");
            const { data, error } = await supabase.from("followers").insert([
                {
                    follower_id: user.id,
                    following_id: id,
                },
            ]);

            if (error) console.error("Error inserting follow", error);

            setIsFollowing(true);
            setFollowers(followers + 1);
        }
    };

    return (
        <button
            className={`
                    mt-3 px-8 py-2 rounded-full text-woodsmoke-50 
                    border-2 
                    ${isFollowing ? "bg-transparent border-main-600" : "bg-main-600 border-transparent"}
                `}
            onClick={followUser}
        >
            <span>
                {isFollowing
                      ? "Seguindo"
                      : "Seguir"}
            </span>
        </button>
    );
}
