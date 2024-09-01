export type Fiat = "GEL" | "USD";
export type Btc = "BTC" | "SAT";

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

export type WW = Window & typeof globalThis & {
    satsData: Rates["rates"];
}