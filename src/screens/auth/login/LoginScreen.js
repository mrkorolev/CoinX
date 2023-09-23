import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { EyeIcon, EyeSlashIcon} from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { CustomInput } from '../../../components/auth/login/CustomInput';
import { CustomButton } from '../../../components/general/CustomButton';
import {authenticateUser} from "../../../services/authentication";

export const LoginScreen = () => {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    let [protection, setProtection] = useState(true);
    let [icon, setIcon] = useState(<EyeIcon color='#6A707C'/>);
    const nav = useNavigation();

    const validateInput = (username, password) => {
        if(!username || !password){
            return false;
        }
        return true;
    }

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
                        setIcon(!protection ? <EyeIcon color='#6A707C'/> : <EyeSlashIcon color='#6A707C'/>);}}>
                        {icon}
                    </TouchableOpacity>
                }
                secureTextEntry={protection}
                placeholder='Enter your password'
                onChangeText={(text) => setPassword(text)}
                enterKey='done' />

            <CustomButton 
                text='Login' 
                onPress={async () => {

                    if(!validateInput(username, password)){
                        alert('Invalid credentials format! Try again!');
                        return;
                    }

                    const response = await authenticateUser(username, password);
                    if(response && response.status === 200){
                        console.log('LOGIN SUCCESSFUL! Proceed to OTP!');
                        nav.navigate('OTP');
                    }
                }}
            />
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