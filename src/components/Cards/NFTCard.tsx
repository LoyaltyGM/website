import * as React from "react";
import ASSETS from "assets";
import Image from "next/image";
import classNames from "classnames";
import { formatAddress } from "utils";
import { INFTCard, INFTCardWithDialog, INFTImage } from "./cardsInterfaces";
import { ClockIcon } from "@heroicons/react/24/outline";

export const NFTImage = ({ className, image }: INFTImage) => {
    return (
        <div className="flex justify-center">
            {
                <Image
                    src={image ? image : ASSETS.NFTmock}
                    width={"200"}
                    height={"200"}
                    className={classNames("rounded-t-md", className)}
                />
            }
        </div>
    );
};

export function NFTCardWithDialog({
    nftObject,
    isLoaded,
    setCurrentNFT,
    setButtonState,
    detailNFTDialog,
    chain,
}: INFTCardWithDialog) {
    return (
        <div>
            <button
                onClick={() => {
                    if (isLoaded) {
                        setButtonState("Mint");
                        setCurrentNFT(nftObject);
                        detailNFTDialog.toggle();
                    }
                }}
            >
                {nftObject.tokenRequestedByMember && (
                    <div
                        className="flex tooltip tooltip-bottom absolute"
                        data-tip="Waiting for the confirmation from the DAO's admin"
                    >
                        <ClockIcon
                            width={"40px"}
                            height={"40px"}
                            className={"bg-base-200 opacity-60 rounded-lg mt-2 ml-2"}
                        />
                    </div>
                )}

                <div className={!isLoaded ? "blur-sm" : undefined}>
                    <NFTCard nftObject={nftObject} chain={chain} />
                </div>
            </button>
        </div>
    );
}

export const NFTCard = ({ nftObject, className = "nft-card" }: INFTCard) => {
    return (
        <div className={className}>
            <div className="flex-shrink-0">
                <img className="h-72 w-full object-cover" src={nftObject.image} alt="" />
            </div>
            <div className="flex flex-1 flex-col justify-between px-6 pt-2 pb-6">
                <div className="flex-1">
                    <div className="mt-1 flex justify-between">
                        <p className="text-base font-medium text-base-content mt-1">{nftObject.title}</p>
                        <p className="text-base font-medium ml-4 mt-1 text-base-content/50">
                            {nftObject.totalMinted}/{nftObject.totalSupply}
                        </p>
                    </div>
                </div>
                <div className="mt-[0.75rem] flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <p className="text-sm font-normal text-base-content">{formatAddress(nftObject.tokenAddress)}</p>
                    </div>
                    <div className="ml-3 flex gap-2">
                        <p className="text-sm font-normal text-primary">{nftObject.price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const DetailNftListItem = ({ property, value }) => {
    return (
        <li className="flex py-4 justify-between">
            <div className="font-light text-base-content/50">{property}</div>
            <div className="font-normal text-base-content">{value}</div>
        </li>
    );
};
