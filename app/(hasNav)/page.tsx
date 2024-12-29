import { createClient } from "@/utils/supabase/server";
import CardsContainer from "@/components/posts/cardsContainer";
import LoggedStart from "@/components/feed/LoggedStart";

export default async function Index() {
    const supabase = createClient();

    const { data: posts } = await supabase
        .from("posts")
        .select()
        .eq("public", true)
        .order("updated_at", { ascending: false })
        .range(0, 29)

    const { data: postslenght } = await supabase
        .from("posts")
        .select()
        .eq("public", true);
    const { data: { user } } = await supabase.auth.getUser();
    const { data: profile } = await supabase.from("profiles").select().eq("id", user!.id).single()

    console.log(postslenght?.length)

    return (
        <div className="flex-1 w-full flex flex-col items-center pb-20 relative">
            <div
                className={`
                    absolute -top-8 left-0 right-0 h-[400px]
                    bg-gradient-to-b from-main-700 to-transparent opacity-80
                    -z-10
                `}
            ></div>
            <LoggedStart user={profile} />
            <CardsContainer posts={posts} postslength={postslenght?.length!} />
        </div>
    );
}
