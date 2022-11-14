import { StepperDialog } from "./base-dialogs";
import React from "react";
import { useRouter } from "next/router";
import { ICreateProposalDialog } from "./dialogInterfaces";
import { CopyTextButton } from "components";

export const CreateProposalDialog = ({ dialog, activeStep, formData }: ICreateProposalDialog) => {
    const router = useRouter();

    return (
        <StepperDialog dialog={dialog} className="dialog" activeStep={activeStep}>
            <p>Proposal created successful!</p>
            <div className="flex mb-10">
                <div className={"mr-4"}>Proposal Id:</div>
                <CopyTextButton copyText={formData.proposalId} />
            </div>
            <button
                className="dialog-button"
                onClick={() => {
                    dialog.toggle();
                    router.back();
                }}
            >
                Back to DAO
            </button>
        </StepperDialog>
    );
};
