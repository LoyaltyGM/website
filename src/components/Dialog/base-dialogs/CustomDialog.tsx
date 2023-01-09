import * as React from "react";

import { Dialog } from "ariakit/dialog";
import classNames from "classnames";
import { HeaderDialog } from "./HeaderDialog";
import { ICustomDialogProps } from "interfaces";
import { DEFAULT_THEME } from "utils";

export const CustomDialog = ({ dialog, className, children, isClose = true, header = true }: ICustomDialogProps) => {
    // const { isDarkMode } = useDarkMode();
    return (
        <Dialog
            hideOnInteractOutside={isClose}
            hideOnEscape={isClose}
            data-theme={DEFAULT_THEME}
            state={dialog}
            className={classNames("dialog", className)}
        >
            {header && <HeaderDialog title="" dialog={dialog}></HeaderDialog>}
            <div className="h-full w-full my-4">
                <div className="pt-4 px-6">{children}</div>
            </div>
        </Dialog>
    );
};
