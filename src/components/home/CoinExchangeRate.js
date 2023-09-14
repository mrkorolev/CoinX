import { StyleSheet, Text, View } from 'react-native';
import { CurrencyDollarIcon } from 'react-native-heroicons/solid';
import { CustomIcon } from '../general/CustomIcon';

export const CoinExchangeRate = ({ nameShort, nameLong, lastPrice, priceChangePercent, bgColor, coinIcon }) => {
    return (
        <View style={[styles.coinLayout, { backgroundColor: `${bgColor}` },
        nameShort === 'USDT' && styles.usdStyling]}>
            <View style={styles.topLevel}>
                <View style={{ gap: '3%' }}>
                    <Text style={styles.coinInsides}>{nameShort}</Text>
                    <Text style={styles.coinInsides}>{lastPrice}</Text>
                </View>
                <Text style={[styles.coinInsides, styles.percentChangeText]}>{priceChangePercent}%</Text>
            </View>
            <View style={styles.bottomLevel}>
                <CustomIcon icon={coinIcon} iconSize={17} boxSize={30} />
                <View style={{ width: 20 }} />
                <Text style={[styles.coinInsides,]}>{nameLong}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    coinLayout: {
        width: 175,
        height: 175,
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 20,
        margin: 5
    },
    coinInsides: {
        fontWeight: 'bold',
        color: '#293462',
        fontSize: 14
    },
    usdStyling: {
        borderColor: 'gray', 
        borderWidth: 2, 
        borderStyle: 'dashed'
    },
    topLevel: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    percentChangeText: {
        color: 'gray', 
        fontWeight: 'normal'
    },
    bottomLevel: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center',
        marginTop: 50
    }
});