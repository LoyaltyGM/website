import * as React from "react";
import { DiscordIcon, TwitterIcon } from "components";

const Footer = () => {
    return (
        <footer className="footer footer-center grid-flow-row md:grid-flow-col py-4 px-8 border-t border-primary/80">
            <div className="grid md:grid-flow-col md:justify-self-start gap-10">
                <div className="flex justify-center sm:justify-start rounded-2xl p-2">
                    <p className="text-sm">info@loyaltyGM.com</p>
                </div>
            </div>

            <div className="grid grid-flow-col gap-4 md:justify-self-end">
                <button className="grid place-items-center cursor-not-allowed w-[50px] h-[50px] bg-base-200 rounded-full hover:bg-primary/75 ">
                    <DiscordIcon height="25" width="25" />
                </button>
                <a href="https://twitter.com/Loyalty_GM" target="_blank" rel="noreferrer">
                    <button className="w-[50px] h-[50px] grid place-items-center bg-base-200 rounded-full hover:bg-primary/75">
                        <TwitterIcon height="25" width="25" />
                    </button>
                </a>
            </div>
        </footer>
    );
};

export default Footer;
