import { Menu, Button, Text, rem } from "@mantine/core";
import {
    Trash2,
    Eye,
    EllipsisVertical,
    Flag,
    ShieldX,
    Bookmark,
    UserRoundPlus,
} from "lucide-react";

import {
    TbMail,
    TbShare3,
    TbBrandTwitter,
    TbBrandWhatsapp,
    TbLink
} from "react-icons/tb";
import classes from "@/styles/EditOptions.module.css";

import { WhatsappShare, TwitterShare, EmailShare } from "react-share-kit";

import React, { useState, useEffect } from "react";

const useCopyToClipboard = () => {
    const [isCopied, setIsCopied] = useState(false);

    const copyToClipboard = async ({ content }: { content: string }) => {
        try {
            await navigator.clipboard.writeText(content);
            setIsCopied(true);
            console.log("Copied to clipboard:", content);
        } catch (error) {
            setIsCopied(false);
            console.error("Unable to copy to clipboard:", error);
        }
    };

    return { isCopied, copyToClipboard };
};

const CopyToClipboardButton = ({ content }: { content: string }) => {
    const { isCopied, copyToClipboard } = useCopyToClipboard();

    return (
        <div>
            <button onClick={() => copyToClipboard({content})}>
                {isCopied ? "Copiado!" : "Copiar Link"}
            </button>
        </div>
    );
};

export default function ShareBtn({
    room,
    edit,
}: {
    room?: any;
    edit?: Boolean;
}) {
    const [baseUrl, setBaseUrl] = useState<string>("");
    useEffect(() => {
        setBaseUrl(window.location.origin);
    }, []);
    return (
        <Menu
            shadow="md"
            width={200}
            position="right-end"
            offset={0}
            classNames={{
                dropdown:
                    classes.dropdown +
                    " !bg-woodsmoke-600/80 !border-woodsmoke-500/50 rounded-xl",
            }}
        >
            <Menu.Target>
                <button
                    className={`z-40 size-6`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <TbShare3 className="size-6 text-woodsmoke-100" />
                </button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Compartilhar</Menu.Label>
                <Menu.Item
                    leftSection={
                        <TbLink
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                    className=" !text-woodsmoke-50 data-[hovered=true]:!bg-woodsmoke-500"
                >
                    <CopyToClipboardButton content={`${baseUrl}status/${room}`} />
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <TbBrandWhatsapp
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                    className=" !text-woodsmoke-50 data-[hovered=true]:!bg-woodsmoke-500"
                >
                    <WhatsappShare
                        url={`${baseUrl}status/${room}`}
                        blankTarget={true}
                        buttonTitle={"WhatsApp"}
                    />
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <TbBrandTwitter
                            style={{ width: rem(14), height: rem(14) }}
                        />
                    }
                    className=" !text-woodsmoke-50 data-[hovered=true]:!bg-woodsmoke-500"
                >
                    <TwitterShare
                        url={`${baseUrl}status/${room}`}
                        blankTarget={true}
                        buttonTitle={"Twitter"}
                    />
                </Menu.Item>
                <Menu.Item
                    leftSection={
                        <TbMail style={{ width: rem(14), height: rem(14) }} />
                    }
                    className=" !text-woodsmoke-50 data-[hovered=true]:!bg-woodsmoke-500"
                >
                    <EmailShare
                        url={`${baseUrl}status/${room}`}
                        blankTarget={true}
                        buttonTitle={"E-Mail"}
                    />
                </Menu.Item>
            </Menu.Dropdown>
        </Menu>
    );
}
