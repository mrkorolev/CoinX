import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { EyeIcon, EyeSlashIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { CustomInput } from '../../../components/auth/login/CustomInput';
import { CustomButton } from '../../../components/general/CustomButton';

const validCredentials = ['arekan-user', 'ArekanSoft123'];

export const LoginScreen = () => {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [protection, setProtection] = useState(true);
    let [icon, setIcon] = useState(<EyeIcon color='#293462'/>);
    const nav = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.primary}>Welcome! Are you ready for your next adventure?</Text>

            <CustomInput
                placeholder='Enter your username'
                onChangeText={(text) => setUsername(text)}
                enterKey='next'/>

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
                onChangeText={(text) => setPassword(text)}
                enterKey='done' />

            <CustomButton 
                text='Login' 
                onPress={() => {
                    // alert(`Login attempt for user \"${username}\": ${password === correctPassword ? 'successful' : 'unsuccessful'}`)
                    if(username === validCredentials[0] && password === validCredentials[1]){
                        nav.navigate('OTP');
                    }else{
                        alert('Invalid credentials! Try again');
                    }
                }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 8
    },
    primary: {
        fontWeight: 'bold',
        color: '#293462',
        paddingBottom: 20,
        fontSize: 30,
        padding: 10
    }
});