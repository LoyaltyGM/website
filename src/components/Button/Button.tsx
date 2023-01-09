import * as React from "react";
import classNames from "classnames";
import { ButtonProps } from "../Form/types";

export const Button = ({ disabled = false, type = "submit", className, children, ...props }: ButtonProps) => {
    return (
        <button
            className={classNames("main-button", className, disabled ? "cursor-not-allowed" : "cursor-pointer")}
            type={type}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};
