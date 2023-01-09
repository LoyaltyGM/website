import Head from "next/head";
import FavIcon from "assets/image/static/Favicon.ico";

const HeadInfo = () => {
    return (
        <Head>
            <link rel="shortcut icon" href={FavIcon.src} />
            <title>LoyaltyGM</title>
        </Head>
    );
};

export default HeadInfo;
