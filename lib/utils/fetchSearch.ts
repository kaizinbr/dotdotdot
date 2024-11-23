import { createClient } from "@/utils/supabase/server";


export default async function fetchSearch(query: string, currentPage: number) {
    const supabase = createClient();
    const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .or(`username.ilike.%${query}%, bio.ilike.%${query}%, full_name.ilike.%${query}%`)
        // .ilike("username", `%${query}%`)
        // `ticket_no.ilike.'%${search}%', listing.title.ilike.'%${search}%',toco_name.ilike.'%${search}%'`
        // .range((currentPage - 1) * 10, currentPage * 10 - 1);


        // .from("posts")
        // .select("*")
        // .ilike("content", `%${query}%`)
        // .range((currentPage - 1) * 10, currentPage * 10 - 1);

    if (error) {
        console.log("Error fetching posts: ", error);
        throw error;
    }

    return data;
}
