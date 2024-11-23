import { Tabs, rem } from "@mantine/core";
import { TbUser } from "react-icons/tb";

export function DisplayContent({ user }: { user: any }) {
    const iconStyle = { width: rem(12), height: rem(12) };

    return (
        <Tabs variant="pills" defaultValue="gallery">
            <Tabs.List>
                <Tabs.Tab
                    value="posts"
                    leftSection={<TbUser style={iconStyle} />}
                >
                    Posts
                </Tabs.Tab>
                <Tabs.Tab
                    value="sobre"
                    leftSection={<TbUser style={iconStyle} />}
                >
                    Sobre
                </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="posts">Gallery tab content</Tabs.Panel>

            <Tabs.Panel value="sobre">Messages tab content</Tabs.Panel>

            {/* <Tabs.Panel value="settings">Settings tab content</Tabs.Panel> */}
        </Tabs>
    );
}
