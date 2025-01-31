"use client";

import ArtisticText from "@/components/core/ArtisticText";
import Icon from "@/components/core/Icon";
import Pc from "@/components/core/responsive/Pc";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import AvatarB from "@/components/Navbar/Avatar";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import {
    TbUserFilled,
    TbFolderFilled,
    TbSquareRoundedPlusFilled,
    TbSquareRoundedArrowLeftFilled,
} from "react-icons/tb";
import { HiUsers } from "react-icons/hi2";

export default function ArtisticHeader({ user }: { user: User | null }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isFloating, setIsFloating] = useState(pathname !== "/");
    // const pathname = usePathname();
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState<string | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);

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
                setUsername(data.username);
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

    useEffect(() => {
        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    function handleScroll() {
        const top = window.scrollY;
        if (pathname !== "/") return setIsFloating(true);
        setIsFloating(top > 30);
    }

    function handlePush(path: string) {
        router.push(path);
    }
    // console.log(pathname);

    const isDisplayedOnMobile = ["/", "/profile", "/chapter", "/talk"].includes(
        pathname,
    );

    // console.log(isDisplayedOnMobile);

    const isExpanded = pathname.startsWith("/video/");

    return (
        <div
            data-expanded={isExpanded}
            data-floating={true}
            data-mobile={true}
            className={`
                    group fixed left-0 top-0 right-0 z-40 max-w-screen-lg  p-4  transition-all duration-300
                    border 
                    hidden
                    lg:block 
                    backdrop-blur-xl border-b
                    bg-woodsmoke-900/70 border-woodsmoke-900/70  
                     data-[expanded=true]:lg:block data-[mobile=false]:lg:block 
                `}
        >
            <div className="flex items-center justify-between h-full lg:mx-auto">
                <div className="flex items-center gap-48 h-full">
                    <Pc>
                        <div className="flex flex-row items-center justify-between  h-full gap-6">
                            <div className="flex flex-row items-center h-full gap-6">
                                <Link
                                    data-active={
                                        pathname === "/compose" ||
                                        pathname === `/profile${username}`
                                    }
                                    href={`/compose`}
                                    className={`
                                            jelly jelly-increased flex basis-0 cursor-pointer
                                            flex-col items-center gap-1
                                            text-woodsmoke-400 data-[active=true]:text-main-600
                                            selected:text-gray-300 data-[active=true]:hover:text-main-400
                                            hover:text-main-400
                                            transition-all duration-200 ease-in-out
                                        `}
                                >
                                    <TbSquareRoundedArrowLeftFilled className="size-7" />
                                    <div className="text-12 font-600">
                                        Voltar
                                    </div>
                                </Link>
                                <Link
                                    data-active={pathname === "/"}
                                    href={`/`}
                                    className={`
                                            jelly jelly-increased flex basis-0 cursor-pointer
                                            flex-col items-center gap-1
                                            text-woodsmoke-400 data-[active=true]:text-main-600
                                            selected:text-gray-300 data-[active=true]:hover:text-main-400
                                            hover:text-main-400
                                            transition-all duration-200 ease-in-out
                                        `}
                                >
                                    <Icon type="home" className="h-6" />
                                    <div className="text-12 font-600">Home</div>
                                </Link>
                                <Link
                                    data-active={
                                        pathname === "/compose" ||
                                        pathname === `/profile${username}`
                                    }
                                    href={`/compose`}
                                    className={`
                                            jelly jelly-increased flex basis-0 cursor-pointer
                                            flex-col items-center gap-1
                                            text-woodsmoke-400 data-[active=true]:text-main-600
                                            selected:text-gray-300 data-[active=true]:hover:text-main-400
                                            hover:text-main-400
                                            transition-all duration-200 ease-in-out
                                        `}
                                >
                                    <TbSquareRoundedPlusFilled className="size-7" />
                                    <div className="text-12 font-600">
                                        Criar
                                    </div>
                                </Link>
                                <Link
                                    data-active={pathname === "/manage"}
                                    href={`/manage`}
                                    className={`
                                            jelly jelly-increased flex basis-0 cursor-pointer
                                            flex-col items-center gap-1
                                            text-woodsmoke-400 data-[active=true]:text-main-600
                                            selected:text-gray-300 data-[active=true]:hover:text-main-400
                                            hover:text-main-400
                                            transition-all duration-200 ease-in-out
                                            
                                        `}
                                >
                                    <TbFolderFilled className="size-7" />
                                    <div className="text-12 font-600">Meus</div>
                                </Link>
                                <Link
                                    data-active={pathname === "/manage"}
                                    href={`/manage`}
                                    className={`
                                            jelly jelly-increased flex basis-0 cursor-pointer
                                            flex-col items-center gap-1
                                            text-woodsmoke-400 data-[active=true]:text-main-600
                                            selected:text-gray-300 data-[active=true]:hover:text-main-400
                                            hover:text-main-400
                                            transition-all duration-200 ease-in-out
                                            
                                        `}
                                >
                                    <HiUsers className="size-7" />
                                    <div className="text-12 font-600">
                                        Pessoas
                                    </div>
                                </Link>
                            </div>
                            <Link
                                data-active={pathname === "/profile"}
                                href={`/profile${username ? "/" + username : ""}`}
                                className={`
                                        jelly jelly-increased flex basis-0 cursor-pointer
                                        flex-col items-center gap-1
                                        text-woodsmoke-400 data-[active=true]:text-main-600
                                        selected:text-gray-300 data-[active=true]:hover:text-main-400
                                        hover:text-main-400 group/card
                                        \
                                    `}
                            >
                                {avatar_url ? (
                                    <div className="rounded-full border-2 border-woodsmoke-400 p-[2px] data-[active=true]:border-main-600 group-hover/card:border-main-400 data-[active=true]:group-hover/card:border-main-400 transition-all duration-200 ease-in-out">
                                        <AvatarB size={28} url={avatar_url} />
                                    </div>
                                ) : (
                                    <TbUserFilled className="size-7" />
                                )}
                                <div className="text-12 font-600">Perfil</div>
                            </Link>
                        </div>
                    </Pc>
                </div>
                {/* <Link
                    href={`/profile${username ? "/" + username : ""}`}
                    className="group-jelly group-jelly-increased -m-8 p-8 group-hover:scale-105"
                >
                    {avatar_url ? (
                        <AvatarB size={24} url={avatar_url} />
                    ) : (
                        <TbUserFilled className="size-6" />
                    )}
                </Link> */}
            </div>
        </div>
    );
}
