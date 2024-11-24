"use client";

import { TiptapCollabProvider } from "@hocuspocus/provider";
import "iframe-resizer/js/iframeResizer.contentWindow";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Doc as YDoc } from "yjs";

import { BlockEditor } from "@/components/BlockEditor";
import { createClient } from "@/utils/supabase/client";

export default function PostPage({ status }: { status: string }) {
    const [initialContent, setInitialContent] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);

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
            console.log(profile);
            setUserImg(profile.avatar_url);
            setUserDisplayName(profile.full_name);
            setUserUsername(profile.username);

            const exists = await supabase
                .from("posts")
                .select("*")
                .eq("room", status);

            if (exists.data?.length === 0) {
                setAuthorId(session!.session!.user.id);
                console.log("Hmm, parece que esse post não existe ainda");
                console.log("Um momento, estou criando...");
                await supabase.from("posts").insert([
                    {
                        room: status,
                        content: {
                            "type": "doc",
                            "content": [
                                {
                                "type": "paragraph",
                                "attrs": {
                                    "class": null,
                                    "textAlign": "left"
                                }
                                }
                            ]
                            },
                        author_id: session!.session!.user.id,
                    },
                ]);
                console.log("Post criado com sucesso!");
                return;
            } else {
                console.log("Post encontrado!");
                const { data, error } = await supabase
                    .from("posts")
                    .select("content,title,image,author_id")
                    .eq("room", status)
                    .single();

                console.log(data);
                if (error) {
                    console.error("error", error);
                    return;
                }

                setInitialContent(data.content);
                setTitle(data.title);
                setImage(data.image);
                setAuthorId(data.author_id);
            }
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

    const ydoc = useMemo(() => new YDoc(), []);

    return (
        <>
            {authorId && loggedId && (
                <BlockEditor
                    hasCollab={false}
                    ydoc={ydoc}
                    provider={null}
                    room={status}
                    initialContent={initialContent}
                    authorId={authorId}
                    loggedId={loggedId}
                    avatarData={{
                        url: userImg!,
                        username: userUsername!,
                        full_name: userDisplayName!,
                    }}
                />
            )}
        </>
    );
}
