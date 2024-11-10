import { Menu, Button, Text, rem } from "@mantine/core";
// import {
//     IconSettings,
//     IconSearch,
//     IconPhoto,
//     IconMessageCircle,
//     IconTrash,
//     IconArrowsLeftRight,
// } from "@tabler/icons-react";
import {
    Trash2,
    Eye,
    EllipsisVertical,
    Flag,
    ShieldX,
    Bookmark,
    UserRoundPlus,
} from "lucide-react";
import classes from "@/styles/EditOptions.module.css";

export default function EditOptions({
    post,
    edit,
}: {
    post?: any;
    edit?: Boolean;
}) {
    return (
        <Menu
            shadow="md"
            width={200}
            position="left-start"
            offset={0}
            classNames={{
                dropdown:
                    classes.dropdown +
                    " !bg-woodsmoke-600/80 !border-woodsmoke-500/50 rounded-xl",
            }}
        >
            <Menu.Target>
                <button
                    className={`z-40 size-5`}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                    }}
                >
                    <EllipsisVertical className="size-5 text-woodsmoke-300" />
                </button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>Opções</Menu.Label>
                {edit && (
                    <Menu.Item
                        leftSection={
                            <Eye style={{ width: rem(14), height: rem(14) }} />
                        }
                        className=" !text-woodsmoke-50 data-[hovered=true]:!bg-woodsmoke-500"
                    >
                        Visualizar post
                    </Menu.Item>
                )}
                {!edit && (
                    <>
                        <Menu.Item
                            leftSection={
                                <UserRoundPlus
                                    style={{ width: rem(14), height: rem(14) }}
                                />
                            }
                            className=" !text-woodsmoke-50 data-[hovered=true]:!bg-woodsmoke-500"
                        >
                            Seguir autor
                        </Menu.Item>
                        <Menu.Item
                            leftSection={
                                <Flag
                                    style={{ width: rem(14), height: rem(14) }}
                                />
                            }
                            className=" !text-woodsmoke-50 data-[hovered=true]:!bg-woodsmoke-500"
                        >
                            Denunciar
                        </Menu.Item>
                        <Menu.Item
                            leftSection={
                                <ShieldX
                                    style={{ width: rem(14), height: rem(14) }}
                                />
                            }
                            className=" !text-woodsmoke-50 data-[hovered=true]:!bg-woodsmoke-500"
                        >
                            Bloquear autor
                        </Menu.Item>
                        <Menu.Item
                            leftSection={
                                <Bookmark
                                    style={{ width: rem(14), height: rem(14) }}
                                />
                            }
                            className=" !text-woodsmoke-50 data-[hovered=true]:!bg-woodsmoke-500"
                        >
                            Salvar
                        </Menu.Item>
                    </>
                )}

                {edit && (
                    <>
                        <Menu.Divider className="!border-woodsmoke-500/50" />
                        <Menu.Label>Danger zone</Menu.Label>
                        <Menu.Item
                            color="red"
                            leftSection={
                                <Trash2
                                    style={{ width: rem(14), height: rem(14) }}
                                />
                            }
                        >
                            Deletar post
                        </Menu.Item>
                    </>
                )}
            </Menu.Dropdown>
        </Menu>
    );
}
