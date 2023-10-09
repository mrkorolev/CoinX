import {faBitcoinSign, faTurkishLiraSign} from '@fortawesome/free-solid-svg-icons';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faLitecoinSign } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

// Binance API Key
export const apiKey = 'hm2y1s1ZpmSmD6zi7nitfQxSIaq5TTkHcj1vfoCqHOBJx4cUHQHIVChQNgqu2lxG';

// System data:
export const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2MjYxOTgyLCJpYXQiOjE2OTYyNTgzODIsImp0aSI6IjE3ODFiZDRhM2I2MzRiNmE4ZDE0ZDM4MGJhY2RjODRmIiwidXNlcl9pZCI6MjMsIjM2MDAiOjE2OTYyNjE5ODJ9.aB0oyJzg-duNAi9uiaiukbVyzDUHbsmNvagSUZw7bWc';
const  user1 = {
    username: 'nael.alyousefi@final.edu.tr',
    password: 'admin@1234'
}
const user2 = {
    username: 'arekanediz@gmail.com',
    password: 'admin@1234'
}
const user3 = {
    username: 'benoyt_smth@gmail.com',
    password: 'admin@1234'
}

// Currency data:
export const baseCurrencies = [
    {
        nameShort: 'TRY',
        nameLong: 'Turkish Lira',
        icon: faTurkishLiraSign
    },
    {
        nameShort: 'USD',
        nameLong: 'United States Dollar',
        icon: faDollarSign
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
];

import { faMoon, faBell, faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faSignal, faQuestion } from "@fortawesome/free-solid-svg-icons";

export const toggles = [
    {
        icon: faMoon,
        bgColor: '#5956D7'
    },
    {
        icon: faBell,
        bgColor: '#007CFC'
    }
]

export const settings = [
    {
        icon: faFileLines,
        bgColor: '#D35554'
    },
    {
        icon: faSignal,
        bgColor: '#30CC53'
    },
    {
        icon: faQuestion,
        bgColor: '#FFD600'
    }
];
