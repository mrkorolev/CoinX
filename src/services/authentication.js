import axios from "axios";
import { Alert } from 'react-native';
import { i18n } from "../localization/i18n";

const baseTestUrl = 'https://payone.com.tr/';
// const baseTestUrl = 'http://192.168.5.5:25000/';

const apiVersion = 'api/v1/';
const authentication = 'auth/check/';

const walletEndpoint = 'capital/transac/desposit/wallet';
const commissionEndpoint = 'user/info/user-commission';
const userProfileEndpoint = 'user/info/user-settings';


const generateErrorDescription = (reason, message, error) => {
    console.log("Error info: " + JSON.stringify(error.toJSON(), undefined, 4));
    Alert.alert(reason, ` ${message} (${error.response.status})`);
}

export const authenticateUser = async (username, password) => {
    const request_error = 'request_errors.login_request'
    try{
        const authenticationResponse = await axios({
            method: 'post',
            url: `${baseTestUrl}${apiVersion}${authentication}user`,
            data: {
                username: username,
                password: password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Access/refresh tokens come into picture right here:
        console.log(JSON.stringify(authenticationResponse.data, undefined, 4));
        return authenticationResponse;
    }catch(error){
        generateErrorDescription(i18n.t(`${request_error}.reason`), i18n.t(`${request_error}.message`), error);
    }
    return null;
}

export const otpVerification = async (accessToken, providedCode) => {
    const request_error = 'request_errors.otp_request'
    try{
        const otpResponse = await axios({
            method: 'post',
            url: `${baseTestUrl}${apiVersion}${authentication}2fa-otp`,
            data: {
                otp: providedCode
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        console.log(JSON.stringify(otpResponse.data, undefined, 4));
        return otpResponse;
    }catch(error){
        generateErrorDescription(i18n.t(`${request_error}.reason`), i18n.t(`${request_error}.message`), error);
    }
    return null;
}

export const walletDataRequest = async (accessToken, spendAmount, spendCurrency, receiveAmount, receiveCurrency, exchangeRate, commission) => {
    const request_error = 'request_errors.wallet_request';
    try{
        // Wallet request for QR generation:
        const walletResponse = await axios({
            method: 'post',
            url: `${baseTestUrl}${apiVersion}${walletEndpoint}`,
            data: {
                expected_amount: spendAmount,
                expected_crypto: receiveAmount,
                banknote: spendCurrency,
                exchange_rate: exchangeRate,
                commission_rate: commission,
                coin: receiveCurrency
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(JSON.stringify(walletResponse.data, undefined, 4));

        return walletResponse;
    }catch(error){
        generateErrorDescription(i18n.t(`${request_error}.reason`), i18n.t(`${request_error}.message`), error);
    }
    return null;
}

export const commissionDataRequest = async (accessToken) => {
    const request_error = 'request_errors.commission_request';
    try{
        const commissionResponse = await axios({
            method: 'get',
            url: `${baseTestUrl}${apiVersion}${commissionEndpoint}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log(commissionResponse);
        console.log(JSON.stringify(commissionResponse.data, undefined, 4));
        return commissionResponse.data.commission;
    }catch(error){
        generateErrorDescription(i18n.t(`${request_error}.reason`), i18n.t(`${request_error}.message`), error);
    }
    return null;
}

export const userProfileVerification = async (accessToken) => {
    const request_error = 'request_errors.profile_request';
    try{
        const userProfileResponse = await axios({
            method: 'get',
            url: `${baseTestUrl}${apiVersion}${userProfileEndpoint}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log(JSON.stringify(userProfileResponse.data, undefined, 4));
        return userProfileResponse.data;
    }catch(error){
        generateErrorDescription(i18n.t(`${request_error}.reason`), i18n.t(`${request_error}.message`), error);
    }
    return null;
}

