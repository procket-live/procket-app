import React, { Component } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { BLACK, TEXT_SECONDARY } from '../../Theme/colors';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { navigate, resetToScreen } from '../../Services/navigation.service';
import PublicApi from '../../Api/public.api';
import NotifyService from '../../Services/notify.service';
import AppConstants from '../../Constants/app.constants';
import { IsEmail, IsPassword } from '../../Utils/validator.utils';

class LoginScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    login = async () => {
        if (!this.validateInput()) {
            return;
        }

        const params = {
            email: this.state.email,
            password: this.state.password,
        }

        const result = await PublicApi.login(params);
        if (result.success) {
            NotifyService.notify({
                title: 'Login Success',
                duration: 500,
                message: '',
                type: 'success'
            })

            AppConstants.USER = result.response;
            this.storeData(result.token);
            resetToScreen('App');
        }
    }

    validateInput = () => {
        const { email, password } = this.state;

        return IsEmail(email, 'Enter correct email address') && IsPassword(password, 'Enter correct password format')
    }

    storeData = async (token) => {
        try {
            await AsyncStorage.setItem('@token', token)
        } catch (e) {
            // saving error
        }
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: BLACK }} >
                <View style={{ flex: 1 }} />
                <View style={{ flex: 4, alignItems: 'center' }} >
                    <View style={{ width: '90%' }} >
                        <View style={{ padding: 5 }} >
                            <TextInput
                                mode='outlined'
                                label='Email'
                                keyboardType="email-address"
                                value={this.state.email}
                                onChangeText={email => this.setState({ email })}
                            />
                        </View>
                        <View style={{ padding: 5 }} >
                            <TextInput
                                mode='outlined'
                                label='Password'
                                value={this.state.password}
                                onChangeText={password => this.setState({ password })}
                                secureTextEntry
                            />
                        </View>
                        <View style={{ padding: 5 }} >
                            <Button
                                mode="contained"
                                onPress={() => this.login()}
                                style={{ justifyContent: 'center' }}
                            >
                                Login
                            </Button>
                        </View>

                        <View style={{ paddingTop: 10, paddingBottom: 10 }} />

                        <View style={{ padding: 5 }} >
                            <Button
                                mode="outlined"
                                onPress={() => navigate('Register')}
                                style={{ justifyContent: 'center', borderColor: TEXT_SECONDARY }}
                            >
                                Create new account
                            </Button>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }} />
            </View>
        )
    }
}

export default LoginScene;