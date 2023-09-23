import {TextInput, View, StyleSheet } from "react-native";

export const CustomInput = ({ icon, secureTextEntry, placeholder, onChangeText, enterKey}) => {
    return (
        <View style={[styles.inputField, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <TextInput style={{ flex: 1 }}
                       color='#293462'
                       secureTextEntry={secureTextEntry}
                       placeholder={placeholder}
                       placeholderTextColor='#8391A1'
                       autoCapitalize='none'
                       onChangeText={onChangeText}
                       selectTextOnFocus
                       enterKeyHint={enterKey} />
            <View style={{ flex: 0.05 }}/>
            <View style={{ alignSelf: 'center', paddingRight: 10 }}>{icon && icon}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputField: {
        backgroundColor: '#F7F8F9',
        borderColor: '#DADADA',
        borderWidth: 1,
        height: 50,
        margin: 10,
        paddingLeft: 10,
        borderRadius: 10
    }
});