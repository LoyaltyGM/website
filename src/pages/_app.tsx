import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { CustomToast } from "components";
import Script from "next/script";
import { AppProps } from "next/app";
import "styles/globals.css";
import { useBoolean, useDarkMode } from "usehooks-ts";
import { DARK_THEME, LIGHT_THEME } from "utils";
import { EthosConnectProvider } from "ethos-connect";

function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());
    // const { isDarkMode: localStorageTheme } = useDarkMode();
    // const { value: isDarkTheme, setTrue, setFalse } = useBoolean(false);

    // useEffect(() => {
    //     localStorageTheme ? setTrue() : setFalse();
    // }, [localStorageTheme]);

    return (
        // <div data-theme={isDarkTheme ? DARK_THEME : LIGHT_THEME}>
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
            <EthosConnectProvider
                ethosConfiguration={{
                    hideEmailSignIn: true, // defaults to false
                }}
            >
                <QueryClientProvider client={queryClient}>
                    <Component {...pageProps} />
                </QueryClientProvider>
            </EthosConnectProvider>

            <CustomToast />
        </div>
    );
}

export default App;
