import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { getObjectFields, Network, Ed25519Keypair, JsonRpcProvider, RawSigner } from "@mysten/sui.js";
import { useWallet, useAccountBalance } from "@suiet/wallet-kit";
import Layout from "components/Layout";
import ASSETS from "assets";
import Image from "next/image";

const Lootbox: NextPage = () => {
    const packageObjectId = "0x90b3af3577d0481b5b6a46713330256c2076e871";
    const boxCollectionID = "0x982ad66c37e99d54cc8b77e7cec1d871c95bbab8";
    // TODO: Change automatically

    const box_price = "0xa598488141d3667b8826e3e6bd45348c8a35ff30";
    const wallet = useWallet();

    // Generate a new Ed25519 Keypair
    const keypair = new Ed25519Keypair();
    const provider = new JsonRpcProvider(Network.DEVNET);
    const signer = new RawSigner(keypair, provider);
    const balance = useAccountBalance();

    useEffect(() => {
        if (!wallet.connected) return;
        console.log("connected wallet name: ", wallet.name);
        console.log("account address: ", wallet.account?.address);
        console.log("account publicKey: ", wallet.account?.publicKey);
        //getObjects().then();
    }, [wallet.connected, balance.balance]);

    const getObjects = async () => {
        if (!wallet.address) return;
        try {
            console.log("try");

            let gas_objects = await provider.getObjectsOwnedByAddress(wallet.address);
            gas_objects = gas_objects.filter((e) => e.type === "0x2::coin::Coin<0x2::sui::SUI>");
            console.log("gas_objects", gas_objects);
            console.log("balance", balance.balance);
            while (gas_objects.length > 2) {
                let main_object = gas_objects[0];
                let second_object = gas_objects[1];
                console.log(main_object);
                let merge = await signer.mergeCoin({
                    primaryCoin: main_object.objectId,
                    coinToMerge: second_object.objectId,
                    gasBudget: 1000,
                });
                console.log("Merge", merge);

                gas_objects = await provider.getObjectsOwnedByAddress(await signer.getAddress());
                gas_objects = gas_objects.filter((e) => e.type === "0x2::coin::Coin<0x2::sui::SUI>");
                // console.log(gasObjects);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const buy_lootbox = async () => {
        if (!wallet) return;
        try {
            const singTransaction = {
                transaction: {
                    kind: "moveCall",
                    data: {
                        packageObjectId: packageObjectId,
                        module: "loot_box",
                        function: "buy_box",
                        typeArguments: [
                            //"0x17e4fd81d9ec1138ac3056b3c284f0c015e54510::loot_box::BoxCollection", // box collection
                            //"0x2::sui::SUI", // sui box price
                        ],
                        arguments: [
                            boxCollectionID, // box collection
                            box_price, // box price
                        ],
                        gasBudget: 10000,
                    },
                },
            };
            const response = await wallet.signAndExecuteTransaction(singTransaction);
            console.log("RESPONSE", response);

            if (response?.effects?.events) {
                // const { moveEvent } = response.effects.events.find((e) => e.moveEvent);
                //console.log("Object NFT", moveEvent.fields.token_id);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <Layout
                className="layout-base bg-[#1C1D25] h-full pb-0"
                isMinHeightTurnOff={true}
                headerBackground="bg-[#1C1D25]"
            >
                <div>
                    <h1 className="text-[10rem] mt-10 font-bold text-center w-full">
                        <span className="text-[#C527D8] whitespace-no-wrap">Be </span>
                        among the
                        <span className="text-[#C527D8]"> first</span>
                    </h1>
                    <div className="flex justify-end px-6 py-1 text-right gap-2 text-[3.2vw]">
                        <div className="flex gap-2 px-6 py-1 rounded-xl bg-[#25262F]">
                            <p className="gradient-font ">0/30000</p>
                            <p className="gradient-font text-white">total opened</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start -mt-16 ml-12">
                    <div className="relative w-60 h-60">
                        <Image
                            src={ASSETS.LBOX}
                            alt="Description of image"
                            layout="fill"
                            objectFit="cover"
                            className="absolute top-0 left-0 w-full h-full"
                        />
                        <p className="absolute bottom-0 left-0 -ml-6 text-[#C527D8] text-2xl font-bold">1.</p>
                        <p className="absolute bottom-0 left-0 -ml-6 -mb-8 text-white text-4xl font-bold">Get Box</p>
                    </div>
                </div>
                <div className="flex justify-end pb-6 -mt-16 mr-12">
                    <div className="relative w-60 h-60">
                        <Image
                            src={ASSETS.LQUESTION}
                            alt="Description of image"
                            layout="fill"
                            objectFit="cover"
                            className="absolute top-0 left-0 w-full h-full"
                        />
                        <p className="absolute bottom-0 left-0 -ml-6 text-[#C527D8] text-2xl font-bold">2.</p>
                        <p className="absolute bottom-0 left-0 -ml-6 -mb-8 text-white text-4xl font-bold">Open Box</p>
                    </div>
                </div>
                <button
                    className="secondary-button bg-white w-1/2 mt-10 mb-24 border-none font-mono hover:bg-[#C527D8]"
                    onClick={async () => {
                        await getObjects();
                    }}
                >
                    Get my box
                </button>
            </Layout>
        </div>
    );
};

export default Lootbox;
