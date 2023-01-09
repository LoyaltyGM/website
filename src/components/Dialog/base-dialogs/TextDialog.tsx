import * as React from "react";
import { Dialog } from "ariakit/dialog";
import classNames from "classnames";
import { DialogHeader } from "./Header";
import { ITextDialogProps } from "interfaces";

export const TextDialog = ({ dialog, title = "", className, children }: ITextDialogProps) => {
    return (
        <Dialog state={dialog} className={classNames("dialog", className)}>
            <DialogHeader title={title} dialog={dialog} />
            <div className="h-full mt-2">
                <div className="p-3">{children}</div>
            </div>
        </Dialog>
    );
};
