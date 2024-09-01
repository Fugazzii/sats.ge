import { Rates } from "./types";

const d = document;
const w = window;

let data: Rates["rates"];

const changeColorOfSelected = () => {
    d!.querySelectorAll<HTMLUListElement>(".lii")!.forEach(li => {
        if(li.innerText.trim() === sessionStorage.getItem("sats.ge-selected-fiat") || li.innerText.trim() === sessionStorage.getItem("sats.ge-selected-btc")) {
            li.classList.add("bg-gray-100");
        } else {
            li.classList.remove("bg-gray-100");
        }
    });
}

w.onload = () => {
    if (!sessionStorage.getItem("sats.ge-data")) {
        const url = "https://api.coingecko.com/api/v3/exchange_rates";
        fetch(url)
            .then((response) => response.json())
            .then(({ rates }: Rates) => {
                const { btc, usd, gel } = rates;
                sessionStorage.setItem("sats.ge-data", JSON.stringify({ btc, usd, gel }));
            });
    }
    data = JSON.parse(sessionStorage.getItem("sats.ge-data")!);
    sessionStorage.setItem("sats.ge-selected-fiat", "GEL");
    sessionStorage.setItem("sats.ge-selected-btc", "SAT");
    changeColorOfSelected();
}

const btcToSat = (btc: number) => btc * 100_000_000;
const satToBtc = (sat: number) => sat / 100_000_000;

const gelToBtc = (gel: number) => gel / data.gel.value;
const btcToGel = (btc: number) => btc * data.gel.value;
const gelToSat = (gel: number) => btcToSat(gelToBtc(gel));
const satToGel = (sat: number) => btcToGel(satToBtc(sat));

const usdToBtc = (usd: number) => usd / data.usd.value;
const btcToUsd = (btc: number) => btc * data.usd.value;
const usdToSat = (usd: number) => btcToSat(usdToBtc(usd));
const satToUsd = (sat: number) => btcToUsd(satToBtc(sat));

/**
 * HANDLE FIAT INPUT CHANGE
 */
const changeBtcInputValue = (value: number) => {
    const selectedFiat = sessionStorage.getItem("sats.ge-selected-fiat");
    const selectedBtc = sessionStorage.getItem("sats.ge-selected-btc");

    let btcValue = 0;

    if (selectedFiat === "GEL") {
        if (selectedBtc === "BTC") {
            btcValue = gelToBtc(value);
        } else if (selectedBtc === "SAT") {
            btcValue = gelToSat(value);
        }
    } else if (selectedFiat === "USD") {
        if (selectedBtc === "BTC") {
            btcValue = usdToBtc(value);
        } else if (selectedBtc === "SAT") {
            btcValue = usdToSat(value);
        }
    }

    d!.querySelector<HTMLInputElement>("#btc-input")!.value = btcValue.toString();
}

d!.querySelector<HTMLInputElement>("#fiat-input")!.addEventListener("input", e => {
    e.preventDefault();
    const value = parseFloat((e.target as HTMLInputElement).value);
    changeBtcInputValue(value);
});

/**
 * HANDLE BTC INPUT CHANGE
 */

const changeFiatInputValue = (value: number) => {
    const selectedFiat = sessionStorage.getItem("sats.ge-selected-fiat");
    const selectedBtc = sessionStorage.getItem("sats.ge-selected-btc");

    let fiatValue = 0;

    if (selectedFiat === "GEL") {
        if (selectedBtc === "BTC") {
            fiatValue = btcToGel(value);
        } else if (selectedBtc === "SAT") {
            fiatValue = satToGel(value);
        }
    } else if (selectedFiat === "USD") {
        if (selectedBtc === "BTC") {
            fiatValue = btcToUsd(value);
        } else if (selectedBtc === "SAT") {
            fiatValue = satToUsd(value);
        }
    }

    d!.querySelector<HTMLInputElement>("#fiat-input")!.value = fiatValue.toString();
}

d!.querySelector<HTMLInputElement>("#btc-input")!.addEventListener("input", e => {
    e.preventDefault();
    const value = parseFloat((e.target as HTMLInputElement).value);
    changeFiatInputValue(value);
});

/**
 * HANDLE SELECT LIST CLICK
 */
d!.querySelectorAll<HTMLUListElement>(".lii")!.forEach(li => {
    li.addEventListener("click", e => {
        e.preventDefault();
        const curr = (e.target as HTMLUListElement).innerText;
        if(curr === "GEL" || curr === "USD") {
            sessionStorage.setItem("sats.ge-selected-fiat", curr);
            let newInnerHtml = "";
            if(curr === "GEL") {
                newInnerHtml = `<img src="/gel.png" alt="Not found" class="w-4 h-4 text-black"/>GEL`;
            } else if(curr === "USD"){
                newInnerHtml = `<img src="/usd.svg" alt="Not found" class="w-4 h-4 text-black"/>USD`;
            }
            
            d!.querySelector<HTMLElement>("#fiat-select-button")!.innerHTML = newInnerHtml;
            if(d!.querySelector<HTMLInputElement>("#fiat-input")!.value && d!.querySelector<HTMLInputElement>("#btc-input")!.value) {
                changeBtcInputValue(parseFloat(d!.querySelector<HTMLInputElement>("#fiat-input")!.value));
            }
        }
        else if(curr === "BTC" || curr === "SAT") {
            sessionStorage.setItem("sats.ge-selected-btc", curr);
            let newInnerHtml = "";
            if(curr === "BTC") {
                newInnerHtml = `<img src="/bitcoin.svg" alt="Not found" class="w-4 h-4 text-black"/>BTC`;
            } else if(curr === "SAT"){
                newInnerHtml = `<img src="/sats.jpg" alt="Not found" class="w-4 h-4 text-black"/>SAT`;
            }
            d!.querySelector<HTMLElement>("#btc-select-button")!.innerHTML = newInnerHtml;
            if(d!.querySelector<HTMLInputElement>("#fiat-input")!.value && d!.querySelector<HTMLInputElement>("#btc-input")!.value) {
                changeFiatInputValue(parseFloat(d!.querySelector<HTMLInputElement>("#btc-input")!.value));    
            }
        }
        changeColorOfSelected();
    });
})