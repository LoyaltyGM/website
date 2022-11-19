import { formatAddress } from "utils";
import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useBoolean, useCopyToClipboard } from "usehooks-ts";

export const CopyTextButton = ({ copyText }) => {
    const { value: isCopied, setTrue, setFalse } = useBoolean();
    const [, copy] = useCopyToClipboard();

    const handleClick = () => {
        setTrue();
        copy(copyText).then();

        setTimeout(() => {
            setFalse();
        }, 500);
    };

    return (
        <div
            className={"flex text-white gap-2 items-center hover:text-base-content/50 hover:cursor-pointer"}
            onClick={handleClick}
        >
            {isCopied ? <CheckIcon className="h-6" /> : <ClipboardIcon className="h-6" />}
            {copyText}
        </div>
    );
};
