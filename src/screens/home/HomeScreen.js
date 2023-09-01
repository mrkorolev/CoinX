import { StyleSheet, View } from 'react-native';
import { CoinExchangeRate }  from '../../components/home/CoinExchangeRate';

const coins = [
    {
        nameShort: "ETH",
        nameLong: "Etherium",
        currentRate: "0.578600",
        percentChange: "+4%",
        bgColor: "#E8DCF8"
    },
    {
        nameShort: "BTC",
        nameLong: "Bitcoin",
        currentRate: "0.578600",
        percentChange: "+47%",
        bgColor: "#FFFBE6"
    },
    {
        nameShort: "LTC",
        nameLong: "Litecoin",
        currentRate: "0.578600",
        percentChange: "+57%",
        bgColor: "#F0F4FF"
    },
    {
        nameShort: "USD",
        nameLong: "Dollars",
        currentRate: "0.578600",
        percentChange: "+13%",
        bgColor: "#fff"
    }
]

export const HomeScreen = () => {
    const coinComponents = coins.map(coinObject => <CoinExchangeRate
        nameShort={coinObject.nameShort}
        nameLong={coinObject.nameLong}
        currentRate={coinObject.currentRate}
        percentChange={coinObject.percentChange}
        bgColor={coinObject.bgColor} />);

    return (
        <View style={styles.container}>
            <View style={styles.currencyRow}>
                {coinComponents[0]}
                {coinComponents[1]}
            </View>
            <View style={styles.currencyRow}>
                {coinComponents[2]}
                {coinComponents[3]}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    currencyRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});