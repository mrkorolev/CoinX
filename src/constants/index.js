import { faBitcoinSign } from '@fortawesome/free-solid-svg-icons';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faLitecoinSign } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

// Binance API Key
export const apiKey = 'hm2y1s1ZpmSmD6zi7nitfQxSIaq5TTkHcj1vfoCqHOBJx4cUHQHIVChQNgqu2lxG';

// System data:
export const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2MDg2MTA1LCJpYXQiOjE2OTYwODI1MDUsImp0aSI6Ijk4MDgyOGQ1ZTRkNjQxNDliMjk3OWJmNTNjNzc3MDNhIiwidXNlcl9pZCI6MjMsIjM2MDAiOjE2OTYwODYxMDV9.DlIVM6-XlSUwtH5CE6gukbrw7WyGACJR-k7lz5hFUMA';
const  user1 = {
    username: 'Nael.alyousefi@final.edu.tr',
    password: 'admin@1234'
};
const user2 = {
    username: 'arekanediz@gmail.com',
    password: 'admin@1234'
}

// Currency data:
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
