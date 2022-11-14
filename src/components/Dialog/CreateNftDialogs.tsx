import { addNFTSteps, CopyTextButton, createNFTSteps, StepperDialog } from "components";
import React from "react";
import { useRouter } from "next/router";
import { ICreateNftDialog } from "./dialogInterfaces";
import Link from "next/link";

export const CreateNftDialog = ({ dialog, formData, activeStep }: ICreateNftDialog) => {
    return (
        <StepperDialog dialog={dialog} className="dialog" activeStep={activeStep} steps={createNFTSteps}>
            <p className="ml-7">Deployment successful!</p>
            <div className="flex ml-7 mb-10">
                <div className={"mr-4"}>Contract Address:</div>
                <CopyTextButton copyText={formData.contractAddress} />
            </div>
            <Link
                href={{
                    pathname: "create-dao",
                    query: {
                        tokenAddress: formData.contractAddress,
                        enabledBlockchains: "",
                    },
                }}
            >
                <button
                    className="dialog-button"
                    onClick={() => {
                        dialog.toggle();
                    }}
                >
                    Go to DAO creation page
                </button>
            </Link>
        </StepperDialog>
    );
};
