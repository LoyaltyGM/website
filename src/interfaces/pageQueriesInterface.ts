import { ParsedUrlQuery } from "querystring";
// The query-string library is a small utility for parsing and stringifying 
// query strings. When working with React and TypeScript, you may find that 
// you need to parse the query string of the current URL to extract certain values 
// or parameters. The query-string library provides an easy way to do this.

export interface IQuery {
    url: string;
}

export interface ILoyaltyQuery extends ParsedUrlQuery {
    url: string;
}

export interface ILoyaltyPageProps {
    url: string;
}

// TODO:
export interface IDetailProposalQuery extends ParsedUrlQuery {
    url: string;
    detailProposal: string;
}

export interface IDetailProposalProps {
    detailProposal: string;
}

export interface IProposalsQuery extends ParsedUrlQuery {
    governorAddress: string;
    chainId: string;
    url: string;
}

export interface IAddMemberQuery extends ParsedUrlQuery {
    companyAddress: string;
    url: string;
}



