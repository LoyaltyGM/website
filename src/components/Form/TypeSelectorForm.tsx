import { Select, SelectArrow, SelectItem, SelectPopover, useSelectState } from "ariakit/select";
import { ISelectorProps } from "interfaces";
import React from "react";

const types = ["Member", "Design", "VC"];

export const TypeSelectorForm = ({ name, label, className, handleChange }: ISelectorProps) => {
    const select = useSelectState({
        defaultValue: "Member",
        setValueOnMove: true,
        sameWidth: true,
        gutter: 4,
    });

    return (
        <div className={className}>
            <label className="label">
                <span className="input-label">{label}</span>
            </label>
            <div className="form-control ">
                <Select
                    state={select}
                    name={name}
                    className={
                        "input input-selector flex cursor-default items-center whitespace-nowrap px-4 text-base justify-between gap-3"
                    }
                >
                    <div>{select.value}</div>
                    <SelectArrow />
                </Select>
                <SelectPopover
                    state={select}
                    className="input-selector flex flex-col overflow-auto overscroll-contain pt-4 pb-4 data-focus-visible focus-visible:ring focus:outline-none text-slate-500"
                >
                    {types.map((type) => (
                        <label key={type.toUpperCase()} className="text-base text-base-content">
                            <SelectItem
                                key={type}
                                value={type}
                                className="input-selector btn-primary border-0 flex cursor-default scroll-m-2 items-center py-3"
                                setValueOnClick={handleChange}
                            >
                                {type}
                            </SelectItem>
                        </label>
                    ))}
                </SelectPopover>
            </div>
        </div>
    );
};
