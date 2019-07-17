import React, { Component } from 'react';
import { View } from 'react-native';

import { BLACK, YELLOW } from '../../Theme/colors';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import PublicApi from '../../Api/public.api';
import { navigate, resetToScreen } from '../../Services/navigation.service';
import NotifyService from '../../Services/notify.service';
import { IsName, IsEmail, IsPassword, IsMobilePhone } from '../../Utils/validator.utils';

class RegisterScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            mobile: ''
        }
    }

    register = async () => {
        if (!this.validate()) {
            return;
        }

        const params = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            mobile: this.state.mobile,
        };

        const result = await PublicApi.register(params);
        if (result.success) {
            resetToScreen('Login');
        } else {
            if (result.response && typeof result.response == 'string' && result.response.includes('Mail exists')) {
                NotifyService.notify(
                    {
                        title: 'Email already registered',
                        message: 'Login instead?',
                        type: 'warn',
                        duration: 4000
                    }
                );
            }
        }
    }

    validate = () => {
        const { name, email, password, mobile } = this.state;

        return IsName(name, 'Name should be atleast 3 and maximum 24 charactes') && IsEmail(email, 'Please enter correct email') && IsMobilePhone(mobile, 'Please enter correct mobile number') && IsPassword(password, 'Please enter correct password format') 
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
                                label='Name'
                                value={this.state.name}
                                onChangeText={name => this.setState({ name })}
                            />
                        </View>
                        <View style={{ padding: 5 }} >
                            <TextInput
                                mode='outlined'
                                label='Email'
                                value={this.state.email}
                                keyboardType="email-address"
                                onChangeText={email => this.setState({ email })}
                            />
                        </View>
                        <View style={{ padding: 5 }} >
                            <TextInput
                                mode='outlined'
                                label='Mobile Number'
                                value={this.state.mobile}
                                keyboardType="phone-pad"
                                onChangeText={mobile => this.setState({ mobile })}
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
                                onPress={this.register}
                                style={{ justifyContent: 'center' }}
                            >
                                register
                            </Button>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1 }} />
            </View>
        )
    }
}

export default RegisterScene;