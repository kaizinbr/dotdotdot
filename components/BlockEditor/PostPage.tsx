"use client";

import { TiptapCollabProvider } from "@hocuspocus/provider";
import "iframe-resizer/js/iframeResizer.contentWindow";
import Loading from "../Loading";
import { useEffect, useMemo, useState } from "react";

import { BlockEditor } from "@/components/BlockEditor";
import { createClient } from "@/utils/supabase/client";

export default function PostPage() {
    const [initialContent, setInitialContent] = useState<string | null>(null);

    const [loggedId, setLoggedId] = useState("");
    const [authorId, setAuthorId] = useState("");

    const [userImg, setUserImg] = useState<string | null>(null);
    const [userDisplayName, setUserDisplayName] = useState<string | null>(null);
    const [userUsername, setUserUsername] = useState<string | null>(null);

    const supabase = createClient();

    useEffect(() => {
        // fetch data
        const contentfetch = async () => {
            const { data: session } = await supabase.auth.getSession();
            console.log(session);

            if (!session) {
                return;
            }
            const { data: profile } = await supabase
                .from("profiles")
                .select()
                .eq("id", session!.session!.user.id)
                .single();
            // console.log(profile);
            setUserImg(profile.avatar_url);
            setUserDisplayName(profile.full_name);
            setUserUsername(profile.username);
        };

        const checkIfCanSee = async () => {
            const { data } = await supabase.auth.getSession();

            if (data.session) {
                setLoggedId(data.session.user.id);
                console.log(data.session.user.id);
                // console.log(authorId, loggedId);
            }
        };

        contentfetch();
        checkIfCanSee();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <BlockEditor
                avatarData={{
                    url: userImg!,
                    username: userUsername!,
                    full_name: userDisplayName!,
                }}
            />
        </>
    );
}
