import * as React from "react";

import { Dialog } from "ariakit/dialog";
import classNames from "classnames";
import { DialogHeader } from "./Header";
import { ICustomDialogProps } from "interfaces";

export const CustomDialog = ({ dialog, className, children, isClose = true, header = true }: ICustomDialogProps) => {
    // const { isDarkMode } = useDarkMode();
    return (
        <Dialog
            hideOnInteractOutside={isClose}
            hideOnEscape={isClose}
            // data-theme={isDarkMode ? DARK_THEME : LIGHT_THEME}
            state={dialog}
            className={classNames("dialog", className)}
        >
            {header && <DialogHeader title="" dialog={dialog}></DialogHeader>}
            <div className="h-full w-full my-4">
                <div className="pt-4 px-6">{children}</div>
            </div>
        </Dialog>
    );
};
