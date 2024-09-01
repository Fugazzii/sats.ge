import { Btc, Fiat, Rates } from "./types";
import { btcToGel, gelToBtc } from "./utils";

type ConvertResult = {
    fiatValue: number;
    btcValue: number;
}

interface IConvertStrategy {
    convert(fiat: number, btc: number, diff: number): ConvertResult;
}

class GelToBtc implements IConvertStrategy {
    convert(fiat: number, btc: number, diff: number): ConvertResult {
        return {
            fiatValue: btcToGel(btc, diff),
            btcValue: gelToBtc(fiat, diff)
        };
    }
}

class UsdToBtc implements IConvertStrategy {
    convert(fiat: number, btc: number, diff: number): ConvertResult {
        return {
            fiatValue: btcToGel(btc, diff),
            btcValue: gelToBtc(fiat, diff)
        };
    }
}

class GelToSat implements IConvertStrategy {
    convert(fiat: number, btc: number, diff: number): ConvertResult {
        return {
            fiatValue: btcToGel(btc, diff),
            btcValue: gelToBtc(fiat, diff)
        };
    }
}

class UsdToSat implements IConvertStrategy {
    convert(fiat: number, btc: number, diff: number): ConvertResult {
        return {
            fiatValue: btcToGel(btc, diff),
            btcValue: gelToBtc(fiat, diff)
        };
    }
}

export const mapping: { [key: string]: IConvertStrategy } = {
    "GEL-BTC": new GelToBtc(),
    "USD-BTC": new UsdToBtc(),
    "GEL-SAT": new GelToSat(),
    "USD-SAT": new UsdToSat()
};

export const convert = (fiat: number, btc: number, data: Rates["rates"]): ConvertResult => {
    const selectedFiat = sessionStorage.getItem("sats.ge-selected-fiat") as Fiat;
    const selectedBtc = sessionStorage.getItem("sats.ge-selected-btc") as Btc;

    const key = `${selectedFiat}-${selectedBtc}`;
    const diff = data[selectedFiat.toLowerCase() as keyof Rates["rates"]].value;
    return mapping[key].convert(fiat, btc, diff);
}