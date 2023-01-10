import * as React from "react";

export const MockupLoading = () => {
    return (
        <>
            <div className="lg:flex md:flex xl:flex items-center -mt-10">
                <div className="bg-base-200 h-52 w-52 animate-pulse rounded-md"></div>
                <div className="info flex flex-col ml-6 w-full gap-8">
                    <div className="info-row-1 flex justify-between items-center">
                        <div className="bg-base-200 animate-pulse rounded-full">
                            <div className="text-base-content/50 capitalize px-2">NAME HELLO</div>
                        </div>
                        <div className={"member-button"}>
                            <button
                                className={
                                    "main-button disabled:bg-base-200 disabled:hover:bg-base-200 animate-pulse text-white"
                                }
                                disabled={true}
                            >
                                Become a member
                            </button>
                        </div>
                    </div>
                    <div className={"info-row-2 flex justify-between"}>
                        <div className={"about flex gap-10"}>
                            <a target={"_blank"} className="badge-button">
                                About
                            </a>
                            <div className="badge-button items-center">
                                <p>Blockchain</p>
                            </div>
                        </div>
                        <div className={"links flex gap-5"}>
                            <div className="bg-base-200 rounded-full h-9 w-9 animate-pulse "></div>
                            <div className="bg-base-200 rounded-full h-9 w-9 animate-pulse"></div>
                            <div className="bg-base-200 rounded-full h-9 w-9 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
