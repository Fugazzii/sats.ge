export const btcToSat = (btc: number) => btc * 100_000_000;
export const satToBtc = (sat: number) => sat / 100_000_000;

export const gelToBtc = (gel: number) => gel / data.gel.value;
export const btcToGel = (btc: number) => btc * data.gel.value;
export const gelToSat = (gel: number) => btcToSat(gelToBtc(gel));
export const satToGel = (sat: number) => btcToGel(satToBtc(sat));

export const usdToBtc = (usd: number) => usd / data.usd.value;
export const btcToUsd = (btc: number) => btc * data.usd.value;
export const usdToSat = (usd: number) => btcToSat(usdToBtc(usd));
export const satToUsd = (sat: number) => btcToUsd(satToBtc(sat));
