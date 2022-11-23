import React, { useCallback, useEffect, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Layout from "components/Layout";
import { CopyTextButton, CustomDialog } from "components/";
import { getObjectFields, JsonRpcProvider, Network } from "@mysten/sui.js";
import { useRouter } from "next/router";
import ASSETS from "assets";
import { useDialogState } from "ariakit";
import {
    APP_URL,
    FOLLOW_TWITTER_ETHOS_LINK,
    FOLLOW_TWITTER_GM_LINK,
    RETWEET_ETHOS_LINK,
    RETWEET_GM_LINK,
} from "../utils";
import { useBoolean } from "usehooks-ts";
import classNames from "classnames";
import toast from "react-hot-toast";
import { ethos, SignInButton } from "ethos-connect";
import { emojisplosion } from "emojisplosion";

const Waitlist: NextPage = () => {
    const { query } = useRouter();
    const { refAddress } = query;

    const provider = new JsonRpcProvider(Network.DEVNET);
    const { wallet } = ethos.useWallet();

    const [claimXpAddress, setClaimXpAddress] = useState(null);
    const [walletAddress, setWalletAddress] = useState(null)
    const [freeClaimXp, setFreeClaimXP] = useState(null);
    const [totalMinted, setTotalMinted] = useState(null);
    const [currentXP, setCurrentXP] = useState(null);
    const [refCount, setRefCount] = useState(null);

    const socialsDialog = useDialogState();
    const { value: isGmFollow, setTrue: checkGmFollow } = useBoolean(false);
    const { value: isGmRetweet, setTrue: checkGmRetweet } = useBoolean(false);
    const { value: isEthosFollow, setTrue: checkEthosFollow } = useBoolean(false);
    const { value: isEthosRetweet, setTrue: checkEthosRetweet } = useBoolean(false);

    const { value: isMinted, setTrue: setMinted } = useBoolean(false);

    const packageObjectId = process.env.NEXT_PUBLIC_PACKAGE_ID;
    const dataTableObjectId = process.env.NEXT_PUBLIC_DATA_TABLE_ID;

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

    const getObjects = useCallback(async () => {
        if (!wallet?.address) return;
        try {
            // claim xp button
            const wallet_objects = await provider.getObjectsOwnedByAddress(wallet.address);
            // current xp and ref count
            setWalletAddress(wallet.address)
            wallet_objects.map(async (value) => {
                if (value.type === fullType) {
                    setClaimXpAddress(value.objectId);
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
                if (claim_xp_field.owner === wallet.address) {
                    setFreeClaimXP(claim_xp_field.claimable_exp);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }, [wallet]);

    const mint = useCallback(
        async (singTransaction) => {
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
                    }
                }
            } catch (error) {
                console.log(error);
                toast.error("Mint failed");
            }
        },
        [wallet]
    );

    const claimXP = useCallback(
        async (tokenAddress) => {
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
        },
        [wallet]
    );

    useEffect(() => {
        getObjects().then();
    });

    return (
        <div>
            <Layout className="layout-base bg-purple-500 h-full pb-0" isMinHeightTurnOff={true}>
                <section className="relative w-full min-h-full justify-between">
                    <div className="relative flex flex-col items-center min-h-full justify-center bg-purple-500 rounded-lg">
                        {/* Main Features */}
                        <div className="flex justify-around w-full pb-8 text-white font-mono">
                            <div className="flex">
                                <Image src={ASSETS.emoji3} width={50} height={50} layout={"fixed"} />
                                <p className="flex justify-center items-center w-1/2">
                                    Loyalty NFT system for projects
                                </p>
                            </div>
                            <div className="flex">
                                <Image src={ASSETS.emoji2} width={50} height={50} layout={"fixed"} />
                                <p className="flex justify-center items-center w-1/2">On-chain levels and xp</p>
                            </div>
                            <div className="flex">
                                <Image src={ASSETS.emoji1} width={50} height={50} layout={"fixed"} />
                                <p className="flex justify-center items-center w-1/2">
                                    Complete daily tasks and get rewards
                                </p>
                            </div>
                        </div>
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
                                            <CopyTextButton
                                                copyText={`https://${APP_URL}/waitlist?refAddress=${walletAddress}`}
                                                color={""}
                                            />
                                        </div>
                                        <button
                                            className="secondary-button w-full mt-4 mb-10 font-mono"
                                            onClick={async () => {
                                                await claimXP(claimXpAddress);
                                            }}
                                            disabled={freeClaimXp === 0}
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
                                    <SignInButton className="secondary-button ml-4 bg-white">
                                        Connect Wallet
                                    </SignInButton>
                                )}
                            </div>
                            <div className="w-1/2 mr-4">
                                <Image src={ASSETS.loyaltyGMgif_Original} height={650} width={650} />
                                <button
                                    className="w-full mb-6 bg-[#383838] disabled py-2 text-white rounded-2xl font-bold pointer-none font-mono"
                                >
                                    Total Minted(before sui redeploy):  &gt;23000
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
                        {(!isGmFollow || !isGmRetweet || !isEthosFollow || !isEthosRetweet) && (
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
                                <a
                                    href={FOLLOW_TWITTER_ETHOS_LINK}
                                    onClick={checkEthosFollow}
                                    target={"_blank"}
                                    className={classNames("main-button", isEthosFollow && "bg-success border-none")}
                                >
                                    Follow Ethos on Twitter
                                </a>
                                <a
                                    href={RETWEET_ETHOS_LINK}
                                    onClick={checkEthosRetweet}
                                    target={"_blank"}
                                    className={classNames("main-button", isEthosRetweet && "bg-success border-none")}
                                >
                                    Retweet Ethos
                                </a>
                            </div>
                        )}
                        <div>
                            {isGmFollow && isGmRetweet && isEthosFollow && isEthosRetweet && !isMinted ? (
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
                                        {/*{totalMinted < 8192 ? (*/}
                                        {/*    <div>*/}
                                        {/*        <div className={"flex text-xl justify-center"}>Ethos discord link:</div>*/}
                                        {/*        <a*/}
                                        {/*            href={DISCORD_LINK}*/}
                                        {/*            className={"flex text-xl btn-link justify-center"}*/}
                                        {/*            target={"_blank"}*/}
                                        {/*        >*/}
                                        {/*            {DISCORD_LINK}*/}
                                        {/*        </a>*/}
                                        {/*    </div>*/}
                                        {/*) : (*/}
                                        {/*    <></>*/}
                                        {/*)}*/}
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
