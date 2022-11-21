const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

/** @type {import("next").NextConfig} */
const nextConfig = {
    images: {
        domains: ["newconnection.infura-ipfs.io"],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    redirects: () => {
        return [
            {
                source: "/",
                destination: "/waitlist",
                permanent: true,
            },
        ];
    },
};

module.exports = withBundleAnalyzer(nextConfig);
