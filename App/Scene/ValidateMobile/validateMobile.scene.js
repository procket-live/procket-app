
import React, { Component } from 'react';
import { View } from 'react-native';

import { BLACK } from '../../Theme/colors';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import AppConstants from '../../Constants/app.constants';
import PrivateApi from '../../Api/private.api';
import { resetToScreen } from '../../Services/navigation.service';

class ValidateMobileScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disableMobile: !!AppConstants.USER.mobile,
            otpSent: false,
            mobile: AppConstants.USER.mobile,
            otp: ''
        }
    }

    componentDidMount = () => {
        if (this.state.disableMobile) {
            this.generateOTP();
        }
    }

    generateOTP = async () => {
        const params = {
            mobile: this.state.mobile
        };

        const result = await PrivateApi.generateOTP(params)
        if (result.success) {
            this.setState({ otpSent: true, disableMobile: true })
        }
    }

    verify = async () => {
        const params = {
            mobile: this.state.mobile,
            otp: this.state.otp,
        }

        const result = await PrivateApi.verifyOTP(params);
        if (result.success) {
            resetToScreen('App');
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: BLACK }} >
                <View style={{ flex: 4, alignItems: 'center' }} >
                    <View style={{ width: '90%' }} >
                        <View style={{ padding: 5 }} >
                            <TextInput
                                disabled={this.state.disableMobile}
                                mode='outlined'
                                label='Mobile number'
                                value={this.state.mobile}
                                onChangeText={mobile => this.setState({ mobile })}
                            />
                        </View>
                        {
                            this.state.otpSent ?
                                <View style={{ padding: 5 }} >
                                    <TextInput
                                        mode='outlined'
                                        label='OTP'
                                        value={this.state.otp}
                                        onChangeText={otp => this.setState({ otp })}
                                    />
                                </View> : null
                        }
                        {
                            !this.state.otpSent ?
                                <View style={{ padding: 5 }} >
                                    <Button
                                        mode="contained"
                                        onPress={() => this.generateOTP()}
                                        style={{ justifyContent: 'center' }}
                                    >
                                        Generate OTP
                                    </Button>
                                </View> : null
                        }
                        {
                            this.state.otpSent ?
                                <View style={{ padding: 5 }} >
                                    <Button
                                        mode="contained"
                                        onPress={() => this.verify()}
                                        style={{ justifyContent: 'center' }}
                                    >
                                        Verify OTP
                                    </Button>
                                </View> : null
                        }
                    </View>
                </View>
            </View>
        )
    }
}

export default ValidateMobileScene;