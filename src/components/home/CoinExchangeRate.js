import { StyleSheet, Text, View } from 'react-native';
import { CustomIcon } from '../general/CustomIcon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const CoinExchangeRate = ({ nameShort, nameLong, lastPrice, priceChangePercent, bgColor, coinIcon }) => {
    return (
        <View style={[styles.coinLayout, { backgroundColor: `${bgColor}` }, nameShort === 'USDT' && styles.usdStyling]}>
            <View style={styles.topLevel}>
                <View style={{ gap: hp('0.25%') }}>
                    <Text style={styles.coinInsides}>{nameShort}</Text>
                    <Text style={styles.coinInsides}>{lastPrice}</Text>
                </View>
                <Text style={[styles.coinInsides, styles.percentChangeText]}>{priceChangePercent} %</Text>
            </View>
            <View style={styles.bottomLevel}>
                <CustomIcon icon={coinIcon} iconSize={wp('5%')} boxSize={wp('7%')} />
                <Text style={styles.coinInsides}>{nameLong}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    coinLayout: {
        width: wp('42%'),
        height: hp('20%'),
        borderRadius: 10,
        justifyContent: 'space-between',
        paddingHorizontal: wp('4%'),
        paddingVertical: wp('6%'),
        margin: wp('1.5%')
    },
    coinInsides: {
        fontWeight: 'bold',
        color: '#293462',
        fontSize: wp('3%')
    },
    usdStyling: {
        borderColor: 'gray',
        borderWidth: 2,
        borderStyle: 'dashed'
    },
    topLevel: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    percentChangeText: {
        color: 'gray',
        fontWeight: 'normal'
    },
    bottomLevel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('4%')
    }
});
