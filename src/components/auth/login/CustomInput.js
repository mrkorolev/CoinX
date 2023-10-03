import {TextInput, View, StyleSheet } from "react-native";

// Responsiveness:
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const CustomInput = ({ icon, secureTextEntry, placeholder, onChangeText, enterKey }) => {
    return (
        <View style={[styles.inputField, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <TextInput style={styles.inputValue}
                       color='#293462'
                       secureTextEntry={secureTextEntry}
                       placeholder={placeholder}
                       placeholderTextColor='#8391A1'
                       autoCapitalize='none'
                       onChangeText={onChangeText}
                       selectTextOnFocus
                       enterKeyHint={enterKey} />
            <View style={{ flex: 0.05 }}/>
            <View style={{ alignSelf: 'center', paddingRight: '3%' }}>{icon && icon}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputField: {
        backgroundColor: '#F7F8F9',
        borderColor: '#DADADA',
        borderWidth: 1,
        height: hp('7%'),
        // marginHorizontal: '2%',
        marginVertical: '3%',
        paddingLeft: '3%',
        borderRadius: 5,
    },
    inputValue: {
        flex: 1,
        fontSize: 13
    }
});