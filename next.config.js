const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true"
});

/** @type {import("next").NextConfig} */
const nextConfig = {
    i18n: {
        locales: ["en"],
        defaultLocale: "en"
    },
    images: {
        domains: ["newconnection.infura-ipfs.io"]
    },
    eslint: {
        ignoreDuringBuilds: true
    },
    typescript: {
        ignoreBuildErrors: true
    }
};

module.exports = withBundleAnalyzer(nextConfig);
