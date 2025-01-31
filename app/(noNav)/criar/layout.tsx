import Navbar from "@/components/Navbar/Navbar";
import ArtisticHeader from "@/components/core/header/ArtisticHeader";
import { createClient } from "@/utils/supabase/server";
import Navigator from "@/components/core/Navigator";
import Transistor from "@/components/core/Transitor";
import Mobile from "@/components/core/responsive/Mobile";

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Novo post",
    description: "...",
};

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return <div className="">{children}</div>;
}
