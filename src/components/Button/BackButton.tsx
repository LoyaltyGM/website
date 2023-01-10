import * as React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { IBackButtonProps } from "interfaces";

/**
 * Button which return to previous page
 *
 * @param className - change style of button
 *
 * @returns JSX.Element - button
 *
 */
export const BackButton = ({ className }: IBackButtonProps): JSX.Element => {
    const router = useRouter();
    return (
        <button type="button" className={"flex items-center gap-1 " + className} onClick={router.back}>
            <ArrowLeftIcon className="h-8 w-7" />
            Back
        </button>
    );
};
