"use client";

import { Suspense, useState } from "react";
import { FloatingIndicator, Tabs } from "@mantine/core";
import classes from "./Demo.module.css";
import { InvoicesMobileSkeleton } from "../Skeletons";
import Results from "./Results";

export default function MainTabs({
    query,
    currentPage,
}: {
    query: string;
    currentPage: number;
}) {
    const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
    const [value, setValue] = useState<string | null>("1");
    const [controlsRefs, setControlsRefs] = useState<
        Record<string, HTMLButtonElement | null>
    >({});
    const setControlRef = (val: string) => (node: HTMLButtonElement) => {
        controlsRefs[val] = node;
        setControlsRefs(controlsRefs);
    };

    return (
        <Tabs
            variant="none"
            value={value}
            onChange={setValue}
            className="w-full"
        >
            <Tabs.List ref={setRootRef} className={classes.list}>
                <div className="flex flex-row">
                    <Tabs.Tab
                        value="1"
                        ref={setControlRef("1")}
                        className={classes.tab}
                    >
                        Pessoas
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="2"
                        ref={setControlRef("2")}
                        className={classes.tab}
                    >
                        Posts
                    </Tabs.Tab>
                </div>
                {/* <Tabs.Tab
                    value="3"
                    ref={setControlRef("3")}
                    className={classes.tab}
                >
                    Third tab
                </Tabs.Tab> */}

                <FloatingIndicator
                    target={value ? controlsRefs[value] : null}
                    parent={rootRef}
                    className={classes.indicator}
                />
            </Tabs.List>

            <Tabs.Panel value="1">
                <Suspense
                    key={query + currentPage}
                    fallback={<InvoicesMobileSkeleton />}
                >
                <h1 className="font-bold text-2xl mb-2 px-4">Pessoas</h1>
                    <Results query={query} currentPage={currentPage} type="users" />
                </Suspense>
            </Tabs.Panel>
            <Tabs.Panel value="2">
                <Suspense
                    key={query + currentPage}
                    fallback={<InvoicesMobileSkeleton />}
                >
                <h1 className="font-bold text-2xl mb-2 px-4">Posts</h1>
                    <Results query={query} currentPage={currentPage} type="posts" />
                </Suspense>
            </Tabs.Panel>
            {/* <Tabs.Panel value="3">Third tab content</Tabs.Panel> */}
        </Tabs>
    );
}
