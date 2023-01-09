import React, { FC } from "react";
import Link from "next/link";
import classNames from "classnames";
import { TabsProps } from "interfaces";

/**
 * Avalible Props
 * @param tab Array of object
 * @param selectedTab number
 * @param onClick Function to set the active tab
 */
export const Tabs: FC<TabsProps> = ({ tabs = [], selectedTab = 0, onClick, url, isLoaded }) => {
    const Panel = tabs && tabs.find((tab) => tab.index === selectedTab);
    return (
        <div>
            <div className="flex justify-between">
                <div className="tabs">
                    {tabs.map(
                        (tab) =>
                            typeof tab === "object" && (
                                <button
                                    className={
                                        selectedTab === tab.index
                                            ? "tab tab-lg tab-bordered border-primary w-44 pb-4 text-gray-400"
                                            : "tab tab-lg tab-bordered border-transparent w-44 pb-4 text-gray-400 focus:border-primary/50 hover:border-primary/50 hover:text-gray-400"
                                    }
                                    onClick={() => onClick(tab.index)}
                                    key={tab.index}
                                    type="button"
                                    aria-selected={selectedTab === tab.index}
                                    aria-controls={`tabpanel-${tab.index}`}
                                    tabIndex={selectedTab === tab.index ? 0 : -1}
                                    id={`btn-${tab.index}`}
                                >
                                    {tab.label}
                                </button>
                            )
                    )}
                </div>
            </div>
            <div id={`tabpanel-${selectedTab}`} className="w-full py-2 px-2 min-h-[28rem]">
                {Panel && <Panel.Component index={selectedTab} />}
            </div>
        </div>
    );
};
