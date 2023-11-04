
import { View, StyleSheet} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {useContext} from "react";
import {AppContext} from "../../config/context/AppContext";

export const CustomUserIcon = ({ size, customStyle }) => {

    const { theme } = useContext(AppContext);

    return (
        <View style={[styles.iconPlaceholder, customStyle]}>
            <FontAwesomeIcon icon={faUser} color={theme.userIconColor} size={size} />
        </View>
    );
}

const styles = StyleSheet.create({
    iconPlaceholder: {
        width: wp('35%'),
        height: wp('35%'),
        borderRadius: wp('35%') * 50,
        backgroundColor: 'slategray',
        marginBottom: hp('2%'),
        marginTop: hp('2%'),
        justifyContent: 'center',
        alignItems: 'center'
    }
});
