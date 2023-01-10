import * as React from "react";
import { Dialog } from "ariakit/dialog";
import classNames from "classnames";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { DEFAULT_THEME } from "utils";
import { IStepperDialogProps } from "interfaces";
import { SpinnerLoadingIcon } from "components/Utilities";
import { defaultSteps } from "./_steps";

/**
 * Stepper dialog template with own design style
 * Stepper with steps which you need complete and going to next step
 *
 * @param dialog - element dialog
 * @param className - change style of dialog
 * @param activeStep - currect step of stepper
 * @param children - content of dialog
 * @param steps - steps of stepper
 * @param isClose - close dialog on click outside or press escape
 *
 * @returns JSX.Element - dialog
 **/

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
                                            <SpinnerLoadingIcon />
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
