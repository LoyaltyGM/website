import Link from "next/link";
import { Logo, MoonIcon, SunIcon } from "components";
import { useDarkMode } from "usehooks-ts";
import { ethos, SignInButton, EthosConnectStatus } from "ethos-connect";

const Navbar = () => {
    const { toggle } = useDarkMode();
    const { status, wallet } = ethos.useWallet();

    return (
        <>
            <div className={"w-1/2 grid grid-flow-col"}>
                <div>
                    <Link href="/" passHref>
                        <button className="p-1 text-left text-neutral">
                            <span className="sr-only">Navigate to Home Page</span>
                            <Logo />
                        </button>
                    </Link>
                </div>
            </div>

            <div className={"flex gap-3"}>
                <>
                    {status === EthosConnectStatus.Loading ? (
                        // Loading...
                        <ethos.components.AddressWidget />
                    ) : status === EthosConnectStatus.NoConnection ? (
                        // <SignInButton />
                        <ethos.components.AddressWidget />
                    ) : (
                        // status is EthosConnectStatus.Connected
                        <ethos.components.AddressWidget buttonColor="#000000" />
                    )}
                </>
                <label className="swap swap-rotate text-xs text-neutral">
                    <input type="checkbox" onClick={toggle} />
                    <SunIcon />
                    <MoonIcon />
                </label>
            </div>
        </>
    );
};

export default Navbar;
