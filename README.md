
## Payone mobile
![license](https://img.shields.io/github/license/N-way1/Payone_mobile)
![version](https://img.shields.io/github/v/release/N-way1/Payone_mobile?display_name=tag)

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React Native](https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37)

A repository for the Payone mobile crypto application, built with React Native and Expo.
<br>

## Current work stages

Following features are supported:

- [x] Binance API calls for exchange rates
- [x] Vendor API calls for QR generation and user info
- [x] Transaction History
- [x] Device localization (tr, en, ru)
- [x] App Responsiveness and security
- [x] Dark mode

## Installation and building

It is recommended to update ```Node``` from time to time.
Use ```git clone``` and ```git pull``` downloading the project and latest changes respectively.

```
cd <project_folder>/ && npm install
npx expo start (--reset-cache is optional)
```

Building:

```
npm install -g eas-cli
eas login
eas build --platform android/ios --profile android-apk/ios-simulator
```

## Screens

- Screen 1 - Login
- Screen 2 - OTP Verification
- Screen 3 - Successful Operation
- Screen 4 - HomeTab / Main
- Screen 5 - New Transaction 
- Screen 6 - QR Code Generator
- Screen 7 - SettingsTab
- Screen 8 - Profile / Account



| Screen 1                         | Screen 1                       | Screen 2                       | Screen 2                     |
|----------------------------------|--------------------------------|--------------------------------|------------------------------|
| ![](assets/light/login_light.png) | ![](assets/dark/login_dark.png) | ![](assets/light/otp_light.png) | ![](assets/dark/otp_dark.png) |



| Screen 3                            | Screen 3                         | Screen 4                         | Screen 4                      |
|-------------------------------------|----------------------------------|----------------------------------|-------------------------------|
| ![](assets/light/success_light.png)  | ![](assets/dark/success_dark.png) | ![](assets/light/home_light.png)  | ![](assets/dark/home_dark.png) |



| Screen 5                               | Screen 5                             | Screen 6                      | Screen 6                    |
|----------------------------------------|--------------------------------------|-------------------------------|-----------------------------|
| ![](assets/light/transaction_light.png) | ![](assets/dark/transaction_dark.png) | ![](assets/light/qr_light.png) | ![](assets/dark/qr_dark.png) |


| Screen 7                            | Screen 7                          | Screen 8                           | Screen 8                         |
|-------------------------------------|-----------------------------------|------------------------------------|----------------------------------|
| ![](assets/light/settings_light.png) | ![](assets/dark/settings_dark.png) | ![](assets/light/profile_light.png) | ![](assets/dark/profile_dark.png) |
