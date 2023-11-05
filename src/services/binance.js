import axios from 'axios';
import { apiKey, baseCurrencies } from "../config/constants/operations";

const baseUrl = 'https://api.binance.com/';
const apiVersion = 'api/v3/';
const ticker = 'ticker/';

export const formattedUrlParams = (symbol, base, str) => {
    return (str + symbol + base + str);
};

export const prepareParamsForUrl = (cryptoSymbols, baseSymbol) => {
    const finalBase = baseSymbol === 'USD' ? 'USDT' : baseSymbol;
    const finalSymbols = cryptoSymbols
        .map(symbol => (symbol === 'USDT' && baseSymbol === 'USD') ? 'USDC' : symbol)
        .map(symbol => formattedUrlParams(symbol, finalBase, '\"'));
    // console.log(finalSymbols);
    return finalSymbols;
}

export const endpoint24hrData = async (cryptoCoins) => {
    const symbols = cryptoCoins.map(coin => coin.nameShort);
    const completeUrl = `${baseUrl}${apiVersion}${ticker}24hr?symbols=[${prepareParamsForUrl(symbols, baseCurrencies[0].nameShort)}]`;

    try{
        const response = await axios({
            method: 'get',
            url: completeUrl,
            headers: {
                apiKey: apiKey,
                'Content-Type': 'application/json'
            }
        });

        const responseJson = await response.data;

        // Logging functionality in here:
        const str = `${responseJson[0].symbol}, last price: ${parseFloat(responseJson[0].lastPrice).toFixed(2)} (${parseFloat(responseJson[0].priceChangePercent).toFixed(2)} %)`;

        // Debug
        console.log(completeUrl);
        const date = new Date();
        let datetime = "Last Binance API call: "
            + date.getHours() + ":"
            + date.getMinutes() + ":" + date.getSeconds();
        console.log(datetime);
        responseJson.forEach(r => {
            console.log(`${r.symbol}, last price: ${parseFloat(r.lastPrice).toFixed(2)} (${parseFloat(r.priceChangePercent).toFixed(2)} %)`);
        });
        console.log('---');

        return responseJson;
    }catch(error){
        console.log(error);
    }
};

export const endpointPriceData = async (baseCurrency, cryptoCurrency) => {
    const finalBaseCurrency = baseCurrency === 'USD' ? 'USDT' : baseCurrency;
    const finalCryptoCurrency = (baseCurrency === 'USD' && cryptoCurrency === 'USDT') ? 'USDC' : cryptoCurrency;

    const completeUrl = `${baseUrl}${apiVersion}${ticker}price?symbol=${finalCryptoCurrency + finalBaseCurrency}`;
    console.log(completeUrl);
    try{
        const response = await axios({
            method: 'get',
            url: completeUrl,
            headers: {
                apiKey: apiKey,
                'Content-Type': 'application/json'
            }
        });
        const data = await response.data;
        return parseFloat(data.price).toFixed(4);
    }catch(error){
        alert(`Something wrong with the request:\n${error}`);
        console.log(error);
    }
}
