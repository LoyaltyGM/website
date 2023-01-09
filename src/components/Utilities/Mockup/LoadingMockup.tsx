import * as React from "react";

const getLoadingStrings = (amount: number) => {
    const array = new Array(amount).fill(0);
    return (
        <div>
            {array.map((element, index) => (
                <div key={index} className="mt-4 mx-4 h-2.5 w-full-8 bg-base-200 rounded"></div>
            ))}
        </div>
    );
};

export const MockupLoading = () => {
    return (
        <>
            <div className="dao-header lg:flex md:flex xl:flex items-center -mt-10">
                <div className={"bg-base-200 h-52 w-52 animate-pulse rounded-md"}></div>
                <div className={"info flex flex-col ml-6 w-full gap-8"}>
                    <div className={"info-row-1 flex justify-between items-center"}>
                        <div className={"dao-name bg-base-200 animate-pulse rounded-full"}>
                            <div className="text-base-content/50 dao-label capitalize px-2">DAO NAME HELLO</div>
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
