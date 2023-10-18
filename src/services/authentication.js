import axios from "axios";
import { Alert } from 'react-native';
import { i18n } from "../localization/i18n";

const baseUrl = 'https://payone.com.tr/';
// const baseUrl = 'http://192.168.5.5:7075/';

const apiVersion = 'api/v1/';
const authentication = 'auth/check/';

const depositHistoryEndpoint = 'user/info/user-transactions'
const walletEndpoint = 'capital/transac/deposit/wallet';
const cancelTransactionEndpoint = 'capital/transac/cancel/wallet';
const commissionEndpoint = 'user/info/user-commission';
const userProfileEndpoint = 'user/info/user-profile';


const generateErrorDescription = (reason, message, error) => {
    console.log("Error info: " + JSON.stringify(error.toJSON(), undefined, 4));
    Alert.alert(reason, ` ${message} (${error.response.status})`);
}

export const authenticateUser = async (username, password) => {
    const request_error = 'request_errors.login_request'
    try{
        const authenticationResponse = await axios({
            method: 'post',
            url: `${baseUrl}${apiVersion}${authentication}user`,
            data: {
                username: username,
                password: password
            },
            headers: {
                'Content-Type': 'application/json'
            }
        });

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
            url: `${baseUrl}${apiVersion}${authentication}2fa-otp`,
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

export const depositHistoryRequest = async (accessToken) => {
    const request_error = 'request_errors.history_request';
    try{
        const historyResponse = await axios({
            method: 'get',
            url: `${baseUrl}${apiVersion}${depositHistoryEndpoint}`,
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-type': 'application/json'
            }
        });

        console.log(JSON.stringify(historyResponse.data, undefined, 4));
        return historyResponse;
    }catch(error){
        generateErrorDescription(i18n.t(`${request_error}.reason`), i18n.t(`${request_error}.message`), error);
    }
    return null;
}

export const walletDataRequest = async (accessToken, spendAmount, spendCurrency, receiveAmount, receiveCurrency, exchangeRate, commission, network) => {
    const request_error = 'request_errors.wallet_request';
    try{
        // Wallet request for QR generation:
        const walletResponse = await axios({
            method: 'post',
            url: `${baseUrl}${apiVersion}${walletEndpoint}`,
            data: {
                expected_amount: spendAmount,
                expected_crypto: receiveAmount,
                banknote: spendCurrency,
                exchange_rate: exchangeRate,
                commission_rate: commission,
                coin: receiveCurrency,
                network: network
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(JSON.stringify(walletResponse.data, undefined, 4));

        return walletResponse.data;
    }catch(error){
        generateErrorDescription(i18n.t(`${request_error}.reason`), i18n.t(`${request_error}.message`), error);
    }
    return null;
}

export const cancelTransactionRequest = async (accessToken, walletAddress) => {
    const request_error = 'request_errors.transaction_cancel_request';
    try{
        // Wallet request for QR generation:
        const transactionCancelResponse = await axios({
            method: 'post',
            url: `${baseUrl}${apiVersion}${cancelTransactionEndpoint}`,
            data: {
                wallet: walletAddress
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(JSON.stringify(transactionCancelResponse.data, undefined, 4));

        return transactionCancelResponse.data;
    }catch(error){
        // generateErrorDescription(i18n.t(`${request_error}.reason`), i18n.t(`${request_error}.message`), error);
        generateErrorDescription('Transaction cancel', 'Transaction cancellation failed!', error);
    }
    return null;
}

export const commissionDataRequest = async (accessToken) => {
    const request_error = 'request_errors.commission_request';
    try{
        const commissionResponse = await axios({
            method: 'get',
            url: `${baseUrl}${apiVersion}${commissionEndpoint}`,
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
            url: `${baseUrl}${apiVersion}${userProfileEndpoint}`,
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

