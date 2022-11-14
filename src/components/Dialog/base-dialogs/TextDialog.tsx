import * as React from "react";
import { DisclosureState } from "ariakit";
import { Dialog } from "ariakit/dialog";
import classNames from "classnames";
import { DialogHeader } from "./Header";

interface TextDialogProps {
    dialog: DisclosureState;
    title?: string;
    children?: any;
    className?: string;
}

export const TextDialog = ({ dialog, title = "", className, children }: TextDialogProps) => {
    return (
        <Dialog state={dialog} className={classNames("dialog", className)}>
            <DialogHeader title={title} dialog={dialog} />
            <div className="h-full mt-2">
                <div className="p-3">{children}</div>
            </div>
        </Dialog>
    );
};
