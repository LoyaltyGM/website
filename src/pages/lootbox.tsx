import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useWallet } from "@suiet/wallet-kit";
import Layout from "components/Layout";
import ASSETS from "assets";
import Image from "next/image";

const Lootbox: NextPage = () => {
    const packageObjectId = "0x17e4fd81d9ec1138ac3056b3c284f0c015e54510";
    const boxCollectionID = "0x8e0e0481326bc70270a0850db0cffbf306217fa8";
    const box_price = "0xa598488141d3667b8826e3e6bd45348c8a35ff30";
    const wallet = useWallet();

    useEffect(() => {
        if (!wallet.connected) return;
        console.log("connected wallet name: ", wallet.name);
        console.log("account address: ", wallet.account?.address);
        console.log("account publicKey: ", wallet.account?.publicKey);
    }, [wallet.connected]);

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
                <h1 className="text-8xl font-bold text-center">
                    <span className="text-purple-500 whitespace-no-wrap">Be </span>
                    among the
                    <span className="text-purple-500"> first</span>
                </h1>
                <div className="flex bg-[#25262F] rounded-2xl px-6 py-1 w-1/2 items-center gap-2 ">
                    <p className="gradient-font">0/30000</p>
                    <p className="gradient-font text-white">total opened</p>
                </div>
                <Image src={ASSETS.LBOX} height={225} width={225} />
                <button
                    className="secondary-button w-full mt-4 mb-10 font-mono"
                    onClick={async () => {
                        await buy_lootbox();
                    }}
                >
                    Buy Lootbox
                </button>
                <Image src={ASSETS.LQUESTION} height={225} width={225} />
            </Layout>
        </div>
    );
};

export default Lootbox;
