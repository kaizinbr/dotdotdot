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
} from "react-icons/tb";

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
    }, [pathname]);

    function handleScroll() {
        const top = window.scrollY;
        if (pathname !== "/") return setIsFloating(true);
        setIsFloating(top > 30);
    }

    function handlePush(path: string) {
        router.push(path);
    }
    console.log(pathname)

    const isDisplayedOnMobile = ["/", "/profile", "/chapter", "/talk"].includes(
        pathname,
    );

    // console.log(isDisplayedOnMobile);

    const isExpanded = pathname.startsWith("/video/");

    return (
        <div
            data-expanded={isExpanded}
            data-floating={isFloating}
            data-mobile={true}
            className={`
                    group fixed left-1/2 top-0 z-40 w-full max-w-screen-lg -translate-x-1/2 p-6  transition-all duration-300
                    border border-transparent data-[floating=true]:lg:border-woodsmoke-700/90 
                    hidden
                    lg:block data-[expanded=true]:max-w-screen-xlg data-[floating=true]:bg-woodsmoke-600/90  data-[floating=true]:py-5 
                    data-[floating=true]: data-[floating=true]:backdrop-blur-lg data-[expanded=true]:lg:block lg:rounded-full
                    data-[expanded=true]:lg:!top-4 data-[floating=true]:lg:top-8 data-[mobile=false]:lg:block 
                    data-[expanded=true]:lg:w-artistic-header-expanded-width-lg data-[floating=true]:lg:px-7 
                    data-[floating=true]:lg:py-4 data-[expanded=true]:xlg:w-full
                `}
        >
            <div className="flex items-center justify-between lg:mx-auto lg:max-w-screen-lg group-data-[expanded=true]:lg:max-w-screen-xl">
                <div className="flex items-center gap-48">
                    <Pc>
                        <div className="flex items-center gap-6">
                            <Link
                                data-active={pathname === "/"}
                                href={`/`}
                                className="jelly cursor-pointer text-5 font-500 opacity-60 transition-all hover:opacity-80 data-[active=true]:font-700 data-[active=true]:opacity-100 group-data-[floating=true]:text-4"
                            >
                                Home
                            </Link>
                            <Link
                                data-active={pathname === "/create" || pathname === `/profile${username}`}
                                href={`/create`}
                                className="jelly cursor-pointer text-5 font-500 opacity-60 transition-all hover:opacity-80 data-[active=true]:font-700 data-[active=true]:opacity-100 group-data-[floating=true]:text-4"
                            >
                                Novo post
                            </Link>
                            <Link
                                data-active={pathname === "/manage"}
                                href={`/manage`}
                                className="jelly cursor-pointer text-5 font-500 opacity-60 transition-all hover:opacity-80 data-[active=true]:font-700 data-[active=true]:opacity-100 group-data-[floating=true]:text-4"
                            >
                                Seus posts
                            </Link>
                            <Link
                                data-active={pathname === "/profile"}
                                href={`/profile${username ? "/" + username : ""}`}
                                className="jelly cursor-pointer text-5 font-500 opacity-60 transition-all hover:opacity-80 data-[active=true]:font-700 data-[active=true]:opacity-100 group-data-[floating=true]:text-4"
                            >
                                Perfil
                            </Link>
                        </div>
                    </Pc>
                </div>
                <Link
                    href={`/profile${username ? "/" + username : ""}`}
                    className="group-data-[floating=true]:jelly group-data-[floating=true]:jelly-increased -m-8 p-8 group-data-[floating=true]:hover:scale-105"
                >
                    {avatar_url ? (
                        <AvatarB size={24} url={avatar_url} />
                    ) : (
                        <TbUserFilled className="size-6" />
                    )}
                </Link>
            </div>
        </div>
    );
}
