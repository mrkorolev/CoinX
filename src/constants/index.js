import { faBitcoinSign } from '@fortawesome/free-solid-svg-icons';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faLitecoinSign } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

// Binance API Key
export const apiKey = 'hm2y1s1ZpmSmD6zi7nitfQxSIaq5TTkHcj1vfoCqHOBJx4cUHQHIVChQNgqu2lxG';

export const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk1NDcxNDA5LCJpYXQiOjE2OTU0Njc4MDksImp0aSI6IjBhMTliYTEzNjZjNzQxYWE4NjhmZDgzNzU5MTI1Y2U1IiwidXNlcl9pZCI6MjMsIjM2MDAiOjE2OTU0NzE0MDl9.yhiNr3QG1qpyIoSe-DB8h5Xyb3YG_i-PqDorM0lz3ys';

const  user1 = {
    username: 'Nael.alyousefi@final.edu.tr',
    password: 'admin@1234'
};

const user2 = {
    username: 'arekanediz@gmail.com',
    password: 'admin@1234'
}

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