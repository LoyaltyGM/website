import { DisclosureState } from "ariakit";
import { ButtonState, ICreateDAO, ICreateNFT, ICreateProposal, IDAOPageForm, INFTVoting, IProposal } from "types";
import * as React from "react";

interface IDialog {
    dialog: DisclosureState;
}

export interface ICreateNftDialog extends IDialog {
    formData: ICreateNFT;
    activeStep: number;
}

export interface IDetainNftDialog extends IDialog {
    DAO: IDAOPageForm;
    currentNFT: INFTVoting;
    buttonState: ButtonState;
    mintButton: () => Promise<void>;
}

export interface IContributeTreasuryDialog extends IDialog {
    DAO: IDAOPageForm;
    sending: boolean;
    setSending: React.Dispatch<React.SetStateAction<boolean>>;
    contributeAmount: string;
    setContributeAmount: React.Dispatch<React.SetStateAction<string>>;
    contributeToTreasuryButton: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

export interface ICreateTreasuryDialog extends IDialog {
    DAO: IDAOPageForm;
    createTreasuryStep: number;
}

export interface IProposalPageDialog extends IDialog {
    formData: IProposal;
    activeStep: number;
}

export interface ICreateProposalDialog extends IDialog {
    formData: ICreateProposal;
    activeStep: number;
}

export interface ICreateDaoDialog extends IDialog {
    formData: ICreateDAO;
    activeStep: number;
}
