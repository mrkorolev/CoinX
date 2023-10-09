
import { View, StyleSheet} from "react-native";
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from "react-native-responsive-screen";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";

export const CustomUserIcon = ({ size, customStyle }) => {
    return (
        <View style={[styles.iconPlaceholder, customStyle]}>
            <FontAwesomeIcon icon={faUser} color='white' size={size} />
        </View>
    );
}

const styles = StyleSheet.create({
    iconPlaceholder: {
        width: wp('40%'),
        height: wp('40%'),
        borderRadius: wp('40%') * 50,
        backgroundColor: 'slategray',
        marginBottom: hp('2%'),
        marginTop: hp('4%'),
        justifyContent: 'center',
        alignItems: 'center'
    }
});
