import React from "react";

export interface ICreate {
    name: string;
    description?: string;
}

export interface ICreateNFT extends ICreate {
    governorUrl?: string;
    file: object;
    symbol: string;
    governorAddress?: string;
    numberOfNFT: number;
    contractAddress?: string;
    ipfsAddress?: string;
}

export interface ICreateProposal extends ICreate {
    proposalId?: string;
    governorAddress: string;
    governorUrl?: string;
    tokenAddress?: string;
    tokenName?: string;
    chainId?: number;
    shortDescription: string;
    file?: object;
    linkForum?: object;
    options?: string[];
    blockchain?: string[];
    enabledBlockchains?: string[];
}

export interface IProposalPageForm extends ICreateProposal {
    proposalState?: number;
    forVotes?: string;
    againstVotes?: string;
    endDateTimestamp?: number;
}

export interface IProposalDetail extends IProposalPageForm {
    startDateTimestamp?: number;
    ownerAddress?: string;
}

export interface INFTVoting {
    chainId: number;
    title?: string;
    type?: string;
    image?: string;
    tokenAddress: string;
    price?: string;
    totalSupply?: string;
    totalMinted?: string;
    tokenRequestedByMember?: boolean;
    tokenRequestApproved?: boolean;
    tokenMintedByMember?: number;
}

export interface IWhitelistRecord {
    governorAddress: string;
    governorUrl: string;
    chainId: number;
    walletAddress?: string;
    votingTokenName?: string;
    votingTokenAddress?: string;
    note?: string;
    blockchainSelected?: string[];

    tokenRequestedByMember?: boolean;
}

export interface IMember {
    governorUrl: string;
    chainId: number;
    memberAddress: string;
    memberTokens: string[];
    role: string;
    votingPower?: number;
}

export type ButtonState = "Mint" | "Loading" | "Success" | "Error";

export type TabsType = {
    label: string;
    index: number;
    Component: React.FC;
}[];
