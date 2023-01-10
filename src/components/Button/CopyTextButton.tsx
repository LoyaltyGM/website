import React from "react";
import { formatAddress } from "utils";
import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { useBoolean, useCopyToClipboard } from "usehooks-ts";

/**
 * Button which copy text to clipboard
 *
 * @param copyText - text to copy
 * @param color - color of button
 *
 * @returns JSX.Element - button
 *
 * */
export const CopyTextButton = ({ copyText, color }) => {
    const { value: isCopied, setTrue, setFalse } = useBoolean();
    const [, copy] = useCopyToClipboard();

    const timeToReturnIconBack = 1000; // 1 second

    const handleClick = () => {
        setTrue();
        copy(copyText).then();

        setTimeout(() => {
            setFalse();
        }, timeToReturnIconBack);
    };

    return (
        <div
            className={"flex gap-2 items-center hover:text-base-content/50 hover:cursor-pointer" + color}
            onClick={handleClick}
        >
            {isCopied ? <CheckIcon className="h-6" /> : <ClipboardIcon className="h-6" />}
            {copyText}
        </div>
    );
};
