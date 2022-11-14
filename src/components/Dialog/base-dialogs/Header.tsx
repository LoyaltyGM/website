import { DialogHeading } from "ariakit";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const DialogHeader = ({ title, dialog }) => {
    return (
        <DialogHeading className="text-base font-medium leading-6 text-neutral">
            <span>{title}</span>
            <button className="absolute top-[18px] right-4 rounded hover:bg-neutral/20" onClick={dialog.toggle}>
                <span className="sr-only">Close</span>
                <XMarkIcon className="h-5 w-5" />
            </button>
        </DialogHeading>
    );
};
