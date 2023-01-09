import { DisclosureState } from "ariakit";

export interface ICustomDialogProps {
    dialog: DisclosureState;
    children?: React.ReactNode;
    header?: boolean;
    isClose?: boolean;
    className?: string;
}

export interface ILoadingDialogProps {
    dialog: DisclosureState;
    title: string | React.ReactNode | null;
    children: React.ReactNode;
    className?: string;
}

export interface IStepperDialogProps {
    dialog: DisclosureState;
    activeStep: number;
    children?: React.ReactNode;
    className?: string;
    steps?: { label: string; description: string }[];
    isClose?: boolean;
}

export interface ITextDialogProps {
    dialog: DisclosureState;
    title?: string;
    children?: any;
    className?: string;
}