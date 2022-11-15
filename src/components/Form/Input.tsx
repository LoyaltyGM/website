import { InputAmountProps, InputTextProps } from "./types";
import Image, { StaticImageData } from "next/image";
import classNames from "classnames";
import React from "react";

export const InputAmount = ({
    name,
    label,
    labelTitle,
    isRequired,
    className,
    measure,
    handleChange,
    min,
    max,
    step,
    isDisabled = false,
    ...props
}: InputAmountProps) => {
    return (
        <div className={classNames(className, "form-control w-full max-w-xl")}>
            <label className="label">
                <span className={"input-label"}>{label}</span>
                {measure && <span className={"text-neutral-content/50"}>{measure}</span>}
            </label>
            <input
                className={"input-field"}
                name={name}
                required={isRequired}
                autoComplete="off"
                autoCorrect="off"
                type="number"
                pattern="^[0-9]*[.,]?[0-9]*$"
                placeholder="1 (Max. 100)"
                minLength={1}
                maxLength={79}
                spellCheck="false"
                inputMode="decimal"
                title={labelTitle}
                min={min === 0 ? 0 : min || 1}
                max={max || 100} //Max number of NFT
                step={step || 1}
                onChange={handleChange}
                disabled={isDisabled}
                {...props}
            />
        </div>
    );
};

export const InputText = ({
    name,
    label,
    labelTitle,
    isRequired,
    disabled,
    className,
    handleChange,
    placeholder,
    maxLength,
    value,
    ...props
}: InputTextProps) => {
    return (
        <div className={classNames(className, "form-control w-full")}>
            <label className="label">
                <span className="input-label">{label}</span>
            </label>
            <input
                className="input-field"
                name={name}
                required={isRequired}
                disabled={disabled}
                autoComplete="off"
                autoCorrect="off"
                type="text"
                spellCheck="false"
                placeholder={placeholder}
                onChange={handleChange}
                maxLength={maxLength}
                value={value}
                {...props}
            />
        </div>
    );
};

export const InputTextArea = ({
    name,
    label,
    labelTitle,
    isRequired,
    className,
    height,
    handleChange,
    placeholder,
    maxLength,
    ...props
}: InputTextProps) => {
    return (
        <div className={classNames(className, "form-control w-full")}>
            <label className="label">
                <span className="input-label">{label}</span>
            </label>
            <textarea
                className={classNames("textarea input-field", height ? height : "h-28")}
                name={name}
                required={isRequired}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                placeholder={placeholder}
                onChange={handleChange}
                maxLength={maxLength}
                {...props}
            />
        </div>
    );
};

export const InputSupplyOfNFT = ({
    name,
    label,
    labelTitle,
    isRequired,
    className,
    placeholder,
    handleChange,
    image,
    min,
    max,
    step,
    isDisabled = false,
    ...props
}: InputAmountProps) => {
    return (
        <div className={classNames(className, "form-control w-full")}>
            <div className="relative flex">
                <input
                    className={"input-field w-full mb-0"}
                    name={name}
                    required={isRequired}
                    autoComplete="off"
                    autoCorrect="off"
                    type="number"
                    pattern="^[0-9]*[.,]?[0-9]*$"
                    placeholder="0"
                    minLength={1}
                    maxLength={79}
                    spellCheck="false"
                    inputMode="decimal"
                    title="Enter numbers only."
                    min={min === 0 ? 0 : min || 1}
                    max={max || 100000} //Max number of NFT
                    step={step || 1}
                    disabled={isDisabled}
                    onChange={handleChange}
                    {...props}
                />
                <div className="flex absolute w-6 h-6 inset-y-3 right-2  pointer-events-none">
                    <Image src={image as StaticImageData} />
                </div>
            </div>
        </div>
    );
};
