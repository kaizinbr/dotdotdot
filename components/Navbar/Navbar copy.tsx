"use client";

import ArtisticText from "@/components/core/ArtisticText";
import Icon from "@/components/core/Icon";
import Pc from "@/components/core/responsive/Pc";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ArtisticHeader() {
    const pathname = usePathname();
    const router = useRouter();
    const [isFloating, setIsFloating] = useState(pathname !== "/");

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

    const isDisplayedOnMobile = ["/", "/discover", "/mixer", "/talk"].includes(
        pathname,
    );
    const isExpanded = pathname.startsWith("/video/");

    return (
        <div
            data-expanded={isExpanded}
            data-floating={isFloating}
            data-mobile={isDisplayedOnMobile}
            className="group fixed left-1/2 top-0 z-20 w-full max-w-screen-lgx -translate-x-1/2 p-24 text-white transition-all data-[mobile=false]:hidden data-[expanded=true]:max-w-screen-xlgx data-[floating=true]:bg-gray-50/80 data-[floating=true]:py-20 data-[floating=true]:text-black data-[floating=true]:backdrop-blur-lg data-[expanded=true]:lg:block lgx:rounded-full data-[expanded=true]:lgx:!top-16 data-[floating=true]:lgx:top-8 data-[mobile=false]:lgx:block data-[expanded=true]:lgx:w-artistic-header-expanded-width-lg data-[floating=true]:lgx:px-28 data-[floating=true]:lgx:py-16 data-[expanded=true]:xlgx:w-full"
        >
            <div className="flex items-center justify-between lg:mx-auto lg:max-w-screen-lg group-data-[expanded=true]:lg:max-w-screen-xl">
                <div className="flex items-center gap-48">
                    <Link
                        href={`/`}
                        className="group-data-[floating=true]:jelly group-data-[floating=true]:hover:scale-105"
                    >
                        <ArtisticText
                            type="maeum"
                            onClick={() => handlePush("/")}
                            className="h-24 cursor-pointer transition-all group-data-[floating=true]:h-20 group-data-[floating=true]:text-primary-500"
                        />
                    </Link>
                    <Pc>
                        <div className="flex items-center gap-24">
                            <Link
                                data-active={pathname === "/"}
                                href={`/`}
                                className="jelly cursor-pointer text-20 font-500 opacity-60 transition-all hover:opacity-80 data-[active=true]:font-700 data-[active=true]:opacity-100 group-data-[floating=true]:text-16"
                            >
                                Home
                            </Link>
                            <Link
                                data-active={pathname === "/discover"}
                                href={`/discover`}
                                className="jelly cursor-pointer text-20 font-500 opacity-60 transition-all hover:opacity-80 data-[active=true]:font-700 data-[active=true]:opacity-100 group-data-[floating=true]:text-16"
                            >
                                Discover
                            </Link>
                            <Link
                                data-active={pathname === "/talk"}
                                href={`/talk`}
                                className="jelly cursor-pointer text-20 font-500 opacity-60 transition-all hover:opacity-80 data-[active=true]:font-700 data-[active=true]:opacity-100 group-data-[floating=true]:text-16"
                            >
                                Talk
                            </Link>
                            <Link
                                data-active={pathname === "/mixer"}
                                href={`/mixer`}
                                className="jelly cursor-pointer text-20 font-500 opacity-60 transition-all hover:opacity-80 data-[active=true]:font-700 data-[active=true]:opacity-100 group-data-[floating=true]:text-16"
                            >
                                Stage Mixer
                            </Link>
                        </div>
                    </Pc>
                </div>
                <Link
                    href={`/settings`}
                    className="group-data-[floating=true]:jelly group-data-[floating=true]:jelly-increased -m-8 p-8 group-data-[floating=true]:hover:scale-105"
                >
                    <Icon
                        type="settings"
                        className="w-24 cursor-pointer transition-all group-data-[floating=true]:w-20 group-data-[floating=true]:text-gray-500"
                    />
                </Link>
            </div>
        </div>
    );
}
