import { faBitcoinSign, faTurkishLiraSign, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';

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

export const cryptoCurrenciesCalculate = [
    {
        nameShort: 'BTC',
        nameLong: 'Bitcoin',
        lastPrice:'---',
        priceChangePercent: '---',
        icon: faBitcoinSign
    },
    {
        nameShort: 'TRX',
        nameLong: 'Tron',
        lastPrice:'---',
        priceChangePercent: '---',
    },
    {
        nameShort: 'USDT',
        nameLong: 'Dollars',
        lastPrice:'---',
        priceChangePercent: '---',
        icon: faDollarSign
    }
]

export const cryptoCurrencies = [
    {
        nameShort: 'ETH',
        nameLong: 'Ethereum',
        lastPrice: '---',
        priceChangePercent: '---',
        icon: faEthereum
    },
    {
        nameShort: 'BTC',
        nameLong: 'Bitcoin',
        lastPrice:'---',
        priceChangePercent: '---',
        icon: faBitcoinSign
    },
    {
        nameShort: 'TRX',
        nameLong: 'Tron',
        lastPrice:'---',
        priceChangePercent: '---',
    },
    {
        nameShort: 'USDT',
        nameLong: 'Tether',
        lastPrice:'---',
        priceChangePercent: '---',
    }
];

export const availableNetworks = [
    {
        networkCode: 'BTC',
        networkName: 'Bitcoin',
        icon: faBitcoinSign
    },
    // {
    //     networkCode: 'ERC20',
    //     networkName: 'Ethereum',
    //     icon: faEthereum
    // },
    {
        networkCode: 'TRC20',
        networkName: 'Tron'
    }
];



