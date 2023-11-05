import {TextInput, View, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AppContext } from "../../../config/context/AppContext";
import { useContext } from "react";

export const CustomInput = ({ icon, value, secureTextEntry, placeholder, onChangeText, enterKey, onSubmitHandler, customRef }) => {

    const { theme } = useContext(AppContext);

    return (
        <View style={[styles.inputField, { backgroundColor: theme.placeholderBgColor, borderColor: theme.inputBorderColor }]}>
            <TextInput style={styles.inputValue}
                       ref={customRef}
                       color={theme.inputColor}
                       value={value}
                       secureTextEntry={secureTextEntry}
                       placeholder={placeholder}
                       placeholderTextColor={theme.placeholderTextColor}
                       placeholderTextStyle={{ fontWeight: 'bold' }}
                       onSubmitEditing={onSubmitHandler}
                       autoCapitalize='none'
                       onChangeText={onChangeText}
                       selectTextOnFocus
                       enterKeyHint={enterKey} />

            <View style={{ flex: 0.05 }}/>
            <View style={styles.icon}>{icon && icon}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputField: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderWidth: 1,
        height: hp('7%'),
        marginVertical: '3%',
        paddingLeft: '3%',
        borderRadius: 5,
    },
    inputValue: {
        flex: 1,
        fontSize: wp('3.5%')
    },
    icon: {
        alignSelf: 'center',
        paddingRight: '3%'
    }
});
