import {View, KeyboardAvoidingView, ScrollView, StyleSheet, Platform} from 'react-native';
import { Calculator } from '../../components/home/Calculator';
import { ExchangeRatesData } from '../../components/home/ExchangeRatesData';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {useContext, useState} from "react";
import { AppContext } from "../../global/AppContext";

export const HomeScreen = () => {

    const { theme } = useContext(AppContext);
    const [scrollable, setScrollable] = useState(false);
    return (
            <KeyboardAvoidingView
                contentContainerStyle={{ backgroundColor: theme.screenBgColor }}
                behavior='position'>
                <ScrollView
                    ref={ref => {this.scrollView = ref}}
                    onContentSizeChange={() => this.scrollView.scrollToEnd()}
                    scrollEnabled={scrollable}
                    contentContainerStyle={[styles.innerContainer, scrollable && {
                        paddingTop: hp('30%'),
                        height: Platform.OS === 'ios' ? hp('110%') : hp('90%'),
                        justifyContent: 'center',
                        gap: hp('3%') }]}>

                        <ExchangeRatesData />
                        <Calculator modifyScrollAction={setScrollable}/>
                </ScrollView>
            </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    innerContainer: {
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: hp('4%'),
        height: hp('90%')
    }
});
