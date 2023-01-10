import { DisclosureState } from "ariakit";

export interface IHeaderDialogProps {
    title: string;
    dialog: DisclosureState;
}

export interface ICustomDialogProps {
    dialog: DisclosureState;
    children?: React.ReactNode;
    header?: boolean;
    isClose?: boolean;
    className?: string;
}

export interface IErrorHandlerOptions {
    dialog?: DisclosureState;
    hideToast?: boolean;
}

export interface IStepperDialogProps {
    dialog: DisclosureState;
    activeStep: number;
    children?: React.ReactNode;
    className?: string;
    steps?: { label: string; description: string }[];
    isClose?: boolean;
}