import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useSuiProvider, useWallet } from "@suiet/wallet-kit";
import Layout from "components/Layout";
import ASSETS from "assets";
import Image from "next/image";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import CircleLoader from "components/Button/CircleLoader";
import { LOOTBOX_COLLECTION, LOOTBOX_PACKAGE } from "utils";
import { getObjectFields, getObjectId, Network } from "@mysten/sui.js";
import { useEffectOnce } from "usehooks-ts";

type ButtonStateType = {
    status: "idle" | "disabled" | "loading" | "success" | "error";
};

const LootBoxType = `${LOOTBOX_PACKAGE}::loot_box::LootBox`;

const Lootbox: NextPage = () => {
    const wallet = useWallet();
    const provider = useSuiProvider(Network.DEVNET);

    const [totalMinted, setTotalMinted] = useState("0");
    const [userBox, setUserBox] = useState("");
    const [buttonStatus, setButtonStatus] = useState<ButtonStateType["status"]>("idle");

    const spinTransition = {
        loop: Infinity,
        ease: "linear",
        duration: 1,
    };

    useEffect(() => {
        if (!wallet.connected) return;

        async function fetchUserData() {
            try {
                const objects = await provider.getObjectsOwnedByAddress(wallet.address);
                const box = objects.find((obj) => obj.type === LootBoxType);
                setUserBox(getObjectId(box));
            } catch (e) {
                console.log("failed fetch user ", e);
            }
        }

        fetchUserData().then();
    }, [wallet.connected]);

    useEffectOnce(() => {
        async function fetchTotalOpened() {
            try {
                const collection = getObjectFields(await provider.getObject(LOOTBOX_COLLECTION));
                setTotalMinted(collection._box_minted);
            } catch (e) {
                console.log("failed fetch collection ", e);
            }
        }

        fetchTotalOpened().then();
    });

    const buyBox = async () => {
        if (!wallet) return;
        try {
            const singTransaction = {
                transaction: {
                    kind: "moveCall",
                    data: {
                        packageObjectId: LOOTBOX_PACKAGE,
                        module: "loot_box",
                        function: "buy_box",
                        typeArguments: [],
                        arguments: [
                            LOOTBOX_COLLECTION, // box collection
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

    // TODO: Create dialog to show loot and rarity
    const openBox = async () => {
        if (!wallet || !userBox) return;
        try {
            const singTransaction = {
                transaction: {
                    kind: "moveCall",
                    data: {
                        packageObjectId: LOOTBOX_PACKAGE,
                        module: "loot_box",
                        function: "open_box",
                        typeArguments: [],
                        arguments: [
                            LOOTBOX_COLLECTION, // box collection
                            userBox, // lootbox id
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
                            <p className="gradient-font ">{totalMinted} / 30000</p>
                            <p className="gradient-font text-white">total minted</p>
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
                <motion.div layout className={"flex justify-center mt-10"}>
                    {buttonStatus === "loading" ? (
                        <button className="bg-white flex-col items-center py-2 rounded-3xl w-1/4" disabled={true}>
                            <CircleLoader />
                        </button>
                    ) : (
                        <button
                            className="sliding-btn w-1/4"
                            onClick={async () => {
                                userBox ? await openBox() : await buyBox();
                            }}
                        >
                            <div className={"flex gap-5 items-center text-base"}>
                                <ArrowRightCircleIcon className={"h-8 w-8 rounded-full text-[#C527D8] bg-white"} />
                                <div>{userBox ? "Open box" : "Get my box"}</div>
                            </div>
                        </button>
                    )}
                </motion.div>
            </Layout>
        </div>
    );
};

export default Lootbox;
