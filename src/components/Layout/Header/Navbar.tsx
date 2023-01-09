import Link from "next/link";
import Logo from "./Logo";
import { ConnectButton } from "@suiet/wallet-kit";

const Navbar = () => {
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
            </div>
        </>
    );
};

export default Navbar;
