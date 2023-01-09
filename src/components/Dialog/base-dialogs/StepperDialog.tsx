import * as React from "react";
import { Dialog } from "ariakit/dialog";
import classNames from "classnames";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useDarkMode } from "usehooks-ts";
import { DEFAULT_THEME } from "utils";
import { IStepperDialogProps } from "interfaces";

export const SpinnerLoading = () => {
    return (
        <div role="status">
            <svg
                className="inline w-7 h-7 animate-spin text-base-200 fill-primary"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                    /> */}
                <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                />
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export const defaultSteps = [
    {
        label: "Waiting for the confirmation in your wallet",
        description: "",
    },
    {
        label: "Waiting for the confirmation from blockchain",
        description: "",
    },
    {
        label: "Done",
        description: "",
    },
];

export const createNFTSteps = [
    {
        label: "Waiting for the confirmation in your wallet to create contract",
        description: "",
    },
    {
        label: "Waiting for the confirmation from blockchain",
        description: "",
    },
    {
        label: "Done",
        description: "",
    },
];

export const addNFTSteps = [
    {
        label: "Waiting for the confirmation in your wallet to create contract",
        description: "",
    },
    {
        label: "Waiting for the confirmation from blockchain",
        description: "",
    },
    {
        label: "Waiting for the confirmation in your wallet to add NFT to Governor",
        description: "",
    },
    {
        label: "Waiting for the confirmation from blockchain",
        description: "",
    },
    {
        label: "Done",
        description: "",
    },
];

export const createTreasurySteps = [
    {
        label: "Waiting for the confirmation in your wallet to create Treasury contract",
        description: "",
    },
    {
        label: "Waiting for the confirmation from blockchain",
        description: "",
    },
    {
        label: "Waiting for the confirmation in your wallet to renounce ownership to Governor",
        description: "",
    },
    {
        label: "Waiting for the confirmation from blockchain",
        description: "",
    },
    {
        label: "Done",
        description: "",
    },
];

export const StepperDialog = ({
    dialog,
    className,
    activeStep,
    children,
    steps,
    isClose = false,
}: IStepperDialogProps) => {
    if (!steps) {
        steps = defaultSteps;
    }
    const { isDarkMode } = useDarkMode();

    return (
        <Dialog
            data-theme={DEFAULT_THEME}
            state={dialog}
            className={classNames("dialog", className)}
            hideOnInteractOutside={isClose}
            hideOnEscape={isClose}
        >
            <div className="h-full m-10">
                <ul className="steps steps-vertical gap-6">
                    {steps.map((step, index) => {
                        return (
                            <li key={index}>
                                <div
                                    className={classNames(
                                        "flex gap-4 text-xl text-base-content text-left items-center"
                                    )}
                                >
                                    <div className={"w-7"}>
                                        {index == activeStep ? (
                                            <SpinnerLoading />
                                        ) : index > activeStep - 1 ? (
                                            <CheckCircleIcon className="h-7 w-7 fill-base-300" />
                                        ) : (
                                            <CheckCircleIcon className="h-7 w-7 stroke-1 fill-primary" />
                                        )}
                                    </div>
                                    {step.label}
                                </div>
                            </li>
                        );
                    })}
                </ul>
                {
                    //final step and children
                    activeStep === steps.length && <div className="p-3">{children}</div>
                }
            </div>
        </Dialog>
    );
};
