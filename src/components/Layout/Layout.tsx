import * as React from "react";
import classNames from "classnames";
import Header from "./Header";
import Footer from "./Footer";
import HeadInfo from "./HeadInfo";

interface ILayoutProps {
    children: React.ReactNode;
    className?: string;
    isMinHeightTurnOff?: boolean;
    headerBackground?: string;
    footer?: boolean;
}

export default function Layout({
    children,
    className,
    isMinHeightTurnOff = false,
    headerBackground = " ",
    footer = true,
    ...props
}: ILayoutProps) {
    return (
        <>
            <HeadInfo />
            <div className={isMinHeightTurnOff ? "relative h-[calc(100vh)]" : "relative min-h-screen"}>
                <Header className={headerBackground} />
                <main className={classNames("flex-1", className, footer ? "mb-4" : "")} {...props}>
                    {children}
                </main>
            </div>
            {footer && <Footer />}
        </>
    );
}
