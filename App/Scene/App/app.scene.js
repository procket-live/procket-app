import React, { Component } from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import firebase from 'react-native-firebase';

import AsyncStorage from '@react-native-community/async-storage';
import { BLACK } from '../../Theme/colors';
import { resetToScreen } from '../../Services/navigation.service';
import AppConstants from '../../Constants/app.constants';
import PrivateApi from '../../Api/private.api';
import NotifyService from '../../Services/notify.service';

class AppScene extends Component {
    componentDidMount = async () => {
        this.animation.play();

        try {
            const value = await AsyncStorage.getItem('@token')
            if (value !== null) {
                this.fetchUser();
            } else {
                resetToScreen('OnBoarding');
            }
        } catch (e) {
            resetToScreen('OnBoarding');
        }
    }

    fetchUser = async () => {
        const result = await PrivateApi.getUser();
        if (result.success) {
            const user = result.response;
            AppConstants.USER = user;

            const isAdminResult = await PrivateApi.isAdmin();
            if (isAdminResult.success) {
                AppConstants.IS_ADMIN = true;
                setTimeout(AppConstants.REFRESH_APP);
            }

            const isMobileValidated = user.is_mobile_verified;
            if (isMobileValidated) {
                this.setFirebaseToken();
            } else {
                resetToScreen('ValidateMobile')
                NotifyService.notify({
                    title: 'Mobile is not validated',
                    message: 'Validate mobile number to proceed further',
                    duration: 1400,
                    type: 'info'
                })
            }
        } else {
            resetToScreen('Login');
            NotifyService.notify({
                title: 'Token expired !!!',
                message: 'Unable to validate user ',
                duration: 1400,
                type: 'error'
            });
            this.removeToken();
        }
    }

    removeToken = async () => {
        try {
            await AsyncStorage.removeItem('@token')
        } catch (e) {
            // saving error
        }
    }

    setFirebaseToken = () => {
        firebase.messaging().getToken()
            .then(async (token) => {
                if (token != undefined) {
                    const result = await PrivateApi.setFirebaseToken({ firebase_token: token });
                    if (result.success) {
                        resetToScreen('Root')
                    }
                }
            });
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: BLACK, alignItems: 'center', justifyContent: 'center' }} >
                <View style={{ width: 200, height: 200 }} >
                    <LottieView
                        ref={animation => {
                            this.animation = animation;
                        }}
                        source={require('../../Assets/hourglass-black.json')}
                    />
                </View>
            </View>
        )
    }
}

export default AppScene;