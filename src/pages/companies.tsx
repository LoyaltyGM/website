import * as React from "react";
import type { NextPage } from "next";
import Sidebar from "components/Layout/Sidebar";
import { BackButton, TwitterIcon, DiscordIcon, WebsiteIcon, Tabs } from "components";
import { LinkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import ASSETS from "assets";
import { useBoolean, useCounter, useLocalStorage } from "usehooks-ts";

const Companies = () => {
    const isLoaded = true;
    const websiteMockup = "https://www.google.com";
    const { count: selectedTab, setCount: setSelectedTab } = useCounter(0);

    const CompaniesHeader = () => {
        return (
            <div className="px-4 py-2 flex h-36 w-full gap-4 items-center content-center">
                <Image src={ASSETS.suietLogo} alt="Description of image" layout="fixed" className="w-20 h-20" />
                <div className="space-y-2 w-full">
                    <div className="justify-between flex content-center items-center">
                        <h1 className="text-3xl text-white">Uniswap Loyalty Card</h1>
                        <div className="flex gap-4">
                            <TwitterIcon />
                            <DiscordIcon />
                        </div>
                    </div>

                    <p className="text-[#AAAAAA]">0x01111111</p>
                    <p className="text-[#AAAAAA]">Description aoosososososososoosososoosos</p>
                </div>
            </div>
        );
    };
    return (
        <Sidebar>
            <BackButton className="text-white mb-2" />
            {/* <CompaniesHeader /> */}
            <section className="dao app-section pt-24 flex h-full flex-1 flex-col gap-[50px]">
                <div className="dao-header flex flex-col md:flex-row items-center -mt-10">
                    <div className="avatar">
                        <div className="w-32 rounded-full">
                            <Image src={ASSETS.suietLogo} height={"175px"} width={"175px"} className="rounded-full" />
                        </div>
                    </div>
                    <div className={"info flex flex-col w-full gap-8 md:ml-6"}>
                        <div className={"info-row-1 flex flex-col md:flex-row justify-between items-center"}>
                            <div className={"dao-name"}>
                                <p className="dao-label capitalize text-white">Suiet Loyalty Card</p>
                            </div>
                            <div className={"member-button"}>
                                <button className={"main-button"}>Become a member</button>
                            </div>
                        </div>
                        <div className={"info-row-2 flex justify-between"}>
                            <div className={"about flex flex-col gap-2 md:flex-row md:gap-10"}>
                                <a
                                    href={websiteMockup}
                                    target={"_blank"}
                                    className="hover:text-primary badge-button items-center"
                                >
                                    About
                                    <LinkIcon className="h-3.5 w-3.5" />
                                </a>
                            </div>
                            <div className={"links flex gap-5"}>
                                {websiteMockup && (
                                    <a href={websiteMockup} target={"_blank"}>
                                        <div className="social-button">
                                            <DiscordIcon width="19" height="20" />
                                        </div>
                                    </a>
                                )}
                                {websiteMockup && (
                                    <a href={websiteMockup} target={"_blank"}>
                                        <div className="social-button">
                                            <TwitterIcon width="18" height="20" />
                                        </div>
                                    </a>
                                )}

                                {websiteMockup && (
                                    <a href={websiteMockup} target="_blank">
                                        <div className="social-button">
                                            <WebsiteIcon width="19" height="20" />
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <Tabs
                        selectedTab={selectedTab}
                        onClick={setSelectedTab}
                        tabs={[
                            {
                                label: "Quests",
                                index: 0,
                                Component: () => {
                                    return <h1>Quesssstsss</h1>;
                                },
                            },
                            {
                                label: "Basic Reward",
                                index: 1,
                                Component: () => {
                                    return <h1>Reward</h1>;
                                },
                            },
                        ]}
                        isLoaded={isLoaded}
                    />
                </div>
            </section>
        </Sidebar>
    );
};
export default Companies;
