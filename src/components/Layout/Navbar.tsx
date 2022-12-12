import Link from "next/link";
import { Logo, MoonIcon, SunIcon } from "components";
import { useDarkMode } from "usehooks-ts";
import { ConnectButton } from "@suiet/wallet-kit";

const Navbar = () => {
    // const { toggle } = useDarkMode();

    return (
        <>
            <div className={"w-3/4 grid grid-flow-col"}>
                <div>
                    <Link href="/waitlist" passHref>
                        <button className="p-1 text-left text-neutral">
                            <span className="sr-only">Navigate to Home Page</span>
                            <Logo />
                        </button>
                    </Link>
                </div>
            </div>

            <div className={"flex gap-3"}>
                <ConnectButton />
                {/*<label className="swap swap-rotate text-xs text-neutral">*/}
                {/*    <input type="checkbox" onClick={toggle} />*/}
                {/*    <SunIcon />*/}
                {/*    <MoonIcon />*/}
                {/*</label>*/}
            </div>
        </>
    );
};

export default Navbar;
