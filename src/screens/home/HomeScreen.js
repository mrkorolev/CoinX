import { KeyboardAvoidingView, ScrollView, StyleSheet, Platform } from 'react-native';
import { Calculator } from '../../components/home/Calculator';
import { ExchangeRatesData } from '../../components/home/ExchangeRatesData';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useContext, useRef, useState } from "react";
import { AppContext } from "../../config/context/AppContext";

export const HomeScreen = () => {

    const [scrollable, setScrollable] = useState(false);
    const { theme } = useContext(AppContext);
    const scrollViewRef = useRef(this);

    const onFocusHandler = () => {
        scrollViewRef.current.scrollToEnd();
    }

    return (
        <KeyboardAvoidingView
            contentContainerStyle={{ backgroundColor: Platform.OS === 'ios' ? theme.screenBgColor : undefined }}
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}>
            <ScrollView
                ref={scrollViewRef}
                showsVerticalScrollIndicator={false}
                scrollEnabled={scrollable}
                contentContainerStyle={[styles.innerContainer, { backgroundColor: theme.screenBgColor }]}>
                <ExchangeRatesData />
                <Calculator modifyScrollAction={setScrollable} onFocusScroll={onFocusHandler} />
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
