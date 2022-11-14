import toast from "react-hot-toast";

export const stringIsEmpty = (str: string) => !str || str.length === 0;

export const objectIsEmpty = (obj: object) => Object.keys(obj).length === 0 && obj.constructor === Object;

export const arrayIsEmpty = <T extends string>(array: T[]) => array.length === 0;

export const timestampToDate = (timestamp: number) => {
    const d = new Date(timestamp * 1000);
    return !isNaN(d.getTime()) && d.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "2-digit" });
};

export const formatAddress = (address: string | undefined) =>
    address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "";

export function isValidHttpUrl(urlString: string) {
    try {
        new URL(urlString);
    } catch (_) {
        try {
            new URL("https:" + urlString);
            return "https:" + urlString;
        } catch (_) {
            return "./Error";
        }
    }

    return urlString;
}

export const validateForm = (formData, ignoreFields?: string[]): boolean => {
    const fields: string[] = [];
    for (const key in formData) {
        const value = formData[key];
        if (ignoreFields && ignoreFields.includes(key)) {
            continue;
        }
        if (
            (typeof value === "string" && stringIsEmpty(value)) ||
            (typeof value === "object" && (value === null || objectIsEmpty(value))) ||
            (Array.isArray(value) && arrayIsEmpty(value)) ||
            value === undefined
        ) {
            fields.push(key);
        }
    }
    if (!arrayIsEmpty(fields)) {
        toast.error(`Please fill out these fields: \n${fields.join("\n")}`);
        return false;
    }
    return true;
};
