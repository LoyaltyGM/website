import { BaseSyntheticEvent, ChangeEvent, Dispatch, SetStateAction } from "react";
import { ICreate } from "interfaces";

export const handleChangeBasic = <T>(
    value: string | boolean | number | object,
    set: Dispatch<SetStateAction<T>>,
    field: string
) => {
    set((prev) => ({ ...prev, [field]: value }));
};

export const handleChangeBasicArray = <T>(
    value: string[] | boolean[] | number[],
    set: Dispatch<SetStateAction<T>>,
    field: string
) => {
    set((prev) => ({ ...prev, [field]: [value] }));
};

export const handleChangeBasicSimple = <T>(
    value: string[] | string,
    set: Dispatch<SetStateAction<T>>,
    field: string
) => {
    set((prev) => ({ ...prev, [field]: [value] }));
};

export const handleAddArray = <T>(value: string[] | string, set: Dispatch<SetStateAction<T>>, field: string) => {
    value
        ? typeof value === "string"
            ? set((prev) => ({ ...prev, [field]: [value] }))
            : set((prev) => ({ ...prev, [field]: [...value] }))
        : "return";
};

export const handleTextChange = <T extends ICreate, E extends HTMLInputElement | HTMLTextAreaElement>(
    event: ChangeEvent<E>,
    set: Dispatch<SetStateAction<T>>
) => {
    set((prev) => ({ ...prev, [event.target.name]: event.target.value }));
};

export const handleNftSupplyChange = <T extends ICreate, E extends HTMLInputElement | HTMLTextAreaElement>(
    event: ChangeEvent<E>,
    set: Dispatch<SetStateAction<T>>,
    value: string | boolean | number,
    field: string
) => {
    set((prev) => ({ ...prev, [event.target.name]: +event.target.value }));
    if (event.target.value === "") {
        handleChangeBasic("", set, field);
        console.log("reset");
    } else {
        handleChangeBasic(value, set, field);
    }
};

export const handleTextChangeAddNewMember = <T, E extends HTMLInputElement | HTMLTextAreaElement>(
    event: ChangeEvent<E>,
    set: Dispatch<SetStateAction<T>>
) => {
    set((prev) => ({ ...prev, [event.target.name]: event.target.value }));
};

export const handleImageChange = <T extends ICreate>(
    file: File | File[],
    set: Dispatch<SetStateAction<T>>,
    field: string
) => {
    set((prev) => ({ ...prev, [field]: file }));
};

export const handleCheckboxChange = <T extends ICreate>(
    event: BaseSyntheticEvent,
    formData: T,
    set: Dispatch<SetStateAction<T>>,
    field: string
) => {
    let checkboxGroup = formData[field] as string[];
    const elem = event.currentTarget;
    const label = elem.parentNode.textContent;

    if (elem.checked && !checkboxGroup.includes(label)) {
        checkboxGroup.push(label);
    }
    if (!elem.checked && checkboxGroup.includes(label)) {
        checkboxGroup = checkboxGroup.filter((value) => value !== label);
    }

    set((prev) => ({ ...prev, [field]: checkboxGroup }));
};

export const handleSelectorChange = <T extends ICreate>(
    event: BaseSyntheticEvent,
    set: Dispatch<SetStateAction<T>>,
    field: string
) => {
    const elem = event.currentTarget;
    const label = elem.parentNode.textContent;
    set((prev) => ({ ...prev, [field]: label }));
    return true;
};

export const handleDaoNameUrlChange = <T extends ICreate, E extends HTMLInputElement | HTMLTextAreaElement>(
    event: ChangeEvent<E>,
    set: Dispatch<SetStateAction<T>>,
    field: string
) => {
    const createUrl = (name: string): string => {
        return name.trim().split(/\s+/g).join("-");
    };
    const url = createUrl(event.target.value);
    set((prev) => ({ ...prev, [event.target.name]: url.replace("-", " ") }));
    handleChangeBasic(url, set, field);
};
