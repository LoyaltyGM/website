import * as React from "react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

export const BackButton = () => {
    const router = useRouter();
    return (
        <button type="button" className="flex items-center gap-1" onClick={router.back}>
            <ArrowLeftIcon className="h-8 w-7" />
            Back
        </button>
    );
};
