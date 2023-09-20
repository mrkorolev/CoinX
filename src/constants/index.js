import { faBitcoinSign } from '@fortawesome/free-solid-svg-icons';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faLitecoinSign } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

// Binance API Key
export const apiKey = 'hm2y1s1ZpmSmD6zi7nitfQxSIaq5TTkHcj1vfoCqHOBJx4cUHQHIVChQNgqu2lxG';

export const baseCurrencies = [
    {
        nameShort: 'TRY',
        nameLong: 'Turkish Lira'
    },
    {
        nameShort: 'USD',
        nameLong: 'United States Dollar'
    }
];

export const cryptoCurrencies = [
    {
        nameShort: 'ETH',
        nameLong: 'Ethereum',
        lastPrice: '---',
        priceChangePercent: '---',
        bgColor: '#E8DCF8',
        icon: faEthereum
    },
    {
        nameShort: 'BTC',
        nameLong: 'Bitcoin',
        lastPrice:'---',
        priceChangePercent: '---',
        bgColor: '#FFFBE6',
        icon: faBitcoinSign
    },
    {
        nameShort: 'LTC',
        nameLong: 'Litecoin',
        lastPrice:'---',
        priceChangePercent: '---',
        bgColor: '#F0F4FF',
        icon: faLitecoinSign
    },
    {
        nameShort: 'USDT',
        nameLong: 'Dollars',
        lastPrice:'---',
        priceChangePercent: '---',
        bgColor: '#fff',
        icon: faDollarSign
    }
]