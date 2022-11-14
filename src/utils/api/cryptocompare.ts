import { CRYPTOCOMPARE_API_KEY } from "utils";

export enum Currency {
    USD = "USD",
    ETH = "ETH",
    EUR = "EUR",
}

export const getExchangeRate = async (tokenSymbol: string, resultSymbol: Currency) => {
    return await fetch(
        `https://min-api.cryptocompare.com/data/price?fsym=${tokenSymbol}&tsyms=${resultSymbol}&api_key=${CRYPTOCOMPARE_API_KEY}`
    )
        .then((res) => res.json())
        .then((res) => res[resultSymbol]);
};
