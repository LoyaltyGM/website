import * as React from "react";
import { Dialog } from "ariakit/dialog";
import classNames from "classnames";
import { HeaderDialog } from "./HeaderDialog";
import { ITextDialogProps } from "interfaces";

export const TextDialog = ({ dialog, title = "", className, children }: ITextDialogProps) => {
    return (
        <Dialog state={dialog} className={classNames("dialog", className)}>
            <HeaderDialog title={title} dialog={dialog} />
            <div className="h-full mt-2">
                <div className="p-3">{children}</div>
            </div>
        </Dialog>
    );
};
