import { createClient } from "@/utils/supabase/client";

export default async function fetchSearch(
    query: string,
    currentPage: number,
    type: string,
) {
    const supabase = createClient();

    let data = [];

    // const { data, error } = await supabase
    //     .from("profiles")
    //     .select("*")
    //     .or(`username.ilike.%${query}%, bio.ilike.%${query}%, full_name.ilike.%${query}%`)
    //     .order('created_at', { ascending: true })

    // if (error) {
    //     console.log("Error fetching posts: ", error);
    //     throw error;
    // }

    // return data;

    if (type == "posts") {
        const { data: posts, error } = await supabase
            .from("posts")
            .select(
                `*`,
            )
            .order("created_at", { ascending: false })
            .or(
                `title.ilike.%${query}%, raw.ilike.%${query}%, username.ilike.%${query}%, author_username.ilike.%${query}%`,
            )
            .range((currentPage - 1) * 10, currentPage * 10 - 1);

        if (error) throw error;
        data = posts;
    } else {
        const { data: users, error } = await supabase
            .from("profiles")
            .select("*")
            .or(
                `username.ilike.%${query}%, bio.ilike.%${query}%, full_name.ilike.%${query}%`,
            )
            .order("created_at", { ascending: true })
            .range((currentPage - 1) * 10, currentPage * 10 - 1);
        if (error) throw error;
        data = users;
    }

    return data;
}
