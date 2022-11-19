import React, { useState, useCallback, useEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Layout from "components/Layout";
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
            // console.log("Objects form address", walletObjects);
            wallet_objects.map(async (value) => {
                if (value.type === fullType) {
                    //console.log(value);
                    setClaimXpAddress(value.objectId);
                    const nft_object = await provider.getObject(value.objectId);
                    const nft_object_fields = getObjectFields(nft_object);
                    console.log(nft_object_fields);
                    setCurrentXP(nft_object_fields.current_exp);
                    setRefCount(nft_object_fields.ref_counter);
                }
            });

            // total minted
            const object = await provider.getObject(contractLoyaltyStore);
            setTotalMinted(getObjectFields(object).size);

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

    useEffect(() => {
        getObjects();
    });

    return (
        <div>
            <Layout className="layout-base h-full pb-2" footer={false} isMinHeightTurnOff={true}>
                <section className="relative w-full min-h-full justify-between">
                    <div className="flex flex-col items-center min-h-full justify-center pb-3 bg-purple-400 rounded-lg">
                        <div className="flex gap-10 justify-between">
                            <div>
                                {/* <p>Object ID: {nftObjectId}</p> */}
                                {claimXpAddress ? (
                                    <>
                                        <button
                                            className="secondary-button w-full"
                                            onClick={async () => {
                                                await claimXP(claimXpAddress);
                                            }}
                                        >
                                            Claim {freeClaimXp || 0} XP
                                        </button>
                                        <p>Current XP: {currentXP || 0}</p>
                                        <p>Refferal Count: {refCount || 0}</p>
                                    </>
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
                            <div>
                                <Image src={ASSETS.gifMockup} height={400} width={400} />
                                <button className="secondary-button w-1/2">Total Minted: {totalMinted || 0}</button>
                            </div>
                        </div>
                        <div className="bottom-0 flex gap-4">
                            <p>Twitter</p>
                            <p>Discord</p>
                        </div>
                    </div>
                </section>
            </Layout>
        </div>
    );
};

export default Waitlist;
