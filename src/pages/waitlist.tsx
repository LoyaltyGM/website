import React, { useState, useCallback } from "react";
import { NextPage } from "next";
import Layout from "components/Layout";
import { ethos } from "ethos-connect";
import { JsonRpcProvider, Network } from "@mysten/sui.js";

const waitlist: NextPage = () => {
    const provider = new JsonRpcProvider(Network.DEVNET);
    const { wallet } = ethos.useWallet();
    const [nftObjectId, setNftObjectId] = useState(null);
    const contractLoyaltyAddress = "0x216ae9e074c5292685d95e334f7f0b9ceb3e3161";
    const contractLoyaltyStore = "0x8dbfd8df23d3864c0f9c9702d6bd6d7545bc5c82";
    const mintedRefAddress = "0xaccf79bc54e84fb20467b99d5887fbe59e25c705";

    const firstToken = "0xda23df6764a623fabb8a7518763eae2a5d9d64f5";
    const mintButton = useCallback(async () => {
        if (!wallet) return;
        try {
            const singTransaction = {
                kind: "moveCall" as const,
                data: {
                    packageObjectId: contractLoyaltyAddress,
                    module: "referal_token",
                    function: "mint",
                    typeArguments: [],
                    arguments: [
                        contractLoyaltyStore, //store
                    ],
                    gasBudget: 10000,
                },
            };
            const response = await wallet.signAndExecuteTransaction(singTransaction);
            console.log("RESPONSE", response);

            if (response?.effects?.events) {
                const { moveEvent } = response.effects.events.find((e) => e.moveEvent);
                setNftObjectId(moveEvent.fields.object_id);
                console.log("Object NFT", moveEvent.fields.object_id);
            }
        } catch (error) {
            console.log(error);
        }
    }, [wallet]);

    const mintButtonWithRef = useCallback(async () => {
        if (!wallet) return;
        try {
            const singTransaction = {
                kind: "moveCall" as const,
                data: {
                    packageObjectId: contractLoyaltyAddress,
                    module: "referal_token",
                    function: "mint_with_ref",
                    typeArguments: [],
                    arguments: [
                        mintedRefAddress, // ref address
                        contractLoyaltyStore, //store
                    ],
                    gasBudget: 10000,
                },
            };
            const response = await wallet.signAndExecuteTransaction(singTransaction);
            console.log("RESPONSE", response);

            if (response?.effects?.events) {
                const { moveEvent } = response.effects.events.find((e) => e.moveEvent);
                setNftObjectId(moveEvent.fields.object_id);
                console.log("Object NFT", moveEvent.fields.object_id);
            }
        } catch (error) {
            console.log(error);
        }
    }, [wallet]);

    const claimXP = useCallback(async () => {
        if (!wallet) return;
        try {
            const singTransaction = {
                kind: "moveCall" as const,
                data: {
                    packageObjectId: contractLoyaltyAddress,
                    module: "referal_token",
                    function: "claim_exp",
                    typeArguments: [],
                    arguments: [
                        firstToken, // token to update
                        contractLoyaltyStore, //store
                    ],
                    gasBudget: 10000,
                },
            };
            const response = await wallet.signAndExecuteTransaction(singTransaction);
            console.log("RESPONSE", response);

            if (response?.effects?.events) {
                const { moveEvent } = response.effects.events.find((e) => e.moveEvent);
                setNftObjectId(moveEvent.fields.object_id);
                console.log("Object NFT", moveEvent.fields.object_id);
            }
        } catch (error) {
            console.log(error);
        }
    }, [wallet]);

    return (
        <div>
            <Layout className="layout-base">
                <section className="relative w-full">
                    <h1>HELLLOOOOOO</h1>
                    <div className="flex flex-col items-center justify-center pb-3">
                        <button
                            className="secondary-button w-1/3"
                            onClick={async () => {
                                await mintButton();
                            }}
                        >
                            Mint
                        </button>

                        <button
                            className="secondary-button w-1/3"
                            onClick={async () => {
                                await mintButtonWithRef();
                            }}
                        >
                            Mint With Ref
                        </button>
                        <p>Object ID: {nftObjectId}</p>

                        <button
                            className="secondary-button w-1/3"
                            onClick={async () => {
                                await claimXP();
                            }}
                        >
                            Claim XP
                        </button>
                    </div>
                </section>
            </Layout>
        </div>
    );
};

export default waitlist;
