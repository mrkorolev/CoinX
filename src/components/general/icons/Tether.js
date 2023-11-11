import { SvgXml } from 'react-native-svg';
import {StyleSheet, View} from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

export const Tether = ({color, bgColor, size}) => {

    const svgFile = `
        <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.50078 0L0 5.38477L6.87539 12L13.7508 5.38477L11.25 0H2.50078ZM2.8834 0.6H10.8674L13.026 5.24883L6.87539 11.1674L0.724805 5.24883L2.8834 0.6ZM3.2625 1.51289L3.27539 3.3H5.97539V4.34707C3.53789 4.42477 2.50078 4.81409 2.50078 5.26289C2.50078 5.71169 4.01009 6.2082 5.97539 6.3V9.6H7.77539V6.3C9.74069 6.2082 11.25 5.71169 11.25 5.26289C11.25 4.81409 10.2129 4.46227 7.77539 4.34707V3.3H10.4754L10.4625 1.51289H3.2625ZM5.97539 4.6125V5.4C6.27539 5.4189 6.55049 5.42461 6.87539 5.42461C7.20029 5.42461 7.47539 5.4186 7.77539 5.4V4.65C9.39209 4.728 10.4754 4.8474 10.4754 5.175C10.4754 5.5635 8.94629 5.8875 6.87539 5.8875C4.80449 5.8875 3.27539 5.601 3.27539 5.2125C3.27539 4.8849 4.35869 4.6905 5.97539 4.6125Z" fill="${color}"/>
        </svg>`;

    return (
        <View style={[styles.container, { backgroundColor: bgColor }]}>
            <SvgXml xml={svgFile.toString()} width={size} height={size} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: wp('7%'),
        height: wp('7%')
    }
});
