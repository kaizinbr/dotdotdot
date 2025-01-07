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

    // console.log(postslenght?.length)

    return (
        <div className="flex-1 w-full flex flex-col items-center pb-20 relative">
            <div
                className={`
                    absolute h-[45rem] w-full -z-50 from-40 
                    transition-all duration-200 ease-in-out
                `}
                style={{
                    backgroundImage: `linear-gradient(to bottom, ${profile.color}, transparent)`,
                }}
            ></div>
            <LoggedStart user={profile} />
            <CardsContainer posts={posts} postslength={postslenght?.length!} />
        </div>
    );
}
