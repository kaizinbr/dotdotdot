import { createClient } from "@/utils/supabase/client";

export default async function getFollowers (id: string) {
    const supabase = createClient();

    const { data, error } = await supabase
        .from("followers")
        .select("*, profiles!followers_follower_id_fkey(*)")
        .eq("following_id", id)
        .order('created_at', { ascending: false })

    if (error) console.error("Error getting followers", error);

    return {
        followers: data,
        totalFollowers: data!.length,
    };
};