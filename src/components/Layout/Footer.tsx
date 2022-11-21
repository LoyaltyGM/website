import * as React from "react";
import { DiscordIcon, TwitterIcon } from "components";
import ASSETS from "assets";
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="footer footer-center bg-purple-500 text-white grid-flow-row md:grid-flow-col py-4 px-8">
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
    );
};

export default Footer;
