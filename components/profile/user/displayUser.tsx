"use client";
import { useCallback, useEffect, useState, ChangeEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import Avatar from "../../posts/AvatarDisplay";
import { useSearchParams, useRouter } from "next/navigation";
import { getPastRelativeTime, formatTimeAsDate } from "@/lib/utils/time";
import { TbLink, TbCalendar } from "react-icons/tb";
import FollowBtn from "@/components/core/FollowBtn";
import getFollowers from "@/lib/utils/getFollowers";
import getFollowing from "@/lib/utils/getFollowing";


export default function DisplayUser({ user }: { user: any }) {
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [created_at, setCreatedAt] = useState<Date>(
        new Date(2005, 4, 26, 0, 0, 0),
    );
    const [id, setId] = useState<string | null>(null);
    const [fullname, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [website, setWebsite] = useState<string | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);
    const [bio, setBio] = useState<string | null>(null);
    const [pronouns, setPronouns] = useState<string | null>(null);
    const [followers, setFollowers] = useState<number>(0);
    const [following, setFollowing] = useState<number>(0);

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("profiles")
                .select("*")
                .eq("username", user[0]?.username)
                .single();

            if (error && status !== 406) {
                console.log(error);
                throw error;
            }

            if (data) {
                setCreatedAt(data.created_at);
                setId(data.id);
                setFullname(data.full_name);
                setUsername(data.username);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);
                setBio(data.bio);
                setPronouns(data.pronouns);

                const followers = await getFollowers(data.id);
                setFollowers(followers.totalFollowers);
                
                const following = await getFollowing(data.id);
                setFollowing(following.totalFollowing);

            }
        } catch (error) {
            alert("Error loading user data!");
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => {
        getProfile();
    }, [user, getProfile]);

    const router = useRouter();

    return (
        <div className="form-widget  flex flex-col justify-center w-full max-h-screen md:max-w-md md:w-2/5">
            
            <div className="md:fixed top-0 bottom-0 w-full pt-16 md:pt-0 md:max-w-md md:w-2/5 px-8 md:px-0 md:pl-16 flex flex-col justify-center">
                <div
                    className={`
                        flex flex-col justify-start
                        w-full
                    `}
                >
                    <div
                        className={`
                            bgPfp flex flex-col justify-end items-start relative
                            h-56 w-full
                        `}
                    >
                        <div
                            className={`
            
                                flex flex-row justify-center items-end
                                gap-3 pt-8 px-4 w-full h-56
                                z-30
                            `}
                        >
                            <picture
                                className={`
                                    flex flex-row justify-center items-center
                                    bg-neutral-800 rounded-full overflow-hidden
                                    size-28
                    
                                `}
                            >
                                {avatar_url && (
                                    <div className="flex relative flex-col justify-center items-center size-28 rounded-full ">
                                        <Avatar
                                            size={114}
                                            url={avatar_url}
                                            username={username}
                                            intrisicSize={"size-28"}
                                        />
                                    </div>
                                )}
                            </picture>
                        </div>
                    </div>
                </div>
                <div
                    className={`
                        profile  flex-col-reverse
                        flex items-center justify-center
                        col-span-6 lg:col-span-4
                        relative
                        w-full
                        mt-4
                    `}
                >
                    <div
                        className={`
            
                                flex flex-col justify-center lg:items-center
            
                                bg-default-fill
                                rounded-3xl w-full
                                gap-6
                            `}
                    >
                        <div className="flex flex-col justify-start items-center w-full">
                            <div>
                                <p
                                    className={`
                                             rounded-lg
                                            outline-none
                                             w-full
                                            transition duration-200 ease-in-out
                                            text-3xl font-bold
                                        `}
                                >
                                    {fullname || ""}
                                </p>
                            </div>
                            <div className="flex flex-row py-1 text-woodsmoke-200">
                                <span className="text-lg font-medium">@</span>
                                <p
                                    className={`
                                            rounded-lg
                                            outline-none
                                             w-full
                                            transition duration-200 ease-in-out
                                            text-lg  font-medium
                                        `}
                                >
                                    {username || ""}
                                </p>
                            </div>
                            {pronouns && (<div>
                                <p
                                    className={`
                                            rounded-lg
                                            outline-none
                                            w-full
                                            transition duration-200 ease-in-out
                                            text-base  font-medium py-1 text-woodsmoke-200
                                        `}
                                >
                                    {pronouns || ""}
                                </p>
                            </div>)}
                            <div className="flex flex-row gap-4 w-full justify-center items-center">
                                <Link 
                                    href={`/profile/${username}/followers`}
                                    className={`
                                            rounded-lg
                                            outline-none
                                            transition duration-200 ease-in-out
                                            text-base  font-medium py-1 text-woodsmoke-200
                                            text-right
                                        `}
                                >
                                    {followers} Seguidores
                                </Link>
                                <Link
                                    href={`/profile/${username}/following`}
                                    className={`
                                            rounded-lg
                                            outline-none
                                            transition duration-200 ease-in-out
                                            text-base  font-medium py-1 text-woodsmoke-200
                                        `}
                                >
                                    {following} Seguindo
                                </Link>
                            </div>
                            {/* <button className="mt-3 px-8 py-2 rounded-full bg-main-600 text-woodsmoke-50">
                                Seguir
                            </button> */}
                            <FollowBtn id={id} followers={followers} setFollowers={setFollowers} />
                        </div>
                        <div className="flex flex-col gap-2 w-full">
                            {bio && (<div
                                className={`
            
                                    text-base
                                    w-full text-wrap
                                `}
                            >
                                <p className="text-woodsmoke-200 font-medium text-wrap break-words">
                                    {bio || ""}
                                </p>
                            </div>)}

                            <div className="flex flex-row text-sm text-woodsmoke-200 items-center gap-1">
                                    <TbCalendar />
                                <p
                                >
                                    Se juntou em{" "}
                                    {formatTimeAsDate(new Date(created_at)) ||
                                        ""}
                                </p>
                            </div>
                            {website && (<div className="flex flex-row text-sm text-woodsmoke-200 items-center gap-1">
                                    <TbLink />
                                <Link
                                    href={`https://${website}`}
                                    className={`
                                            text-sm text-woodsmoke-200 underline
                                        `}
                                    target="_blank"
                                >
                                    {website || ""}
                                </Link>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
