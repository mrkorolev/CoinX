import axios from 'axios';
import {coins} from "../constants";

const baseUrl = 'https://api.binance.com/';
const apiKey = 'hm2y1s1ZpmSmD6zi7nitfQxSIaq5TTkHcj1vfoCqHOBJx4cUHQHIVChQNgqu2lxG';
const apiVersion = 'api/v3/';
const ticker24hr = 'ticker/24hr';
const baseCurrency = 'TRY';
const symbols = coins.map(coin => coin.nameShort);

function prepareSymbolsForUrl(symbol, base, str){
    return (str + symbol + base + str);
}

function formattedUrlParams(symbols){
    return symbols.map(s => prepareSymbolsForUrl(s, baseCurrency, '\"')).join(',');
}

export const get24hrData = async () => {

    const completeUrl = `${baseUrl}${apiVersion}${ticker24hr}?symbols=[${formattedUrlParams(symbols)}]`;
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
        console.log(completeUrl);
        const date = new Date();
        var datetime = "Last Binance API call: "
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
}