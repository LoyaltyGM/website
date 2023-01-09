import { BlockchainIcon } from "components";
import * as React from "react";

const getLoadingStrings = (amount: number) => {
    const array = new Array(amount).fill(0);
    return (
        <div>
            {array.map((element, index) => (
                <div key={index} className="mt-4 mx-4 h-2.5 w-full-8 bg-base-200 rounded"></div>
            ))}
        </div>
    );
};

export const MockupLoadingDetailDAOPage = () => {
    return (
        <>
            <div className="dao-header lg:flex md:flex xl:flex items-center -mt-10">
                <div className={"bg-base-200 h-52 w-52 animate-pulse rounded-md"}></div>
                <div className={"info flex flex-col ml-6 w-full gap-8"}>
                    <div className={"info-row-1 flex justify-between items-center"}>
                        <div className={"dao-name bg-base-200 animate-pulse rounded-full"}>
                            <div className="text-base-content/50 dao-label capitalize px-2">DAO NAME HELLO</div>
                        </div>
                        <div className={"member-button"}>
                            <button
                                className={
                                    "main-button disabled:bg-base-200 disabled:hover:bg-base-200 animate-pulse text-white"
                                }
                                disabled={true}
                            >
                                Become a member
                            </button>
                        </div>
                    </div>
                    <div className={"info-row-2 flex justify-between"}>
                        <div className={"about flex gap-10"}>
                            <a target={"_blank"} className="badge-button">
                                About
                            </a>
                            <div className="badge-button items-center">
                                <p>Blockchain</p>
                            </div>
                        </div>
                        <div className={"links flex gap-5"}>
                            <div className="bg-base-200 rounded-full h-9 w-9 animate-pulse "></div>
                            <div className="bg-base-200 rounded-full h-9 w-9 animate-pulse"></div>
                            <div className="bg-base-200 rounded-full h-9 w-9 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const MockupLoadingDAO = () => {
    return (
        <div className="nft-card-mockup w-full animate-pulse">
            {/* //Wrap to div for center elements */}
            {getLoadingStrings(10)}
            <div className="p-4 gap-y-6">
                <div className="flex justify-between">
                    <div className="h-2.5 w-20 bg-base-200 rounded"></div>
                    <div className="h-2.5 w-8 bg-base-200 rounded"></div>
                </div>
                <div className="flex pt-4 justify-between">
                    <div className="h-2.5 w-14 bg-base-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export const MockupLoadingProposals = ({ chain }: { chain: number | string }) => {
    return (
        <div className="nft-card-mockup w-full animate-pulse">
            {/* //Wrap to div for center elements */}
            {getLoadingStrings(4)}
            <div className="p-4 gap-y-6">
                <div className="flex justify-between">
                    <div className="h-2.5 w-20 bg-base-200 rounded"></div>
                    <div className="h-2.5 w-8 bg-base-200 rounded"></div>
                </div>
                <div className="flex pt-4 justify-between">
                    <div className="h-2.5 w-14 bg-base-200 rounded"></div>
                    <BlockchainIcon chain={chain} />
                </div>
            </div>
        </div>
    );
};

export const MockupLoadingNFT = ({ chain }: { chain: number | string }) => {
    return (
        <div className="flex flex-col overflow-hidden w-72 rounded-lg border border-base-200">
            <div className="flex-shrink-0">
                <div className="animate-pulse h-72 w-full object-cover bg-base-200" />
            </div>
            <div className="flex flex-1 flex-col justify-between bg-base-100 px-6 pt-2 pb-6">
                <div className="flex-1">
                    <div className="mt-1 flex justify-between">
                        <p className="text-base font-medium animation-pulse bg-base-200 text-base-content/50 mt-1">
                            Nft membership
                        </p>
                        {/* TODO: Pass variable how many minted NFT and how many left */}
                        <p className="text-base font-medium ml-4 mt-2 animate-pulse bg-base-200 text-base-content/50">
                            499/500
                        </p>
                    </div>
                </div>
                <div className="mt-[0.75rem] flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <p className="text-sm font-normal animate-pulse bg-base-200 text-base-content/50">
                            0x0000...0000
                        </p>
                    </div>
                    <div className="ml-3 flex gap-2">
                        <p className="text-sm font-normal animate-pulse bg-base-200 text-base-content/50">000</p>
                        <BlockchainIcon chain={chain} />
                    </div>
                </div>
            </div>
        </div>
    );
};
