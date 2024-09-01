export const btcToSat = (btc: number) => btc * 100_000_000;
export const satToBtc = (sat: number) => sat / 100_000_000;

export const gelToBtc = (gel: number, diff: number) => gel / diff;
export const btcToGel = (btc: number, diff: number) => btc * diff;
export const gelToSat = (gel: number, diff: number) => btcToSat(gelToBtc(gel, diff));
export const satToGel = (sat: number, diff: number) => btcToGel(satToBtc(sat), diff);

export const usdToBtc = (usd: number, diff: number) => usd / diff;
export const btcToUsd = (btc: number, diff: number) => btc * diff;
export const usdToSat = (usd: number, diff: number) => btcToSat(usdToBtc(usd, diff));
export const satToUsd = (sat: number, diff: number) => btcToUsd(satToBtc(sat), diff);
