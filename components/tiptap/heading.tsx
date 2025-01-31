import { useState } from "react";
import {
    // CheckIcon,
    Combobox,
    // Group,
    Input,
    InputBase,
    useCombobox,
} from "@mantine/core";

import classes from "@/styles/tiptap/heading.module.css";

// const groceries = [
//     "Parágrafo",
//     "Título",
//     "Subtítulo 1",
//     "Subtítulo 2",
//     "Subtítulo 3",
//     "Subtítulo 4",
// ];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function HeadingSelect({ editor }: { editor: any }) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: (eventSource) => {
            if (eventSource === "keyboard") {
                combobox.selectActiveOption();
            } else {
                combobox.updateSelectedOptionIndex("active");
            }
        },
    });

    const [value, setValue] = useState<string | null>("Parágrafo");

    return (
        <Combobox
            store={combobox}
            resetSelectionOnOptionHover
            withinPortal={false}
            onOptionSubmit={(val) => {
                setValue(val);
                combobox.updateSelectedOptionIndex("active");
            }}
            classNames={{
                dropdown: classes.dropdown,
                options: classes.options,
            }}
        >
            <Combobox.Target targetType="button">
                <InputBase
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    rightSectionPointerEvents="none"
                    onClick={() => combobox.toggleDropdown()}
                    classNames={{
                        input: classes.input,
                    }}
                >
                    {value || <Input.Placeholder>Pick value</Input.Placeholder>}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    <button
                        onClick={() => {
                            editor.chain().focus().setParagraph().run();
                            setValue("Parágrafo");
                        }}
                        className={`
                                !text-2xl
                                ${
                                    editor.isActive("paragraph")
                                        ? "is-active"
                                        : ""
                                }
                            `}
                    >
                        Parágrafo
                    </button>
                    <button
                        onClick={() => {
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 1 })
                                .run();
                            setValue("Título");
                        }}
                        className={
                            editor.isActive("heading", { level: 1 })
                                ? "is-active"
                                : ""
                        }
                    >
                        Título
                    </button>
                    <button
                        onClick={() => {
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 2 })
                                .run();
                            setValue("Subtítulo 1");
                        }}
                        className={
                            editor.isActive("heading", { level: 2 })
                                ? "is-active"
                                : ""
                        }
                    >
                        Subtítulo 1
                    </button>
                    <button
                        onClick={() => {
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 3 })
                                .run();
                            setValue("Subtítulo 2");
                        }}
                        className={
                            editor.isActive("heading", { level: 3 })
                                ? "is-active"
                                : ""
                        }
                    >
                        Subtítulo 2
                    </button>
                    <button
                        onClick={() => {
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 4 })
                                .run();
                            setValue("Subtítulo 3");
                        }}
                        className={
                            editor.isActive("heading", { level: 4 })
                                ? "is-active"
                                : ""
                        }
                    >
                        Subtítulo 3
                    </button>
                    <button
                        onClick={() => {
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 5 })
                                .run();
                            setValue("Subtítulo 4");
                        }}
                        className={
                            editor.isActive("heading", { level: 5 })
                                ? "is-active"
                                : ""
                        }
                    >
                        Subtítulo 4
                    </button>
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
