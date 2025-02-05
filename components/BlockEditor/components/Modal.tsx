import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import { EllipsisVertical } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import classes from "@/styles/EditorInfo.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import Loading from "@/components/Loading";
import { customAlphabet } from "nanoid";
import updateOnDB from "@/lib/utils/updateOnDB";

import { useRouter } from "next/navigation";

const getNanoId = (): string => {
    const nanoid = customAlphabet("6789BCDFGHJKLMNPQRTWbcdfghjkmnpqrtwz", 10);
    return nanoid();
};

export default function Publish({
    postData,
    setPostData,
    editor,
    setLoading,
}: {
    postData: any[];
    setPostData: Function;
    editor?: any;
    setLoading: Function;
}) {
    const [opened, { open, close }] = useDisclosure(false);
    const [title, setTitle] = useState<string | null>(null);
    const [image, setImage] = useState<string | null>(null);
    const [titleFromEditor, setTitleFromEditor] = useState<string | null>("");
    const [paragraphFromEditor, setParagraphFromEditor] = useState<
        string | null
    >(null);
    const [imageFromEditor, setImageFromEditor] = useState<string | null>("");

    const [isPublic, setIsPublic] = useState(false);

    const room = getNanoId();

    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const fetchPublic = async () => {
            const { data, error } = await supabase
                .from("posts")
                .select()
                .eq("room", room);

            if (error) {
                console.log("Error fetching post: ", error);
                throw error;
            }
            console.log(data);

            if (data && data.length > 0) {
                setPostData(data);
                setTitle(data[0].title);
                setImage(data[0].image);
                setIsPublic(data[0].public);
            }
        };

        fetchPublic();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [room, supabase]);

    async function getMainData() {
        const editorData = editor.getJSON();

        const raw = editor.getText({ blockSeparator: '\n\n' })
        console.log(raw)

        if (raw.length === 0) {
            console.log("Tá vazio, palhaço!");
            return null;
        }

        // if 

        const extractTitleFromEditor =
            editorData.content.find(
                (item: any) => item.type === "heading" && item.content,
            ) || null;

        // const extractTextFromTitle = extractTitleFromEditor ? extractTitleFromEditor.content[0].text : null;

        const extractParagraphFromEditor =
            editorData.content.find(
                (item: any) => item.type === "paragraph" && item.content,
            ) || null;

        const extractImageFromEditor =
            editorData.content.find(
                (item: any) => item.type === "imageBlock",
            ) || null;

        console.log(extractTitleFromEditor, extractImageFromEditor);

        if (extractTitleFromEditor != null) {
            setTitleFromEditor(extractTitleFromEditor.content[0].text);
        } else {
            setTitleFromEditor(null);
        }

        if (extractParagraphFromEditor != null) {
            setParagraphFromEditor(extractParagraphFromEditor.content[0].text);
        } else {
            setParagraphFromEditor(null);
        }

        if (extractImageFromEditor) {
            setImageFromEditor(extractImageFromEditor.attrs.src);
        }

        return true;
    }

    async function setPublished({
        room,
        isPublic,
    }: {
        room: string;
        isPublic: boolean;
    }) {
        setLoading(true);
        const check = await getMainData();
        if (!check) {
            setLoading(false);
            return;
        }

        await updateOnDB(editor, room, supabase, isPublic);

        if (isPublic) {
            // router.push(`/status/${room}`);
            router.push(`/`);
        }
        
        setLoading(false);
    }


    return (
        <div className="flex gap-2">
            <button
                onClick={async () => {
                    await setPublished({ room, isPublic: false });
                }}
                className={`rounded-full !px-4 py-2 border-2 border-main-600 text-sm`}
            >
                Salvar
            </button>
            <button
                onClick={async () => {
                    await setPublished({ room, isPublic: true });
                }}
                className="!rounded-full !px-4 py-2 !bg-main-600 text-sm font-bold"
            >
                Postar
            </button>
        </div>
    );
}
