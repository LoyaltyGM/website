import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Layout from "components/Layout";
import { CopyTextButton, CustomDialog } from "components/";
import { getObjectFields, JsonRpcProvider, Network } from "@mysten/sui.js";
import { useRouter } from "next/router";
import ASSETS from "assets";
import { useDialogState } from "ariakit";
import { APP_URL, FOLLOW_TWITTER_GM_LINK, RETWEET_GM_LINK } from "../utils";
import { useBoolean } from "usehooks-ts";
import classNames from "classnames";
import toast from "react-hot-toast";
import { ethos } from "ethos-connect";
import { emojisplosion } from "emojisplosion";

const Waitlist: NextPage = () => {
    const { query } = useRouter();
    const { refAddress } = query;

    const provider = new JsonRpcProvider(Network.DEVNET);
    const { wallet } = ethos.useWallet();
    const address = ethos.useAddress();

    const [claimXpAddress, setClaimXpAddress] = useState(null);
    const [freeClaimXp, setFreeClaimXP] = useState(null);
    const [totalMinted, setTotalMinted] = useState(null);
    const [currentXP, setCurrentXP] = useState(null);
    const [refCount, setRefCount] = useState(null);

    const socialsDialog = useDialogState();
    const { value: isGmFollow, setTrue: checkGmFollow } = useBoolean(false);
    const { value: isGmRetweet, setTrue: checkGmRetweet } = useBoolean(false);
    const { value: isMinted, setTrue: setMinted } = useBoolean(false);

    const packageObjectId = process.env.NEXT_PUBLIC_PACKAGE_ID;
    const dataTableObjectId = process.env.NEXT_PUBLIC_DATA_TABLE_ID;
    const totalMintedBefore = process.env.NEXT_PUBLIC_TOTAL_MINTED;

    const fullType = `${packageObjectId}::token::SoulboundToken`;

    const mintCall = {
        kind: "moveCall" as const,
        data: {
            packageObjectId: packageObjectId,
            module: "token",
            function: "mint",
            typeArguments: [],
            arguments: [
                dataTableObjectId, //store
            ],
            gasBudget: 10000,
        },
    };

    const mintCallWithRef = {
        kind: "moveCall" as const,
        data: {
            packageObjectId: packageObjectId,
            module: "token",
            function: "mint_with_ref",
            typeArguments: [],
            arguments: [
                refAddress, // ref address
                dataTableObjectId, //store
            ],
            gasBudget: 10000,
        },
    };

    const getObjects = async () => {
        if (!address) return;
        try {
            // claim xp button
            console.log("try");
            const wallet_objects = await provider.getObjectsOwnedByAddress(address);
            // current xp and ref count
            wallet_objects.map(async (value) => {
                if (value.type === fullType) {
                    setClaimXpAddress(value.objectId);
                    console.log("claim " + value.objectId);
                    const nft_object = await provider.getObject(value.objectId);
                    const nft_object_fields = getObjectFields(nft_object);
                    setCurrentXP(nft_object_fields.current_exp);
                    setRefCount(nft_object_fields.ref_counter);
                }
            });

            // total minted
            const store_object = await provider.getObject(dataTableObjectId);
            setTotalMinted(getObjectFields(store_object).size);

            // claim xp
            const store_objects = await provider.getObjectsOwnedByObject(dataTableObjectId);
            store_objects.map(async (value) => {
                const store_dynamic_fields = await provider.getObject(value.objectId);
                const store_dynamic_field_owner = getObjectFields(store_dynamic_fields).value;

                const claim_xp_object = await provider.getObject(store_dynamic_field_owner);
                const claim_xp_field = getObjectFields(claim_xp_object);
                if (claim_xp_field.owner === address) {
                    setFreeClaimXP(claim_xp_field.claimable_exp);
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const mint = async (singTransaction) => {
        if (!wallet) return;
        try {
            const response = await wallet.signAndExecuteTransaction(singTransaction);
            console.log("RESPONSE", response);
            if (response?.effects?.events) {
                const { moveEvent } = response.effects.events.find((e) => e.moveEvent);
                console.log("Object NFT", moveEvent.fields.token_id);
                if (moveEvent?.fields?.token_id) {
                    for (let i = 0; i < 5; i++) emojisplosion();
                    setMinted();
                    setTimeout(() => getObjects().then(), 1000);
                }
            }
        } catch (error) {
            console.log(error);
            toast.error("Mint failed");
        }
    };

    const claimXP = async (tokenAddress: string) => {
        if (!wallet) return;
        try {
            const singTransaction = {
                kind: "moveCall" as const,
                data: {
                    packageObjectId: packageObjectId,
                    module: "token",
                    function: "claim_exp",
                    typeArguments: [],
                    arguments: [
                        tokenAddress, // token to update
                        dataTableObjectId, //store
                    ],
                    gasBudget: 10000,
                },
            };
            const response = await wallet.signAndExecuteTransaction(singTransaction);
            //console.log("RESPONSE", response);

            if (response?.effects?.events) {
                // const { moveEvent } = response.effects.events.find((e) => e.moveEvent);
                //console.log("Object NFT", moveEvent.fields.token_id);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        console.log("get obj for address" + address);
        getObjects().then();
    }, [address]);

    return (
        <div>
            <Layout className="layout-base bg-[#1C1D25] h-full pb-0" isMinHeightTurnOff={true}>
                <section className="relative w-full min-h-full justify-between">
                    <div className="relative flex flex-col items-center min-h-full justify-center rounded-lg">
                        <div className="flex gap-10 justify-between w-full">
                            <div className="w-3/4 ml-4">
                                <h1 className="text-highlighter fredoka-font text-[#FADC4B] inset-y-0 left-0 pl-4 pt-10">
                                    LoyaltyGM - Test mint
                                </h1>
                                {/* <div className="pl-4">
                                    <Image src={ASSETS.gmLogo} height={60} width={400} />
                                </div> */}

                                <div className="sub-text fredoka-font text-white pl-4 pt-2 pb-10">
                                    NFT LOYALTY REWARD PLATFORM FOR YOUR FAVOURITE WEB3.0 PROJECT
                                </div>
                                {claimXpAddress ? (
                                    <div className="border-2 border-white bg-white/90 text-[#383838] rounded-xl ml-4 px-4 ">
                                        <p className="ml-4 mt-6 text-xl font-mono">
                                            Your Loyalty NFT Stats (fully on-chain)
                                        </p>
                                        <p className="w-full ml-4 mt-6 font-mono">Current XP: {currentXP || 0}</p>
                                        <p className="w-full ml-4 font-mono">Refferal Count: {refCount || 0}</p>
                                        <div className="w-full ml-4 gap-2 font-mono ">
                                            Refferal Link:
                                            {claimXpAddress && (
                                                <CopyTextButton
                                                    copyText={`https://${APP_URL}/waitlist?refAddress=${address}`}
                                                    color={""}
                                                />
                                            )}
                                        </div>
                                        <button
                                            className="secondary-button w-full mt-4 mb-10 font-mono"
                                            onClick={async () => {
                                                await claimXP(claimXpAddress);
                                            }}
                                            disabled={freeClaimXp === 0 || freeClaimXp === null}
                                        >
                                            Claim {freeClaimXp || 0} XP
                                        </button>
                                    </div>
                                ) : wallet?.address ? (
                                    <button
                                        className="secondary-button ml-4 w-1/2 bg-white border-white font-mono"
                                        onClick={socialsDialog.toggle}
                                    >
                                        {refAddress ? "Mint with refferal address" : "Mint"}
                                    </button>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className="w-1/2 mr-4">
                                <Image src={ASSETS.loyaltyGMgif_Original} height={650} width={650} />
                                <button className="w-full mb-6 bg-[#383838] disabled py-2 text-white rounded-2xl font-bold pointer-none font-mono">
                                    Total Minted(before sui redeploy): &gt;{totalMintedBefore}
                                </button>
                                {wallet?.address ? (
                                    <button
                                        className="w-full bg-[#383838] py-2 text-white rounded-2xl font-bold pointer-none font-mono"
                                        onClick={() => emojisplosion()}
                                    >
                                        Total Minted: {totalMinted || 0}
                                    </button>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>

                    <CustomDialog dialog={socialsDialog} className={""} isClose={false}>
                        {(!isGmFollow || !isGmRetweet) && (
                            <div className={"flex flex-col gap-6"}>
                                <div className={"flex text-2xl justify-center"}>Don't forget to follow & retweet</div>
                                <a
                                    href={FOLLOW_TWITTER_GM_LINK}
                                    onClick={checkGmFollow}
                                    target={"_blank"}
                                    className={classNames("main-button", isGmFollow && "bg-success border-none")}
                                >
                                    Follow us on Twitter
                                </a>
                                <a
                                    href={RETWEET_GM_LINK}
                                    onClick={checkGmRetweet}
                                    target={"_blank"}
                                    className={classNames("main-button", isGmRetweet && "bg-success border-none")}
                                >
                                    Retweet us
                                </a>
                            </div>
                        )}
                        <div>
                            {isGmFollow && isGmRetweet && !isMinted ? (
                                <div>
                                    <div className={"flex text-2xl mb-6 justify-center"}>
                                        Mint Soulbound LoyaltyGM Token
                                    </div>

                                    <button
                                        className="secondary-button w-full"
                                        onClick={async () => {
                                            refAddress ? await mint(mintCallWithRef) : await mint(mintCall);
                                        }}
                                    >
                                        {refAddress ? "Mint with referral address" : "Mint"}
                                    </button>
                                </div>
                            ) : (
                                isMinted && (
                                    <div className={"flex flex-col gap-6"}>
                                        <div className={"flex text-2xl justify-center"}>Congratulations! 🥳</div>
                                    </div>
                                )
                            )}
                        </div>
                    </CustomDialog>
                </section>
            </Layout>
        </div>
    );
};

export default Waitlist;
