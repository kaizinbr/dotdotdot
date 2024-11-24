import { createClient } from "@/utils/supabase/client";

export default async function deletePost(id: string) {
    const supabase = createClient();

    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (error) console.error("Error deleting post", error);
}