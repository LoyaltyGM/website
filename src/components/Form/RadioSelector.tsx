import { IRadioSelector, IRadioSelectorNFT } from "./types";
import classNames from "classnames";
import React, { useState } from "react";
import { NFTCard } from "components";

export const RadioSelector = ({ name, labels, className, handleChange }: IRadioSelector) => {
    return (
        <>
            <div>
                <input
                    id="bordered-radio-1"
                    type="radio"
                    value={0}
                    name={name}
                    className="hidden peer"
                    onChange={handleChange}
                />

                <label
                    htmlFor="bordered-radio-1"
                    className={classNames(
                        className,
                        "inline-flex justify-between items-center p-5 w-full text-base-content bg-base-100 rounded-lg border border-base-200 peer-checked:border-primary hover:border-primary/50"
                    )}
                >
                    <div className="relative px-4 py-2 text-base-content">
                        {labels[0]}
                        <span className="absolute top-0 right-0 px-1 py-1 translate-x-1/2 -translate-y-1/2 bg-error rounded-full text-xs text-base-content"></span>
                    </div>
                </label>
            </div>
            <div>
                <input
                    id="bordered-radio-2"
                    type="radio"
                    value={1}
                    name={name}
                    className="hidden peer"
                    onChange={handleChange}
                />
                <label
                    htmlFor="bordered-radio-2"
                    className={classNames(
                        className,
                        "inline-flex justify-between items-center p-5 w-full text-base-content bg-base-100 rounded-lg border border-base-200 peer-checked:border-primary hover:border-primary/50"
                    )}
                >
                    <div className="relative px-4 py-2 text-base-content">
                        {labels[1]}
                        <span className="absolute top-0 right-0 px-1 py-1 translate-x-1/2 -translate-y-1/2 bg-success rounded-full text-xs text-base-content"></span>
                    </div>
                </label>
            </div>
        </>
    );
};

export const RadioSelectorNFT = (radioSelector: IRadioSelectorNFT) => {
    const [clickedValue, setClickValue] = useState(null);

    return (
        <div className={classNames(radioSelector.className, "mt-0")}>
            {radioSelector.values &&
                radioSelector.values.map((value, index) => (
                    <React.Fragment key={index}>
                        <label htmlFor={"bordered-radio-" + (index + 1)}>
                            <NFTCard
                                nftObject={value}
                                chain={radioSelector.chainId}
                                className={
                                    clickedValue === index
                                        ? "nft-card border-2 border-primary rounded-lg"
                                        : "nft-card cursor-pointer"
                                }
                            />
                        </label>
                        <input
                            id={"bordered-radio-" + (index + 1)}
                            type="radio"
                            value={value.title}
                            name={radioSelector.name}
                            // name={radioSelector.name}
                            className="hidden"
                            onChange={(event) => {
                                setClickValue(index);
                                return radioSelector.handleChange(event, value);
                            }}
                        />
                    </React.Fragment>
                ))}
        </div>
    );
};
