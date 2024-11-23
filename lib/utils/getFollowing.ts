import { createClient } from "@/utils/supabase/client";

export default async function getFollowing (id: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("followers")
        .select("*, profiles!followers_following_id_fkey(*)")
        .eq("follower_id", id)
        .order('created_at', { ascending: false })

    if (error) console.error("Error getting following", error);

    return {
        following: data,
        totalFollowing: data!.length,
    };
};