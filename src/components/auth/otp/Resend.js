import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export const Resend = () => {
    return (
        <View style={{ justifyContent: 'flex-end', flexDirection: 'column', padding: 10 }}>
            <View style={styles.resend}>
                <Text style={{ paddingHorizontal: 5 }}>Didn't receive code?</Text>
                <TouchableOpacity onPress={() => {alert('New OTP code has been successfully requested!')}}>
                    <Text style={{ fontWeight: 'bold' }}>Resend</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    resend: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});