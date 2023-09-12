import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Calculator } from '../../components/home/Calculator';
import { ExchangeRatesData } from '../../components/home/ExchangeRatesData';

export const HomeScreen = () => {

    return (
        <View style={styles.container}>
            <ExchangeRatesData />
            <Calculator />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }
});