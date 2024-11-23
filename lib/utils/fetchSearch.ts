import { createClient } from "@/utils/supabase/server";


export default async function fetchSearch(query: string, currentPage: number) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .or(`username.ilike.%${query}%, bio.ilike.%${query}%, full_name.ilike.%${query}%`)
        .order('created_at', { ascending: true })

    if (error) {
        console.log("Error fetching posts: ", error);
        throw error;
    }

    return data;
}
