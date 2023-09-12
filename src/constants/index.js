import { faBitcoinSign } from '@fortawesome/free-solid-svg-icons';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { faLitecoinSign } from '@fortawesome/free-solid-svg-icons';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';

export const coins = [
    {
        nameShort: "ETH",
        nameLong: "Ethereum",
        currentRate: "0.578600",
        percentChange: "+4%",
        bgColor: "#E8DCF8",
        icon: faEthereum
    },
    {
        nameShort: "BTC",
        nameLong: "Bitcoin",
        currentRate: "0.578600",
        percentChange: "+47%",
        bgColor: "#FFFBE6",
        icon: faBitcoinSign
    },
    {
        nameShort: "LTC",
        nameLong: "Litecoin",
        currentRate: "0.578600",
        percentChange: "+57%",
        bgColor: "#F0F4FF",
        icon: faLitecoinSign
    },
    {
        nameShort: "USD",
        nameLong: "Dollars",
        currentRate: "0.578600",
        percentChange: "+13%",
        bgColor: "#fff",
        icon: faDollarSign
    }
]