import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";

import { createClient } from "@/utils/supabase/client";
import classes from "@/styles/EditorInfo.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function PubModal({
    room,
    postData,
    setPostData,
    editor,
}: {
    room: string;
    postData: any[];
    setPostData: Function;
    editor?: any;
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

    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const fetchPublic = async () => {
            const { data, error } = await supabase
                .from("posts")
                .select()
                .eq("room", room)

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
        console.log(editorData);

        const extractTitleFromEditor =
            editorData.content.find(
                (item: any) => item.type === "heading" && item.content
            ) || null;

        // const extractTextFromTitle = extractTitleFromEditor ? extractTitleFromEditor.content[0].text : null;

        const extractParagraphFromEditor =
            editorData.content.find(
                (item: any) => item.type === "paragraph" && item.content
            ) || null;

        const extractImageFromEditor =
            editorData.content.find(
                (item: any) => item.type === "imageBlock"
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
    }

    async function setPublished({
        room,
        value,
    }: {
        room: string;
        value: boolean;
    }) {
        const { data, error } = await supabase
            .from("posts")
            .update({
                public: value,
                title: titleFromEditor,
                image: imageFromEditor,
            })
            .eq("room", room);

        setIsPublic(value);

        if (error) {
            console.log("Error updating post: ", error);
            throw error;
        }
    }
    return (
        <>
            {isPublic ? (
                <>
                    <Button
                        onClick={async () => {
                            await getMainData();
                            await setPublished({ room, value: false })
                        }}
                        className="!rounded-full !px-4 py-2 !bg-main-600 text-xs"
                        classNames={{
                            root: "rounded-full px-4 py-2 bg-main-600 text-xs",
                        }}
                    >
                        Despublicar
                    </Button>
                    <Modal
                        opened={opened}
                        onClose={close}
                        centered
                        withCloseButton={false}
                        classNames={{
                            content: classes.content,
                        }}
                    >
                        <p className="text-bold text-center text-2xl mb-4">
                            Remover publicação?
                        </p>
                        <div className="flex justify-around">
                            <button
                                onClick={close}
                                className="rounded-lg px-6 py-2 bg-woodsmoke-700 text-base text-stone-200 font-bold"
                            >
                                Não
                            </button>
                            <button
                                onClick={async () => {
                                    await setPublished({ room, value: false });
                                    close();
                                }}
                                className="rounded-lg px-6 py-2 bg-sky-600 text-base text-stone-200 font-bold"
                                
                            >
                                Sim
                            </button>
                        </div>
                    </Modal>
                </>
            ) : (
                <>
                    <Button
                        onClick={async () => {
                            await getMainData();
                            await setPublished({ room, value: true })
                            router.push('/')
                        }}
                        className="!rounded-full !px-4 py-2 !bg-main-600 text-xs"
                        classNames={{
                            root: "rounded-full px-4 py-2 bg-main-600 text-xs",
                        }}
                    >
                        Publicar
                    </Button>
                    <Modal
                        opened={opened}
                        onClose={close}
                        centered
                        withCloseButton={false}
                        classNames={{
                            content: classes.content,
                            inner: classes.inner,
                        }}
                        overlayProps={{
                            backgroundOpacity: 0.55,
                            blur: 3,
                        }}
                    >
                        <p className="text-bold text-center text-2xl mb-4">
                            Publicar para todos?
                        </p>
                        <div className="flex flex-col gap-2  border border-woodsmoke-200 rounded-3xl overflow-hidden">
                            {imageFromEditor && (
                                <picture className="w-full">
                                    <Image
                                        src={
                                            imageFromEditor! ||
                                            "/placeholder-image.jpg"
                                        }
                                        alt="image"
                                        width={200}
                                        height={200}
                                        className="w-full"
                                    />
                                </picture>
                            )}
                            <div className="flex flex-col gap-3 p-3">
                                <span className=" text-xs text-stone-500">
                                    room /{room}
                                </span>
                                <h1 className="text-3xl PFRegalTextPro">
                                    {titleFromEditor! || "Você precia adicionar um título para publicar!"}
                                </h1>
                                <p className="line-clamp-3 text-sm">
                                    {paragraphFromEditor!}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-around mt-6">
                            <button
                                onClick={close}
                                className="rounded-lg px-6 py-2 bg-woodsmoke-700 text-base text-stone-200 font-bold"
                            >
                                Não
                            </button>
                            <button
                                onClick={async () => {
                                    await setPublished({ room, value: true });
                                    close();
                                }}
                                className="rounded-lg px-6 py-2 bg-sky-600 text-base text-stone-200 font-bold"
                                {...(titleFromEditor
                                    ? { disabled: false }
                                    : { disabled: true })}
                            >
                                Sim
                            </button>
                        </div>
                    </Modal>
                </>
            )}
        </>
    );
}
