import { IRadioSelector } from "interfaces/formInterfaces";
import classNames from "classnames";
import React from "react";

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
