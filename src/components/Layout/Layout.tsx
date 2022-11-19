import * as React from "react";
import classNames from "classnames";
import Header from "./Header";
import Footer from "./Footer";
import HeadInfo from "./HeadInfo";

interface ILayoutProps {
    children: React.ReactNode;
    className?: string;
    isMinHeightTurnOff?: boolean;
    footer?: boolean;
}

export default function Layout({
    children,
    className,
    isMinHeightTurnOff = false,
    footer = true,
    ...props
}: ILayoutProps) {
    return (
        <>
            <HeadInfo />
            <div className={isMinHeightTurnOff ? "relative h-[calc(100vh-135px)]" : "relative min-h-screen"}>
                <Header />
                <main className={classNames("flex-1 mt-[6.5em]", className, footer ? "pb-36" : "")} {...props}>
                    {children}
                </main>
            </div>
            {footer ? <Footer /> : <></>}
        </>
    );
}
