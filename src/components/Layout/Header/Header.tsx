import * as React from "react";
import Navbar from "./Navbar";
import classNames from "classnames";

const Header = (className) => {
    return (
        <header className={classNames("header", className)}>
            <Navbar />
        </header>
    );
};

export default Header;
