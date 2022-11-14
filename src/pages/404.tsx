import React from "react";
import { NextPage } from "next";
import Link from "next/link";

import Layout, { Button } from "components";

const Page404: NextPage = () => {
    return (
        <div>
            <Layout className="layout-base pb-0 pt-0 h-32">
                <section className="w-1/2">
                    <div className="text-center gap-2 space-y-6 items-center justify-center pt-36">
                        <h1 className="text-highlighter">{"Oppss..."}</h1>
                        <h1 className="text-highlighter">{"We couldn't find this page :("}</h1>
                        <div className="flex items-center justify-center">
                            <Link href="/">
                                <Button className="mt-10 lg:w-1/3 w-full h-14 main-button">Back to home</Button>
                            </Link>
                        </div>
                    </div>
                </section>
            </Layout>
        </div>
    );
};

export default Page404;
