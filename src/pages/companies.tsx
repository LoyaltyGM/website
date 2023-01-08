import * as React from "react";
import type { NextPage } from "next";
import Sidebar from "components/Layout/Sidebar";
import { BackButton, TwitterIcon, DiscordIcon } from "components";
import Image from "next/image";
import ASSETS from "assets";

const Companies = () => {
    const CompaniesHeader = () => {
        return (
            <div className="px-4 flex h-36 bg-gray-50 w-full gap-4 items-center content-center">
                <Image src={ASSETS.Ethereum} alt="Description of image" layout="fixed" className="w-20 h-20" />
                <div className="text-white space-y-2 w-full">
                    <div className="justify-between flex content-center items-center">
                        <h1 className="text-4xl text-black">Uniswap Loyalty Card</h1>
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
            <CompaniesHeader />
            <div className="flex gap-6 mt-4 text-lg text-white">
                <h1 className="font-medium border-b-2">Quests</h1>
                <h1>Basic Task</h1>
            </div>
        </Sidebar>
    );
};
export default Companies;
