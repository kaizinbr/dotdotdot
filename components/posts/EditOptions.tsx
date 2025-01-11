import { Menu, Button, Modal, Text, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import deletePost from "@/lib/utils/deletePost";
import {
    Trash2,
    Eye,
    EllipsisIcon,
    Flag,
    ShieldX,
    Bookmark,
    UserRoundPlus,
} from "lucide-react";
import classes from "@/styles/EditOptions.module.css";

import { useRouter } from "next/navigation";

export default function EditOptions({
    post,
    edit,
}: {
    post?: any;
    edit?: Boolean;
}) {
    const router = useRouter();
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                withCloseButton={false}
                overlayProps={{
                    backgroundOpacity: 0.55,
                    blur: 3,
                }}
                classNames={{
                    content: classes.modal,
                    header: classes.header,
                    body: classes.modalBody,
                }}
                className="flex flex-col gap-2"
                centered
            >
                <h1 className="text-center font-bold text-2xl mb-3">
                    Excluir post?
                </h1>
                <p className="text-woodsmoke-200">
                    Essa ação não poderá ser desfeita, e o post será removido do
                    seu perfil, da timeline de todas as contas que seguem você e
                    dos resultados de busca.{" "}
                </p>
                <div className="flex gap-4 mt-6">
                    <button
                        onClick={close}
                        color="gray"
                        className="flex-1 border-2 border-main-500 py-2 rounded-full"
                        
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={async () => {

                            await deletePost(post.id);
                            router.reload();
                            close();
                        }}
                        color="red"
                        className="flex-1 transition duration-200 ease-in-out bg-red-500 border-2 border-red-500 hover:bg-transparent py-2 rounded-full"
                        
                    >
                        Deletar
                    </button>
                </div>
            </Modal>
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
                        <EllipsisIcon className="size-5 text-woodsmoke-300" />
                    </button>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>Opções</Menu.Label>
                    {edit && (
                        <Menu.Item
                            leftSection={
                                <Eye
                                    style={{ width: rem(14), height: rem(14) }}
                                />
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
                                        style={{
                                            width: rem(14),
                                            height: rem(14),
                                        }}
                                    />
                                }
                                className=" !text-woodsmoke-50 data-[hovered=true]:!bg-woodsmoke-500"
                            >
                                Seguir autor
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <Flag
                                        style={{
                                            width: rem(14),
                                            height: rem(14),
                                        }}
                                    />
                                }
                                className=" !text-woodsmoke-50 data-[hovered=true]:!bg-woodsmoke-500"
                            >
                                Denunciar
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <ShieldX
                                        style={{
                                            width: rem(14),
                                            height: rem(14),
                                        }}
                                    />
                                }
                                className=" !text-woodsmoke-50 data-[hovered=true]:!bg-woodsmoke-500"
                            >
                                Bloquear autor
                            </Menu.Item>
                            <Menu.Item
                                leftSection={
                                    <Bookmark
                                        style={{
                                            width: rem(14),
                                            height: rem(14),
                                        }}
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
                                        style={{
                                            width: rem(14),
                                            height: rem(14),
                                        }}
                                    />
                                }
                                onClick={open}
                            >
                                Deletar post
                            </Menu.Item>
                        </>
                    )}
                </Menu.Dropdown>
            </Menu>
        </>
    );
}
