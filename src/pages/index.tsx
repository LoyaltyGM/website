import * as React from "react";
import type { NextPage } from "next";
import CreateNFT from "./сreate-nft";
import Companies from "./companies";

const Home: NextPage = () => {
    return (
        <div>
            <Companies />
        </div>
    );
};

export default Home;
