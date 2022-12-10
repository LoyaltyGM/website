import * as React from "react";
import { DiscordIcon, TwitterIcon } from "components";
import ASSETS from "assets";
import Image from "next/image";

const Footer = () => {
    const MainFeatures = () => {
        return (
            <div className="flex justify-around w-full pb-4 pt-4 rounded-t-3xl text-white bg-[#181A20] font-mono">
                <div className="flex">
                    <Image src={ASSETS.emoji3} width={50} height={50} layout={"fixed"} />
                    <p className="flex justify-center items-center w-1/2">Loyalty NFT system for projects</p>
                </div>
                <div className="flex">
                    <Image src={ASSETS.emoji2} width={50} height={50} layout={"fixed"} />
                    <p className="flex justify-center items-center w-1/2">On-chain levels and xp</p>
                </div>
                <div className="flex">
                    <Image src={ASSETS.emoji1} width={50} height={50} layout={"fixed"} />
                    <p className="flex justify-center items-center w-1/2">Complete daily tasks and get rewards</p>
                </div>
            </div>
        );
    };

    return (
        <>
            <MainFeatures />
            <footer className="footer footer-center bg-[#181A20] text-white grid-flow-row md:grid-flow-col py-4 px-8">
                <div className="grid md:grid-flow-col md:justify-self-start gap-10">
                    <div className="flex justify-center sm:justify-start gap-10 rounded-2xl p-2 font-mono">
                        <a href="https://twitter.com/Loyalty_GM" target="_blank" className="hover:decoration-solid ">
                            Twitter
                        </a>
                        <a href="mailto: info@loyaltygm.com?subject=Hey LoyaltyGM! let's make collaboration">
                            info@loyaltygm.com
                        </a>
                    </div>
                </div>

                <div className="grid grid-flow-col gap-4 md:justify-self-end">
                    <a href="https://ethoswallet.xyz/" target="_blank">
                        <div className="flex gap-2">
                            <p className="flex justify-center items-center font-mono">Supported by</p>
                            <Image src={ASSETS.ethosLogo} height={30} width={90} />
                        </div>
                    </a>
                </div>
            </footer>
        </>
    );
};

export default Footer;
