import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SuccessfulOperation } from "../../components/success/SuccessfulOperation";
import { CheckBadgeIcon } from "react-native-heroicons/solid";

export const SuccessScreen = () => {
    const nav = useNavigation();

    setTimeout(() => {
        nav.navigate('MAIN');
    }, 1000);

    return (
        <SuccessfulOperation icon={<CheckBadgeIcon color='#293462' size={140}/>} mainText='Login Successful' otherText='You have been logged in successfully' />
    );
}




