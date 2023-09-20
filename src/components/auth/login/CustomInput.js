import {TextInput, View, StyleSheet } from "react-native";

export const CustomInput = ({ icon, secureTextEntry, placeholder, onChangeText, onSubmitEditing, blurOnSubmit, enterKey}) => {
    return (
        <View style={[styles.inputField, { flexDirection: 'row', justifyContent: 'space-between' }]}>
            <TextInput style={{ flex: 1 }}
                       secureTextEntry={secureTextEntry}
                       placeholder={placeholder}
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
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 1,
        height: 50,
        margin: 10,
        paddingLeft: 10,
        borderRadius: 10
    }
});