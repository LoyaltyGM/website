import * as React from "react";
import ASSETS from "assets";
import Image from "next/image";

const Footer = () => {
    const MainFeatures = () => {
        return (
            <div className="bg-[#1C1D25]">
                <div className="flex justify-around w-full pb-4 pt-10 rounded-t-3xl text-white bg-[#181A20] font-mono">
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
                    <div className="flex gap-2">
                        <p className="flex justify-center items-center font-mono">Supported by</p>
                        <a href="https://suiet.app/" target="_blank">
                            <Image src={ASSETS.suietLogo} height={40} width={40} />
                        </a>
                        <p className="flex justify-center items-center font-mono"> & </p>
                        <a href="https://twitter.com/SuiEcosystem" target="_blank">
                            <Image src={ASSETS.suiEcosystemLogo} height={40} width={40} />
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
