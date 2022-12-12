import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useSuiProvider, useWallet } from "@suiet/wallet-kit";
import Layout from "components/Layout";
import ASSETS from "assets";
import Image from "next/image";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import CircleLoader from "components/Button/CircleLoader";
import { INFURA_IPFS_GATEWAY, LOOTBOX_COLLECTION, LOOTBOX_PACKAGE } from "utils";
import { getCreatedObjects, getExecutionStatusType, getObjectFields, getObjectId, Network } from "@mysten/sui.js";
import { useEffectOnce } from "usehooks-ts";
import { SuiSignAndExecuteTransactionInput } from "@mysten/wallet-standard";
import { CustomDialog } from "../components";
import { useDialogState } from "ariakit";

type ButtonStateType = {
    status: "idle" | "disabled" | "loading" | "success" | "error";
};

const LootBoxType = `${LOOTBOX_PACKAGE}::loot_box::LootBox`;
type LootRarityType = "Bronze" | "Silver" | "Gold";
const LootImages: {
    [key in LootRarityType]: string;
} = {
    Bronze: `${INFURA_IPFS_GATEWAY}QmcveqhgjHAdirfkGbDSw7AC4o2u7Z9B18zZiA24rxnChY`,
    Silver: `${INFURA_IPFS_GATEWAY}QmYoHbRAuynBrVfQk5HY3T5gNsYvQpX4WHLrHJZ1RZbad8`,
    Gold: `${INFURA_IPFS_GATEWAY}QmVJihewqn18jafEJk3CQB232NjNvZR96gJ72oWbFLPNij`,
};

const Lootbox: NextPage = () => {
    const wallet = useWallet();
    const provider = useSuiProvider(Network.DEVNET);

    const lootDialog = useDialogState();
    const [buttonStatus, setButtonStatus] = useState<ButtonStateType["status"]>("idle");

    const [totalMinted, setTotalMinted] = useState("0");
    const [userBox, setUserBox] = useState("");
    const [lootType, setLootType] = useState("");

    async function fetchUserData() {
        try {
            console.log("fetch user");
            const objects = await provider.getObjectsOwnedByAddress(wallet.address);
            const box = objects.find((obj) => obj.type === LootBoxType);
            box ? setUserBox(getObjectId(box)) : setUserBox("");
        } catch (e) {
            console.log("failed fetch user ", e);
        }
    }

    useEffect(() => {
        if (!wallet.connected) return;

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
            } as SuiSignAndExecuteTransactionInput;
            setButtonStatus("loading");
            const response = await wallet.signAndExecuteTransaction(singTransaction);
            console.log("RESPONSE", response);

            const status = getExecutionStatusType(response);
            console.log(`status ${status}`);
            setButtonStatus(status === "success" ? "success" : "error");

            fetchUserData().then();
        } catch (error) {
            console.log(error);
            setButtonStatus("error");
        }
    };

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
            } as SuiSignAndExecuteTransactionInput;
            setButtonStatus("loading");
            const response = await wallet.signAndExecuteTransaction(singTransaction);
            console.log("RESPONSE", response);

            const status = getExecutionStatusType(response);
            console.log(`status ${status}`);
            setButtonStatus(status === "success" ? "success" : "error");

            if (status === "success") {
                const objectId = getCreatedObjects(response)[0].reference.objectId;
                const type: LootRarityType = getObjectFields(await provider.getObject(objectId)).rarity;
                setLootType(type);
            }

            fetchUserData().then();
            lootDialog.toggle();
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

                <CustomDialog dialog={lootDialog} className={""}>
                    <div className={"flex flex-col items-center gap-2 justify-between w-full"}>
                        <div>
                            <Image
                                src={lootType ? LootImages[lootType] : ASSETS.LQUESTION}
                                alt="Description of image"
                                height={300}
                                width={300}
                                className={"flex"}
                            />
                        </div>
                        <div className={"text-xl"}>It's your {lootType} loot!</div>
                        <button type={"button"} className={"sliding-btn"} onClick={lootDialog.hide}>
                            Got it!
                        </button>
                    </div>
                </CustomDialog>
            </Layout>
        </div>
    );
};

export default Lootbox;
