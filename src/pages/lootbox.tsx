import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useWallet } from "@suiet/wallet-kit";
import Layout from "components/Layout";
import ASSETS from "assets";
import Image from "next/image";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";

const Lootbox: NextPage = () => {
    const packageObjectId = "0xe844685cf48f8705266b9ee973a4d75d97179c9d";
    const boxCollectionID = "0x739cbd1b2cbf934fb30035800fdf61b4d672b64d";

    type ButtonStateType = {
        status: "idle" | "disabled" | "loading" | "success" | "error";
    };
    const [buttonStatus, setButtonStatus] = useState<ButtonStateType["status"]>("idle");

    const wallet = useWallet();
    // const provider = new JsonRpcProvider(Network.DEVNET);

    useEffect(() => {
        if (!wallet.connected) return;
    }, [wallet.connected]);

    const get_lootbox = async () => {
        if (!wallet) return;
        try {
            const singTransaction = {
                transaction: {
                    kind: "moveCall",
                    data: {
                        packageObjectId: packageObjectId,
                        module: "loot_box",
                        function: "buy_box",
                        typeArguments: [],
                        arguments: [
                            boxCollectionID, // box collection
                        ],
                        gasBudget: 10000,
                    },
                },
            };
            setButtonStatus("loading");
            // @ts-ignore
            const response = await wallet.signAndExecuteTransaction(singTransaction);
            console.log("RESPONSE", response);

            if (response?.effects?.events) {
                // const { moveEvent } = response.effects.events.find((e) => e.moveEvent);
                //console.log("Object NFT", moveEvent.fields.token_id);
                const status = response?.effects?.status.status;
                console.log("status", status);
                setButtonStatus("success");
            }
        } catch (error) {
            console.log(error);
            setButtonStatus("error");
        }
    };

    const open_lootbox = async (lootboxID: string) => {
        if (!wallet) return;
        try {
            const singTransaction = {
                transaction: {
                    kind: "moveCall",
                    data: {
                        packageObjectId: packageObjectId,
                        module: "loot_box",
                        function: "open_box",
                        typeArguments: [],
                        arguments: [
                            boxCollectionID, // box collection
                            lootboxID, // lootbox id
                        ],
                        gasBudget: 10000,
                    },
                },
            };
            setButtonStatus("loading");
            // @ts-ignore
            const response = await wallet.signAndExecuteTransaction(singTransaction);
            console.log("RESPONSE", response);

            if (response?.effects?.events) {
                // const { moveEvent } = response.effects.events.find((e) => e.moveEvent);
                //console.log("Object NFT", moveEvent.fields.token_id);
                const status = response?.effects?.status.status;
                console.log("status", status);
                setButtonStatus("success");
            }
        } catch (error) {
            console.log(error);
            setButtonStatus("error");
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
                    <h1 className="text-[8.2rem] mt-10 font-bold text-center w-full">
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
                <div className="flex justify-start -mt-24 ml-24">
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
                    className="sliding-btn w-1/4 mt-10 mb-24"
                    onClick={async () => {
                        await get_lootbox();
                    }}
                >
                    <div className={"flex gap-5 items-center text-base"}>
                        <ArrowRightCircleIcon className={"h-8 w-8 rounded-full text-[#C527D8] bg-white"} />
                        <div>Get my box</div>
                    </div>
                </button>
                <button
                    className="sliding-btn w-1/4 mt-10 mb-24"
                    onClick={async () => {
                        //TODO: check ID of box
                        await open_lootbox("0x2e8c292385c1f39c0c8424489037ec9e231231b3");
                    }}
                >
                    <div className={"flex gap-5 items-center text-base"}>
                        <ArrowRightCircleIcon className={"h-8 w-8 rounded-full text-[#C527D8] bg-white"} />
                        <div>Open box</div>
                    </div>
                </button>
            </Layout>
        </div>
    );
};

export default Lootbox;
