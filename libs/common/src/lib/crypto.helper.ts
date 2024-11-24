import axios, { isCancel, AxiosError } from 'axios';

export enum CoinEnum {
    BTC = "btc",
    ETH = "eth",
    MATIC = "matic"
}

export const CoinGeckoIdEnum = {
    [CoinEnum.BTC]: 'bitcoin',
    [CoinEnum.MATIC]: 'matic-network',
    [CoinEnum.ETH]: 'ethereum'
}

export enum CurrencyEnum {
    BTC = "btc",
    ETH = "eth",
    MATIC = "matic",
    BNB = "bnb",
    USD = "usd",
    AUD = "aud"
}