import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import Layout from "components/Layout";

const Lootbox: NextPage = () => {
    return (
        <div>
            <Layout className="layout-base bg-[#1C1D25] h-full pb-0" isMinHeightTurnOff={true}>
                <h1 className="text-center font-bold text-white">
                    <p>Be</p>among the<p className="text-purple">first</p>{" "}
                </h1>
            </Layout>
        </div>
    );
};

export default Lootbox;
