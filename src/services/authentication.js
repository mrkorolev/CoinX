import axios from "axios";
import Alert from 'react-native';

// const baseTestUrl = 'https://payone.com.tr/';
const baseTestUrl = 'http://192.168.5.5:25000/';

const apiVersion = 'api/v1/';
const authentication = 'auth/check/';

const walletEndpoint = 'capital/transac/desposit/wallet';
const commissionEndpoint = 'user/info/user-commission';
const userProfileEndpoint = 'user/info/user-profile';


const generateErrorDescription = (reason, error) => {
    console.log("Error info: " + JSON.stringify(error.toJSON(), undefined, 4));
    alert(`Request failed with status code: ${error.response.status}`);
}

export const authenticateUser = async (username, password) => {
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
        generateErrorDescription('USER LOGIN', error);
    }
    return null;
}

export const otpVerification = async (accessToken, providedCode) => {
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
        generateErrorDescription('OTP VERIFICATION', error);
    }
    return null;
}

export const walletDataRequest = async (accessToken, spendAmount, spendCurrency, receiveAmount, receiveCurrency, exchangeRate, commission) => {
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
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`
            }
        });
        console.log(JSON.stringify(walletResponse.data, undefined, 4));

        return walletResponse;
    }catch(error){
        generateErrorDescription('WALLET REQUEST', error);
    }
    return null;
}

export const commissionDataRequest = async (accessToken) => {
    // Request for commission:
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
        generateErrorDescription('COMMISSION REQUEST');
    }
    return null;
}

export const userProfileVerification = async (accessToken) => {
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
        generateErrorDescription(error);
    }
    return null;
}

