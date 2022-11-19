import React, { useState, useCallback, useEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Layout from "components/Layout";
import { CopyTextButton } from "components/";
import { ethos } from "ethos-connect";
import { JsonRpcProvider, Network, getObjectFields } from "@mysten/sui.js";
import { useRouter } from "next/router";
import ASSETS from "assets";

const Waitlist: NextPage = () => {
    const { query, isReady } = useRouter();
    const { refAddress } = query;

    const provider = new JsonRpcProvider(Network.DEVNET);
    const { wallet } = ethos.useWallet();

    const [claimXpAddress, setClaimXpAddress] = useState(null);
    const [freeClaimXp, setFreeClaimXP] = useState(null);
    const [totalMinted, setTotalMinted] = useState(null);
    const [currentXP, setCurrentXP] = useState(null);
    const [refCount, setRefCount] = useState(null);

    const contractReferalSystem = "0xf702135a64a91689365686975b65c93dc6893d9c";
    const fullType = `${contractReferalSystem}::token::Token`;
    const contractLoyaltyStore = "0x8872e7fd4d91ff43488343603374d4fe3d8e4247";

    const mintCall = {
        kind: "moveCall" as const,
        data: {
            packageObjectId: contractReferalSystem,
            module: "token",
            function: "mint",
            typeArguments: [],
            arguments: [
                contractLoyaltyStore, //store
            ],
            gasBudget: 10000,
        },
    };

    const mintCallWithRef = {
        kind: "moveCall" as const,
        data: {
            packageObjectId: contractReferalSystem,
            module: "token",
            function: "mint_with_ref",
            typeArguments: [],
            arguments: [
                refAddress, // ref address
                contractLoyaltyStore, //store
            ],
            gasBudget: 10000,
        },
    };

    const getObjects = useCallback(async () => {
        if (!wallet) return;
        try {
            // claim xp button
            const wallet_objects = await provider.getObjectsOwnedByAddress(wallet.address);
            // current xp and ref count
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
            const store_object = await provider.getObject(contractLoyaltyStore);
            setTotalMinted(getObjectFields(store_object).size);

            // claim xp
            const store_objects = await provider.getObjectsOwnedByObject(contractLoyaltyStore);
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
                }
            } catch (error) {
                console.log(error);
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
                        packageObjectId: contractReferalSystem,
                        module: "token",
                        function: "claim_exp",
                        typeArguments: [],
                        arguments: [
                            tokenAddress, // token to update
                            contractLoyaltyStore, //store
                        ],
                        gasBudget: 10000,
                    },
                };
                const response = await wallet.signAndExecuteTransaction(singTransaction);
                //console.log("RESPONSE", response);

                if (response?.effects?.events) {
                    const { moveEvent } = response.effects.events.find((e) => e.moveEvent);
                    //console.log("Object NFT", moveEvent.fields.token_id);
                }
            } catch (error) {
                console.log(error);
            }
        },
        [wallet]
    );

    useEffect(() => {
        getObjects();
    });

    return (
        <div>
            <Layout className="layout-base h-full pb-0" footer={false} isMinHeightTurnOff={true}>
                <section className="relative w-full min-h-full justify-between">
                    <div className="relative flex flex-col items-center min-h-full justify-center bg-purple-400 rounded-lg">
                        <div className="flex gap-10 justify-between w-full">
                            <div className="w-3/4 ml-4">
                                <h1 className="text-highlighter text-white inset-y-0 left-0 pl-4 pt-10">LoyaltyGM</h1>
                                {/* <div className="pl-4">
                                    <Image src={ASSETS.gmLogo} height={60} width={400} />
                                </div> */}

                                <div className="sub-text text-white pl-4 pt-2 pb-10">
                                    NFT LOYALTY REWARD PLATFORM FOR YOUR FAVOURITE WEB3.0 PROJECT
                                </div>
                                {claimXpAddress ? (
                                    <div className="border-2 border-white text-white rounded-xl ml-4 px-4 ">
                                        <p className="ml-4 mt-10 text-xl">Your Loyalty NFT Stats (full on-chain)</p>
                                        <p className="w-full ml-4 mt-6">Current XP: {currentXP || 0}</p>
                                        <p className="w-full ml-4">Refferal Count: {refCount || 0}</p>
                                        <div className="w-full ml-4 gap-2 text-white">
                                            Refferal Link:
                                            <CopyTextButton
                                                copyText={`https://loyaltyGM.com/waitlist?refAddress=${claimXpAddress}`}
                                            />
                                        </div>
                                        <button
                                            className="secondary-button w-full mt-4 mb-10"
                                            onClick={async () => {
                                                await claimXP(claimXpAddress);
                                            }}
                                            disabled={freeClaimXp === 0 ? true : false}
                                        >
                                            Claim {freeClaimXp || 0} XP
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        className="secondary-button w-full"
                                        onClick={async () => {
                                            refAddress ? await mint(mintCallWithRef) : await mint(mintCall);
                                        }}
                                    >
                                        {refAddress ? "Mint with refferal address" : "Mint"}
                                    </button>
                                )}
                            </div>
                            <div className="w-1/2 mr-4">
                                <Image src={ASSETS.loyaltycardMockup} height={400} width={400} />
                                <button className="w-full border-none text-white rounded-sm font-bold pointer-none">
                                    Total Minted: {totalMinted || 0}
                                </button>
                            </div>
                        </div>
                        <div className="flex text-white gap-24 mb-6 absolute bottom-0">
                            <div className="flex gap-24">
                                <a
                                    href="https://twitter.com/Loyalty_GM"
                                    target="_blank"
                                    className="hover:decoration-solid "
                                >
                                    Twitter
                                </a>
                                <p>Discord</p>
                                <p>info@loyaltygm.com</p>
                            </div>
                            <div className="flex pl-14">
                                <p>Support by</p>
                                <Image src={ASSETS.ethosLogo} height={30} width={120} />
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </div>
    );
};

export default Waitlist;
