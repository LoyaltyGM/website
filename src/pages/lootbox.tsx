import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useSuiProvider, useWallet } from "@suiet/wallet-kit";
import Layout from "components/Layout";
import ASSETS from "assets";
import Image from "next/image";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import CircleLoader from "components/Button/CircleLoader";
import {
    FOLLOW_TWITTER_GM_LINK,
    FOLLOW_TWITTER_SE_LINK,
    FOLLOW_TWITTER_SW_LINK,
    INFURA_IPFS_GATEWAY,
    LOOTBOX_COLLECTION,
    LOOTBOX_PACKAGE,
    RETWEET_LOOTBOX_LINK,
} from "utils";
import { getCreatedObjects, getExecutionStatusType, getObjectFields, getObjectId, Network } from "@mysten/sui.js";
import { useBoolean, useEffectOnce } from "usehooks-ts";
import { SuiSignAndExecuteTransactionInput } from "@mysten/wallet-standard";
import { CustomDialog } from "components";
import { useDialogState } from "ariakit";
import toast from "react-hot-toast";
import classNames from "classnames";

type ButtonStateType = {
    status: "idle" | "disabled" | "loading" | "success" | "error";
};

const LootBoxType = `${LOOTBOX_PACKAGE}::loot_box::LootBox`;
const LootType = `${LOOTBOX_PACKAGE}::loot_box::Loot`;
type LootRarityType = "Bronze" | "Silver" | "Gold";
const LootImages: {
    [key in LootRarityType]: string;
} = {
    Bronze: `${INFURA_IPFS_GATEWAY}Qma46vSK5UvTaho6NMQ8h1u1coXQ1YcCBUYri2uSJ6PTcT`,
    Silver: `${INFURA_IPFS_GATEWAY}QmREjYdo9FhkBez3rPwbHypiS4ZrPYqF1rKzWWTnSd1idj`,
    Gold: `${INFURA_IPFS_GATEWAY}QmRTxSnERk8RrdoPhZWL5qRJwVxyc1t9aGYSwqgyS8HY7Z`,
};

const Lootbox: NextPage = () => {
    const wallet = useWallet();
    const provider = useSuiProvider(Network.DEVNET);

    const lootDialog = useDialogState();
    const socialsDialog = useDialogState();
    const [buttonStatus, setButtonStatus] = useState<ButtonStateType["status"]>("idle");

    const { value: showSocials, setTrue: enableSocials } = useBoolean(false);
    const { value: isFollowGM, setTrue: checkFollowGM } = useBoolean(false);
    const { value: isFollowSW, setTrue: checkFollowSW } = useBoolean(false);
    const { value: isFollowSE, setTrue: checkFollowSE } = useBoolean(false);
    const { value: isRetweet, setTrue: checkRetweet } = useBoolean(false);

    const [totalMinted, setTotalMinted] = useState("0");
    const [userBox, setUserBox] = useState("");
    const [lootType, setLootType] = useState("");

    async function fetchUserData() {
        try {
            console.log("fetch user");
            const objects = await provider.getObjectsOwnedByAddress(wallet.address);
            const box = objects.find((obj) => obj.type === LootBoxType);
            const loot = objects.find((obj) => obj.type === LootType);
            box ? setUserBox(getObjectId(box)) : setUserBox("");

            if (!box && !loot) {
                enableSocials();
            }
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
            const status = getExecutionStatusType(response);
            //console.log(`status ${status}`);
            setButtonStatus(status === "success" ? "success" : "error");
            status === "success" && toast.success("Success! Now you can open the box");
            status === "failure" && toast.error("Transaction failed");
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
            setButtonStatus("error");
        } finally {
            fetchUserData().then();
            socialsDialog.hide();
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
                lootDialog.toggle();
            }

            status === "failure" && toast.error("Transaction failed");
            fetchUserData().then();
        } catch (error) {
            console.log(error);
            setButtonStatus("error");
        }
    };

    return (
        <div>
            <Layout
                className="layout-base bg-[#1C1D25] h-full"
                isMinHeightTurnOff={true}
                headerBackground="bg-[#1C1D25]"
            >
                <div>
                    <h1 className="text-5xl md:text-7xl lg:text-9xl mt-10 font-bold text-center w-full">
                        <span className="text-[#C527D8] whitespace-no-wrap">Be </span>
                        among the
                        <span className="text-[#C527D8]"> first</span>
                    </h1>
                    <div className="flex justify-end px-6 py-1 pt-5 text-right gap-2 text-2xl md:text-3xl lg:text-4xl ">
                        <div className="flex gap-2 px-6 py-1 rounded-xl bg-[#25262F]">
                            <p className="gradient-font ">{totalMinted} / 30000</p>
                            <p className="gradient-font text-white">total minted</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-start ml-12 lg:-mt-24 lg:ml-24">
                    <div className="relative w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96">
                        <Image
                            src={ASSETS.LBOX_S}
                            alt="Description of image"
                            layout="fill"
                            className="absolute top-0 left-0 w-full h-full"
                        />
                        <p className="absolute bottom-0 left-0 mb-8 ml-4 text-[#C527D8] text-base md:text-xl lg:text-2xl font-bold">
                            1.
                        </p>
                        <p className="absolute bottom-0 left-0 ml-4 text-white text-xl md:text-2xl lg:text-4xl font-bold">
                            Get Box
                        </p>
                    </div>
                </div>
                <div className="flex justify-end pb-6 mr-12 lg:-mt-16 lg:mr-24 ">
                    <div className="relative w-60 h-60 md:w-80 md:h-80 lg:w-96 lg:h-96">
                        <Image
                            src={ASSETS.LQUESTION_S}
                            alt="Description of image"
                            layout="fill"
                            objectFit="cover"
                            className="absolute top-0 left-0 w-full h-full"
                        />
                        <p className="absolute bottom-0 z-10 left-0 mb-8 ml-4 text-[#C527D8] text-base md:text-xl lg:text-2xl font-bold">
                            2.
                        </p>
                        <p className="absolute bottom-0 left-0 ml-4 text-white text-xl md:text-2xl lg:text-4xl  font-bold">
                            Open Box
                        </p>
                    </div>
                </div>
                <motion.div layout className="flex justify-center mt-10 pb-10 z-50">
                    {buttonStatus === "loading" ? (
                        <button className="bg-white flex-col items-center py-2 rounded-3xl w-60" disabled={true}>
                            <CircleLoader />
                        </button>
                    ) : (
                        <button
                            className="sliding-btn w-60"
                            onClick={async () => {
                                userBox ? await openBox() : socialsDialog.toggle();
                            }}
                        >
                            <div className={"flex gap-5 items-center text-base"}>
                                <ArrowRightCircleIcon className={"h-8 w-8 rounded-full text-[#C527D8] bg-white"} />
                                <div>{userBox ? "Open box" : "Get my box"}</div>
                            </div>
                        </button>
                    )}
                </motion.div>

                <CustomDialog dialog={socialsDialog} className={"bg-[#181A20]"} isClose={false}>
                    {(!isFollowGM || !isFollowSE || !isFollowSW || !isRetweet) && showSocials ? (
                        <div className={"flex flex-col gap-6 py-8 px-4"}>
                            <div className={"flex text-2xl justify-center text-white"}>
                                Don't forget to follow & retweet
                            </div>
                            <a
                                href={FOLLOW_TWITTER_GM_LINK}
                                onClick={checkFollowGM}
                                target={"_blank"}
                                className={classNames("main-button", isFollowGM && "bg-success border-none")}
                            >
                                Subscribe LoyaltyGM
                            </a>
                            <a
                                href={FOLLOW_TWITTER_SW_LINK}
                                onClick={checkFollowSW}
                                target={"_blank"}
                                className={classNames("main-button", isFollowSW && "bg-success border-none")}
                            >
                                Subscribe Suiet Wallet
                            </a>
                            <a
                                href={FOLLOW_TWITTER_SE_LINK}
                                onClick={checkFollowSE}
                                target={"_blank"}
                                className={classNames("main-button", isFollowSE && "bg-success border-none")}
                            >
                                Subscribe SuiEcosystem
                            </a>
                            <a
                                href={RETWEET_LOOTBOX_LINK}
                                onClick={checkRetweet}
                                target={"_blank"}
                                className={classNames("main-button", isRetweet && "bg-success border-none")}
                            >
                                Retweet
                            </a>
                        </div>
                    ) : (
                        <div className="py-8 px-4">
                            <div className={"flex text-2xl mb-6 justify-center text-white"}>Mint LoyaltyGM LootBox</div>

                            <button
                                className="sliding-btn w-full"
                                onClick={async () => {
                                    await buyBox();
                                }}
                                disabled={buttonStatus === "loading"}
                            >
                                Get LootBox
                            </button>
                        </div>
                    )}
                </CustomDialog>

                <CustomDialog dialog={lootDialog} className="py-14 px-4 bg-[#181A20]">
                    <div className={"flex flex-col items-center gap-2 justify-between w-full"}>
                        <div>
                            <Image
                                src={lootType ? LootImages[lootType] : ASSETS.LQUESTION}
                                alt="Description of image"
                                height={300}
                                width={300}
                                className={"flex rounded-2xl"}
                            />
                        </div>
                        <div className={"text-xl text-white"}>It's your {lootType} loot!</div>
                        <button type={"button"} className={"sliding-btn w-1/2"} onClick={lootDialog.hide}>
                            Got it!
                        </button>
                    </div>
                </CustomDialog>
            </Layout>
        </div>
    );
};

export default Lootbox;
