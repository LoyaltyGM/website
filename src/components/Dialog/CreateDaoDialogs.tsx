import Link from "next/link";
import { StepperDialog } from "./base-dialogs";
import React from "react";
import { ICreateDaoDialog } from "./dialogInterfaces";
import { CopyTextButton } from "components";

export const CreateDaoDialog = ({ dialog, formData, activeStep }: ICreateDaoDialog) => {
    return (
        <StepperDialog dialog={dialog} className="dialog" activeStep={activeStep}>
            <p className="ml-7">Deployment successful!</p>
            <div className="flex ml-7 mb-10">
                <div className={"mr-4"}>Contract Address:</div>
                <CopyTextButton copyText={formData.governorAddress} />
            </div>
            <Link href={`/daos/${formData.url}`}>
                <button
                    className="dialog-button"
                    onClick={() => {
                        dialog.toggle();
                    }}
                >
                    View DAO
                </button>
            </Link>
        </StepperDialog>
    );
};
