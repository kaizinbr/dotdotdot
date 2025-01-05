"use client";

import { Toolbar } from "@/components/ui/Toolbar";
import Icon from "@/components/core/Icon";
import { usePathname, useRouter } from "next/navigation";
import useScrollDirection from "@/hooks/useScrollDirection";
import ShareBtn from "@/components/posts/ShareBtn";

export default function DetailsHeader({
    content,
    fullname,
    username,
    room,
    isPost,
    img,
}: {
    content?: string;
    fullname?: string;
    username?: string;
    room?: string;
    isPost?: boolean;
    img?: string;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const scrollDirection = useScrollDirection();

    function handleBackClick() {
        router.back();
    }

    let title: string;
    switch (pathname) {
        case "/videos":
            title = "Videos";
            break;
        case "/musics":
            title = "Musics";
            break;
        case "/photocards":
            title = "Photocards";
            break;
        case "/videos/cover":
            title = "Cover";
            break;
        case "/videos/challenge":
            title = "Challenge";
            break;
        case "/videos/live":
            title = "Live";
            break;
        case "/videos/shorts":
            title = "Shorts";
            break;
        case "/schedules":
            title = "Calendar";
            break;
        case "/talk/write":
            title = "Write";
            break;
        case "/talk/login":
            title = "Login";
            break;
        default:
            title = content || "";
    }
    console.log(fullname, username, img);
    return (
        <div
            className={`
            fixed left-0 z-20 h-12 w-full
            ${scrollDirection == "down" ? "-top-20" : "top-0"}
            transition-all duration-300
            lg:hidden

            h-16 z-[500] flex flex-row items-center justify-between flex-none py-2 px-6
            backdrop-blur-xl border-b
            bg-woodsmoke-900/70 border-woodsmoke-900/70 
        `}
        >
            {/* <div className="absolute h-12 w-full lg:left-1/2 lg:max-w-screen-lgx lg:-translate-x-1/2"> */}
                <div className="flex flex-row gap-x-1.5 items-center">
                    <Toolbar.Button
                        tooltip={"Voltar"}
                        onClick={handleBackClick}
                        className={"px-0 text-woodsmoke-200"}
                    >
                        <Icon type="left" className="w-4" />
                    </Toolbar.Button>
                </div>
                <div className="text-center flex flex-col h-full w-20 justify-center items-center">
                    {isPost ? (
                        <>
                            <h2 className=" text-base font-700 text-woodsmoke-100 mx-auto w-2/3 line-clamp-1 overflow-hidden">
                                Post
                            </h2>
                        </>
                    ) : (
                        <h2 className=" text-xl font-700 text-black ">
                            {content}
                        </h2>
                    )}
                </div>
                <div className="flex flex-row gap-x-1.5 items-center">
                    <Toolbar.Button
                        tooltip={"Compartilhar"}
                        className={"px-0 text-woodsmoke-200"}
                    >
                        <ShareBtn room={room} />
                    </Toolbar.Button>
                </div>
        </div>
    );
}
