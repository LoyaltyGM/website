import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import { IDAOCard } from "./cardsInterfaces";

export const DAOCard = ({ daoObject, lastElement }: IDAOCard) => {
    return (
        <Link href={`/daos/${daoObject.url}`}>
            <div
                className={classNames(
                    "flex justify-between w-full h-50 p-3 cursor-pointer active:bg-base-200 pt-7 pb-7",
                    lastElement ? "border-none" : "border-b"
                )}
            >
                <div className="flex gap-6 md:w-10/12 pt-3 pb-3">
                    <div className="w-28 h-28">
                        {
                            <Image
                                width={"115"}
                                height={"115"}
                                layout={"fixed"}
                                priority={true}
                                src={daoObject.profileImage}
                                className="rounded-2xl"
                            />
                        }
                    </div>
                    <div className="w-5/6 grid grid-cols-1 content-between">
                        <div className="w-full">
                            <div className="lg:text-lg text-base uppercase font-medium cursor-pointer">
                                {daoObject.name}
                            </div>
                            <div className="text-base-content/50 line-clamp-2">{daoObject.description}</div>
                        </div>

                        <p
                            className={
                                "text-base-content/50 text-sm cursor-pointer hover:text-base-content/25 active:text-base-content/50"
                            }
                        >
                            View more
                        </p>
                    </div>
                </div>

                <div className="flex flex-col hidden md:flex lg:w-40 w-36 text-center text-xs pt-3 pb-3">
                    {daoObject.isActive ? (
                        <span className="badge-active">Active voting now</span>
                    ) : (
                        <span className="badge-non-active">No active voting</span>
                    )}
                    <div className={"flex flex-col gap-3 mt-4"}>
                        <div className={"flex justify-between"}>
                            <p className={"text-base-content/50"}>Proposals:</p>
                            <div>
                                {daoObject.totalProposals ? (
                                    daoObject.totalProposals || "0"
                                ) : (
                                    //MOCK UP FOR LOADING
                                    <div className="bg-base-200 text-base-content/50 animate-pulse rounded-md">000</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};
