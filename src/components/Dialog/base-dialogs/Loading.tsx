import * as React from "react";
import { DisclosureState } from "ariakit";
import { Dialog, DialogHeading } from "ariakit/dialog";
import classNames from "classnames";
import { ILoadingDialogProps } from "interfaces";

export const LoadingDialog = ({ dialog, title, className, children }: ILoadingDialogProps) => {
    return (
        <Dialog
            state={dialog}
            className={classNames("dialog", className)}
            hideOnInteractOutside={false}
            hideOnEscape={false}
        >
            <header className="font-exo relative flex items-center justify-between text-lg font-medium">
                <DialogHeading>{title}</DialogHeading>
            </header>
            <div className="mt-4">{children}</div>
        </Dialog>
    );
};
