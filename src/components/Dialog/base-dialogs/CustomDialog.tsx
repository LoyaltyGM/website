import * as React from "react";
import { DisclosureState } from "ariakit";
import { Dialog } from "ariakit/dialog";
import classNames from "classnames";
import { DialogHeader } from "./Header";
import { useDarkMode } from "usehooks-ts";
import { DARK_THEME, LIGHT_THEME } from "utils";

interface CustomDialogProps {
    dialog: DisclosureState;
    children?: React.ReactNode;
    className?: string;
}

export const CustomDialog = ({ dialog, className, children }: CustomDialogProps) => {
    const { isDarkMode } = useDarkMode();
    return (
        <Dialog
            data-theme={isDarkMode ? DARK_THEME : LIGHT_THEME}
            state={dialog}
            className={classNames("dialog", className)}
        >
            <DialogHeader title="" dialog={dialog}></DialogHeader>
            <div className="h-full w-full my-4">
                <div className="pt-4 px-6">{children}</div>
            </div>
        </Dialog>
    );
};
