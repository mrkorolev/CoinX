import { View, StyleSheet, Text, Pressable, TextInput } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { OtpInput } from './OtpInput';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const OtpInputField = ({ code, setCode, setPinReady, maxLength }) => {

    useEffect(() => {
        setPinReady(code.length === maxLength);
        return () => setPinReady(false);
    }, [code]);

    const codeDigitsArray = new Array(maxLength).fill(0);

    const textInputRef = useRef(null);

    const [inputContainerFocused, setInputContainerFocused] = useState(false);

    const handleOnPress = () => {
        setInputContainerFocused(true);
        textInputRef?.current?.focus();
    }

    const handleOnBlur = () => {
        setInputContainerFocused(false);
    }

    const toCodeDigitInput = (_value, index) => {
        const emptyInputCharacter = ' ';
        const digit = code[index] || emptyInputCharacter;

        const isCurrentDigit = index === code.length;
        const isLastDigit = index === maxLength - 1;
        const isCodeFull = code.length === maxLength;

        const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFull);
        const isStyledInput = (inputContainerFocused && isDigitFocused);

        return (
            <OtpInput key={index} value={digit} focused={isStyledInput} />
        );
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.pressContainer}
                       onPress={handleOnPress}>
                {codeDigitsArray.map(toCodeDigitInput)}
            </Pressable>
            <TextInput
                style={styles.inputField}
                value={code}
                onChangeText={setCode}
                maxLength={maxLength}
                keyboardType='number-pad'
                returnKeyType='done'
                ref={textInputRef}
                onBlur={handleOnBlur}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: hp('7%'),
        paddingBottom: hp('2%')
    },
    inputField: {
        position: 'absolute',
        width: 1,
        height: 1,
        opacity: 0
    },
    pressContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});