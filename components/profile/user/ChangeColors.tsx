import { Menu, Button, Modal, Text, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import deletePost from "@/lib/utils/deletePost";
import {
    Trash2,
    Eye,
    EllipsisIcon,
    Flag,
    ShieldX,
    Bookmark,
    UserRoundPlus,
} from "lucide-react";
import classes from "@/styles/EditOptions.module.css";

import { createClient } from "@/utils/supabase/client";

interface Colors {
    hex: string;
    red: number;
    green: number;
    blue: number;
    area: number;
    hue: number;
    saturation: number;
    lightness: number;
    intensity: number;
}

export async function updateColor(color: string) {
    const supabase = createClient();

    const {data: { user }} = await supabase.auth.getUser();

    supabase
        .from("profiles")
        .update({
            color: color,
        })
        .eq("id", user!.id)
        .then((res) => {
            console.log(res);
        });
}

export default function ChangeColors({
    userId,
    colors,
    setCurrentColor,
}: {
    userId: string;
    colors: Colors[];
    setCurrentColor: (color: string) => void;
}) {
    const [opened, { open, close }] = useDisclosure(false);

    const newColors = colors.filter((color) => color.lightness !== 0);

    const supabase = createClient();


    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                withCloseButton={false}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                classNames={{
                    content: classes.modal,
                    header: classes.header,
                    body: classes.modalBody,
                }}
                className="flex flex-col gap-2"
                centered
            >
                <h1 className="text-center font-bold text-2xl mb-3">
                    Cor de fundo
                </h1>
                <p className="text-woodsmoke-200">
                    Selecione a cor de fundo do seu perfil{" "}
                </p>
                <div className="flex gap-4 flex-wrap items-center mt-6">
                    {newColors.map((color) => (
                        <button
                            key={color.hex}
                            className={`rounded-xl w-8 h-8`}
                            style={{ backgroundColor: color.hex }}
                            onClick={() => {
                                setCurrentColor(color.hex);
                                updateColor(color.hex);
                                close();
                            }}
                        ></button>
                    ))}
                    <button
                        className={`rounded-xl w-8 h-8 bg-main-600`}
                        onClick={() => {
                            setCurrentColor("#6d6dc7");
                            updateColor("#6d6dc7");
                            close();
                        }}
                    ></button>
                </div>
            </Modal>
            <button
                className="px-8 py-2 rounded-full bg-main-600 font-bold text-woodsmoke-50 disabled:bg-gray-500 disabled:opacity-50"
                onClick={open}
            >
                Cor de fundo
            </button>
        </>
    );
}
