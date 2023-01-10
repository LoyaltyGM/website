import * as React from "react";
import classNames from "classnames";
import { IButtonProps } from "interfaces";

/**
 * Button which submit form
 *
 * @param disabled - disable button
 * @param type - type of button(submit, button, reset)
 * @param className - change style of button
 * @param children - HTML elements inside button
 * @param props - other props
 *
 * @returns JSX.Element - button
 * */
export const SubmitButton = ({ disabled = false, type = "submit", className, children, ...props }: IButtonProps) => {
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
