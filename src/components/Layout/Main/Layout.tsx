import * as React from "react";
import classNames from "classnames";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import HeadInfo from "../Header/HeadInfo";
import { ILayoutProps } from "interfaces";

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
            <div
                className={
                    isMinHeightTurnOff ? "relative lg:h-[155vh] md:h-[135vh] h-[110vh]" : "relative min-h-screen"
                }
            >
                <Header className={headerBackground} />
                <main className={classNames("flex-1", className, footer ? "pb-6" : "")} {...props}>
                    {children}
                </main>
            </div>
            {footer && <Footer />}
        </>
    );
}
