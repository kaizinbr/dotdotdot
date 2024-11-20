"use client";

import cx from "clsx";
import { useState, useCallback, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import {
    Menu,
    Button,
    Text,
    rem,
    Drawer,
    useMantineTheme
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./Navbar.module.css";
import {
    ChevronDown,
    Heart,
    Star,
    MessageCircle,
    Settings,
    SquareArrowRightIcon,
    LogOut,
    Pause,
    Trash,
    Menu as MenuIcon,
    Home,
    FileText,
    LibraryBig,
    SquarePen,
} from "lucide-react";
import Link from "next/link";
import AvatarB from "./Avatar";

// obrigado especial a https://blog.olivierlarose.com/ que me ajudou a montar essa ideia

import { AnimatePresence, motion } from "framer-motion";
import Btn from "./Button/Button";
import Nav from "./Nav/Nav";

export default function HeaderTabs({ user }: { user: User | null }) {
    // console.log(user);
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [fullname, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [website, setWebsite] = useState<string | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);

    const theme = useMantineTheme();
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    // let user: User | null = null;

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("profiles")
                .select(`full_name, username, website, avatar_url`)
                .eq("id", user?.id)
                .single();

            if (error && status !== 406) {
                console.log(error);
                throw error;
            }

            if (data) {
                setFullname(data.full_name);
                setUsername(data.username);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);
            }

            // console.log(data);
        } catch (error) {
            console.log("Error loading user data!");
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getProfile();
    }, [user, getProfile]);

    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Drawer
                opened={opened}
                onClose={close}
                overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
                size="xs"
                offset={8}
                radius="md"
                classNames={{
                    root: classes.drawer,
                    body: classes.drawerBody,
                    header: classes.drawerHeader,
                    content: classes.drawerContent,
                }}
            >
                {user === null ? (
                    <div className="">
                        <Link
                            href="/login"
                            className="py-2 px-2 rounded-md bg-stone-600/30"
                        >
                            Faça login ou cadastre-se
                        </Link>
                    </div>
                ) : (
                    <div className="flex-flex-col w-full">
                        <div className="flex flex-col justify-center items-center w-full">
                            <AvatarB size={128} url={avatar_url} />
                            <h1  className="mt-4 text-2xl font-semibold">
                                {fullname}
                            </h1>
                            <p className="mt-1 mb-4 text-lg">
                                @{username}
                            </p>
                        </div>
                        <ul className="flex flex-col gap-3">
                            <Link
                                href="/"
                                onClick={close}
                                className={`
                                        w-full flex flex-row items-center justify-start
                                        py-3 px-2 rounded-md
                                        hover:bg-woodsmoke-300 bg-transparent
                                        transition-all duration-300
                                    `}
                                    >
                                        <Home size="1.3rem" className="mr-4" /> Início
                                    </Link>
                            <Link
                                href="/manage"
                                onClick={close}
                                className={`
                                        w-full flex flex-row items-center justify-start
                                        py-3 px-2 rounded-md
                                        hover:bg-woodsmoke-300 bg-transparent
                                        transition-all duration-300
                                    `}
                                    >
                                        <FileText size="1.3rem" className="mr-4" /> Posts
                                    </Link>
                            <Link
                                href="/compose"
                                onClick={close}
                                className={`
                                        w-full flex flex-row items-center justify-start
                                        py-3 px-2 rounded-md
                                        hover:bg-woodsmoke-300 bg-transparent
                                        transition-all duration-300
                                    `}>
                                        <SquarePen size="1.3rem" className="mr-4" /> Criar post
                                    </Link>
                            <Link
                                href={`/profile/${username}`}
                                onClick={close}
                                className={`
                                        w-full flex flex-row items-center justify-start
                                        py-3 px-2 rounded-md
                                        hover:bg-woodsmoke-300 bg-transparent
                                        transition-all duration-300
                                    `}
                                    >
                                        <Settings size="1.3rem" className="mr-4" /> Configurações
                                    </Link>
                        </ul>
                    </div>
                )}
            </Drawer>

            <button onClick={open} className="fixed z-50 top-4 left-4">
                {user == null ? (
                    <MenuIcon />
                ) : (
                    <div className="border-2 rounded-full border-woodsmoke-300">
                        <AvatarB size={38} url={avatar_url} />
                    </div>
                )}
            </button>
        </>
    );
}