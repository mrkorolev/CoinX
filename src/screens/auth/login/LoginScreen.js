import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { EyeIcon, EyeSlashIcon} from 'react-native-heroicons/solid';

import { CustomInput } from '../../../components/auth/login/CustomInput';
import { CustomButton } from '../../../components/general/CustomButton';

const correctPassword = 'Welcome1';

export const LoginScreen = () => {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [protection, setProtection] = useState(true);
    let [icon, setIcon] = useState(<EyeIcon color='#293462'/>);

    return (
        <View style={styles.container}>
            <Text style={styles.primary}>Welcome! Are you ready for your next adventure?</Text>

            <CustomInput
                placeholder='Enter your username'
                onChangeText={(text) => setUsername(text)}/>

            <CustomInput
                icon={
                    <TouchableOpacity
                        onPress={() => {
                        setProtection(!protection);
                        setIcon(!protection ? <EyeIcon color='#293462'/> : <EyeSlashIcon color='#293462'/>);}}>
                        {icon}
                    </TouchableOpacity>
                }
                secureTextEntry={protection}
                placeholder='Enter your password'
                onChangeText={(text) => setPassword(text)}/>

            <CustomButton 
                text='Login' 
                onPress={() => alert(`Login attempt for user \"${username}\": ${password === correctPassword ? 'successful' : 'unsuccessful'}`)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    primary: {
        fontWeight: 'bold',
        color: '#293462',
        paddingBottom: 20,
        fontSize: 30,
        padding: 10
    }
});