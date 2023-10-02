import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SuccessfulOperation } from "../../components/success/SuccessfulOperation";
import { CheckBadgeIcon } from "react-native-heroicons/solid";
import { i18n } from "../../localization/i18n";

export const SuccessScreen = () => {
    const nav = useNavigation();
    const screen = 'screens.success';

    setTimeout(() => {
        nav.navigate('Main');
    }, 1000);

    return (
        <SuccessfulOperation icon={<CheckBadgeIcon color='#293462' size={140}/>} mainText={i18n.t(`${screen}.title`)} otherText={i18n.t(`${screen}.secondary_text`)} />
    );
}




