import { StyleSheet, Text, View } from 'react-native';
import { CustomIcon } from '../general/components/CustomIcon';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {useContext} from "react";
import {AppContext} from "../../global/AppContext";

export const CoinExchangeRate = ({ nameShort, nameLong, lastPrice, priceChangePercent, bgColor, primaryColor, secondaryColor, coinIcon }) => {

    const { theme } = useContext(AppContext);

    return (
        <View style={[styles.coinLayout, { backgroundColor: bgColor }, nameShort === 'USDT' && { borderColor: theme.usdBorderColor, borderWidth: 2, borderStyle: 'dashed' }]}>
            <View style={styles.topLevel}>
                <View style={{ gap: hp('0.25%') }}>
                    <Text style={[styles.coinInsides, { color: primaryColor }]}>{nameShort}</Text>
                    <Text style={[styles.coinInsides, { color: primaryColor }]}>{lastPrice}</Text>
                </View>
                <Text style={[styles.coinInsides, styles.percentChangeText, { color: secondaryColor }]}>{priceChangePercent}%</Text>
            </View>
            <View style={styles.bottomLevel}>
                {coinIcon}
                <Text style={[styles.coinInsides, { color: primaryColor}]}>{nameLong}</Text>
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
        paddingHorizontal: wp('3.5%'),
        paddingVertical: wp('6%'),
        margin: wp('1.5%')
    },
    coinInsides: {
        fontWeight: 'bold',
        fontSize: wp('3%')
    },
    topLevel: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    percentChangeText: {
        fontWeight: 'normal'
    },
    bottomLevel: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('2.5%')
    }
});
