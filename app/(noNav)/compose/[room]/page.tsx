"use client";

import { TiptapCollabProvider } from "@hocuspocus/provider";
import "iframe-resizer/js/iframeResizer.contentWindow";
import { useSearchParams } from "next/navigation";
import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from "react";
import { Doc as YDoc } from "yjs";

import { BlockEditor } from "../../../../components/BlockEditor";
import { createPortal } from "react-dom";
import { Surface } from "../../../../components/ui/Surface";
import { Toolbar } from "../../../../components/ui/Toolbar";
import { Icon } from "../../../../components/ui/Icon";

import { createClient } from "@/utils/supabase/client";

export default function Document({ params }: { params: { room: string } }) {
    // const { isDarkMode, darkMode, lightMode } = useDarkmode()
    const [provider, setProvider] = useState<TiptapCollabProvider | null>(null);
    const [collabToken, setCollabToken] = useState<string | null>(null);
    const searchParams = useSearchParams();

    const hasCollab = parseInt(searchParams.get("noCollab") as string) !== 1;

    const { room } = params;

    const [initialContent, setInitialContent] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);

    const [loggedId, setLoggedId] = useState("");
    const [authorId, setAuthorId] = useState("");

    const supabase = createClient();

    useEffect(() => {
        // fetch data
        const contentfetch = async () => {
            const { data: session } = await supabase.auth.getSession();
            console.log(session);

            if (!session) {
                return;
            }

            const exists = await supabase
                .from("posts")
                .select("*")
                .eq("room", room);

            if (exists.data?.length === 0) {
                setAuthorId(session!.session!.user.id);
                console.log("Hmm, parece que esse post não existe ainda");
                console.log("Um momento, estou criando...");
                await supabase.from("posts").insert([
                    {
                        room,
                        content: "",
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
                    .eq("room", room)
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
                console.log(data.author_id);
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
    useEffect(() => {
        // fetch data
        const dataFetch = async () => {
            const data = await (
                await fetch("/api/collaboration", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            ).json();

            const { token } = data;

            // set state when the data received
            setCollabToken(token);
        };

        dataFetch();
    }, []);

    const ydoc = useMemo(() => new YDoc(), []);

    useLayoutEffect(() => {
        if (hasCollab && collabToken) {
            setProvider(
                new TiptapCollabProvider({
                    name: `${process.env.NEXT_PUBLIC_COLLAB_DOC_PREFIX}${room}`,
                    appId: process.env.NEXT_PUBLIC_TIPTAP_COLLAB_APP_ID ?? "",
                    token: collabToken,
                    document: ydoc,
                }),
            );
        }
    }, [setProvider, collabToken, ydoc, room, hasCollab]);

    if (hasCollab && (!collabToken || !provider)) return;

    // console.log("authorId", authorId);
    // console.log("loggedId", loggedId);

    return (
        <>
            {/* {DarkModeSwitcher} */}
            {authorId && loggedId && <BlockEditor
                hasCollab={false}
                ydoc={ydoc}
                provider={null}
                room={room}
                initialContent={initialContent}
                authorId={authorId}
                loggedId={loggedId}
            />}
        </>
    );
}
