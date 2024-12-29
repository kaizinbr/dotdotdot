"use client";
import { useCallback, useEffect, useState, ChangeEvent } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import Avatar from "./AvatarEdit";
import { Textarea } from "@mantine/core";
import { useSearchParams, useRouter } from "next/navigation";
import containsSpecialChars from "@/lib/utils/containsSpecialChars";
import usernameAlreadyExists from "@/lib/utils/usernameAlreadyExists";
import Link from "next/link";
import Icon from "@/components/core/Icon";
import getFollowers from "@/lib/utils/getFollowers";
import getFollowing from "@/lib/utils/getFollowing";

import classes from "./AcForm.module.css";

export default function AccountForm({ user }: { user: User | null }) {
    const supabase = createClient();
    const [loading, setLoading] = useState(true);
    const [fullname, setFullname] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>(null);
    const [originalUsername, setOriginalUsername] = useState<string | null>(
        null,
    );
    const [website, setWebsite] = useState<string | null>(null);
    const [avatar_url, setAvatarUrl] = useState<string | null>(null);
    const [bio, setBio] = useState<string | null>(null);
    const [pronouns, setPronouns] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [canUpdate, setCanUpdate] = useState<boolean>(false);
    const [followers, setFollowers] = useState<number>(0);
    const [following, setFollowing] = useState<number>(0);

    const handleEditUsername = (e: ChangeEvent<HTMLInputElement>) => {
        if (containsSpecialChars(e.target.value)) {
            setMessage(
                "O nome de usuário não pode conter caracteres especiais",
            );
            setCanUpdate(false);
            return;
        }

        if (e.target.value.length > 15) {
            setMessage("O nome de usuário deve ter no máximo 15 caracteres");
            setCanUpdate(false);
            return;
        }

        usernameAlreadyExists({
            username: e.target.value,
            actualUsername: originalUsername as string,
        }).then((exists) => {
            console.log(exists);
            if (exists) {
                setMessage("Este nome de usuário já está em uso!");
                setCanUpdate(false);
                return;
            }
            setMessage(null);
        });

        setUsername(e.target.value);
        setCanUpdate(true);
    };

    const getProfile = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error, status } = await supabase
                .from("profiles")
                .select(
                    `full_name, username, website, avatar_url, bio, pronouns`,
                )
                .eq("id", user?.id)
                .single();

            if (error && status !== 406) {
                console.log(error);
                throw error;
            }

            if (data) {
                setFullname(data.full_name);
                setUsername(data.username);
                setOriginalUsername(data.username);
                setWebsite(data.website);
                setAvatarUrl(data.avatar_url);
                setBio(data.bio);
                setPronouns(data.pronouns);
                const followers = await getFollowers(user!.id);
                setFollowers(followers.totalFollowers);

                const following = await getFollowing(user!.id);
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

    async function updateProfile({
        username,
        website,
        avatar_url,
        fullname,
        bio,
        pronouns,
    }: {
        username: string | null;
        fullname: string | null;
        website: string | null;
        avatar_url: string | null;
        bio: string | null;
        pronouns: string | null;
    }) {
        try {
            setLoading(true);

            const lowecased = username?.toLowerCase();

            const { error } = await supabase.from("profiles").upsert({
                id: user?.id as string,
                full_name: fullname,
                username,
                lower_username: lowecased,
                website,
                avatar_url,
                bio,
                pronouns,
                updated_at: new Date().toISOString(),
            });
            if (error) throw error;
            alert("Profile updated!");
        } catch (error) {
            alert("Error updating the data!");
        } finally {
            setLoading(false);
        }
    }

    async function updateUsername({ username }: { username: string | null }) {
        try {
            setLoading(true);

            const lowecased = username?.toLowerCase();

            const { error } = await supabase.from("profiles").upsert({
                id: user?.id as string,
                username,
                lower_username: username?.toLowerCase(),
                updated_at: new Date().toISOString(),
            });
            if (error) throw error;
            router.push(`/profile/${username}`);
        } catch (error) {
            alert("Error updating the data!");
        } finally {
            setLoading(false);
        }
    }

    const router = useRouter();

    return (
        <>
            <div className="form-widget flex flex-col justify-center w-full max-h-screen md:max-w-md md:w-2/5 overflow-hidden">
                <div
                    className={`
                        md:fixed top-0 bottom-0 w-full pt-16 md:pt-0 md:max-w-md md:w-2/5 px-8 md:px-0 md:pl-16 flex flex-col justify-center
                    `}
                >
                    <div
                        className={`
                        flex flex-col justify-start
                        size-10
                    `}
                    >
                        <Link
                            href={"/profile/settings"}
                            className="p-2 rounded-lg hover:bg-woodsmoke-300/60 bg-transparent transition-all duration-200"
                        >
                            <Icon
                                className="cursor-pointer size-6"
                                type={"settings"}
                            />
                        </Link>
                    </div>

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
                                    bg-gradient-to- from-transparent to-black/45 from-40%
                                    z-30
                                `}
                            >
                                <Avatar
                                    uid={user?.id ?? null}
                                    url={avatar_url}
                                    size={114}
                                    username={username}
                                    onUpload={(url) => {
                                        setAvatarUrl(url);
                                        updateProfile({
                                            fullname,
                                            username,
                                            website,
                                            avatar_url: url,
                                            pronouns,
                                            bio,
                                        });
                                    }}
                                />
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
                                gap-3
                            `}
                        >
                            <form
                                autoComplete="off"
                                spellCheck="false"
                                className="flex flex-col justify-start items-start w-full"
                            >
                                <div className=" w-full">
                                    <input
                                        type="text"
                                        name="name"
                                        value={fullname || ""}
                                        onChange={(e) => {
                                            setFullname(e.target.value);
                                            setCanUpdate(true);
                                        }}
                                        placeholder="Seu Nome..."
                                        className={`
                                            rounded-lg
                                            outline-none
                                            bg-woodsmoke-900
                                            w-full
                                            transition duration-200 ease-in-out
                                            text-3xl font-bold
                                        `}
                                    ></input>
                                </div>
                                <div className="flex flex-col items-center w-full">
                                    <div
                                        className={`
                                            flex flex-row py-1 w-full
                                                ${message ? "text-red-400" : "text-woodsmoke-200"}
                                        `}
                                    >
                                        <span className="text-lg font-medium ">
                                            @
                                        </span>
                                        <input
                                            type="text"
                                            name="username"
                                            value={username || ""}
                                            onChange={(e) =>
                                                handleEditUsername(e)
                                            }
                                            placeholder="Seu Username..."
                                            className={`
                                                rounded-lg
                                                outline-none
                                                bg-woodsmoke-900
                                                transition duration-200 ease-in-out
                                                text-lg  font-medium w-min
                                            `}
                                        ></input>
                                    </div>
                                    <span
                                        className={`text-xs  text-red-400 ${message ? "mb-2" : ""}`}
                                    >
                                        {message ? message : ""}
                                    </span>
                                </div>

                                <Link
                                    href={`/profile/${username}/followers`}
                                    className={`
                                            rounded-lg
                                            outline-none
                                            transition duration-200 ease-in-out
                                            text-base  font-medium py-1 text-woodsmoke-200
                                            
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
                                <div className=" w-full">
                                    <input
                                        type="text"
                                        name="website"
                                        value={website || ""}
                                        onChange={(e) =>    {
                                            setWebsite(e.target.value);
                                            setCanUpdate(true);
                                        }
                                        }
                                        placeholder="Site"
                                        className={`
                                            rounded-lg
                                            outline-none
                                            bg-woodsmoke-900 w-full
                                            transition duration-200 ease-in-out
                                            text-base text-woodsmoke-200 font-medium py-1
                                        `}
                                    ></input>
                                </div>
                                <div className=" w-full">
                                    <input
                                        type="text"
                                        name="pronouns"
                                        value={pronouns || ""}
                                        onChange={(e) =>
                                        {
                                            setPronouns(e.target.value);
                                            setCanUpdate(true);
                                        }
                                        }
                                        placeholder="Pronomes"
                                        className={`
                                            rounded-lg
                                            outline-none
                                            bg-woodsmoke-900
                                            transition duration-200 ease-in-out
                                            text-base text-woodsmoke-200 font-medium py-1 
                                        `}
                                    ></input>
                                </div>
                                <div
                                    className={`
                                   bg-woodsmoke-900 w-full
                                    text-base text-woodsmoke-200 font-medium
                                `}
                                >
                                    <Textarea
                                        label=""
                                        placeholder="Sua bio"
                                        autosize
                                        variant="unstyled"
                                        minRows={2}
                                        maxRows={4}
                                        value={bio || ""}
                                        classNames={{
                                            root: "w-full",
                                            input: classes.textareaInput,
                                        }}
                                        onChange={(e) => {
                                            setBio(e.currentTarget.value);
                                            setCanUpdate(true);
                                        }}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="flex w-full">
                        <button
                            className="px-8 py-2 rounded-full bg-main-600 font-bold text-woodsmoke-50 disabled:bg-gray-500 disabled:opacity-50"
                            onClick={() =>
                                updateProfile({
                                    fullname,
                                    username,
                                    website,
                                    avatar_url,
                                    pronouns,
                                    bio,
                                })
                            }
                            disabled={loading || message !== null || !canUpdate}
                        >
                            {loading ? "Salvando..." : "Salvar"}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
