import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { CustomToast } from "components";
import Script from "next/script";
import { AppProps } from "next/app";
import "styles/globals.css";
import { useBoolean, useDarkMode } from "usehooks-ts";
import { DARK_THEME, LIGHT_THEME } from "utils";
import { EthosConnectProvider } from "ethos-connect";
import { WalletProvider } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import "styles/suiet-wallet-kit-custom.css";

function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <div data-theme={LIGHT_THEME}>
            <Script
                strategy="lazyOnload"
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />

            <Script strategy="lazyOnload">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
            </Script>
            <WalletProvider>
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                </QueryClientProvider>
            </WalletProvider>
            <CustomToast />
        </div>
    );
}

export default App;
