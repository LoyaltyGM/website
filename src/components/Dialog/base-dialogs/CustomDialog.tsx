import * as React from "react";
import { DisclosureState } from "ariakit";
import { Dialog } from "ariakit/dialog";
import classNames from "classnames";
import { DialogHeader } from "./Header";

interface CustomDialogProps {
    dialog: DisclosureState;
    children?: React.ReactNode;
    header?: boolean;
    isClose?: boolean;
    className?: string;
}

export const CustomDialog = ({ dialog, className, children, isClose = true, header = true }: CustomDialogProps) => {
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
