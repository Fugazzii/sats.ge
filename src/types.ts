export type CurrencyInfo = {
    name: string;
    unit: string;
    value: number;
    type: "fiat" | "crypto";
}

export type Rates = {
    rates: {
        btc: CurrencyInfo;
        usd: CurrencyInfo;
        gel: CurrencyInfo;
    }
}