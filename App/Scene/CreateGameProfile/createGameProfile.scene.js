import React, { Component } from 'react';
import { View } from 'react-native';

import { BLACK } from '../../Theme/colors';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import NotifyService from '../../Services/notify.service';
import PrivateApi from '../../Api/private.api';

class CreateGameProfileScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            gameId: '5cf37cf863b7aa224ced7198',
            username: '',
            nickName: ''
        }
    }

    creteProfile = async () => {
        const callback = this.props.navigation.getParam('callback');
        const params = {
            game_id: this.state.gameId,
            nick_name: this.state.nickName,
            username: this.state.username
        }

        const result = await PrivateApi.createProfile(params);
        if (result.success) {
            NotifyService.notify({
                title: 'Profile created',
                duration: 500,
                message: '',
                type: 'success'
            });
            if (callback && typeof callback == 'function') {
                callback();
            }
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: BLACK }} >
                <View style={{ flex: 4, alignItems: 'center' }} >
                    <View style={{ width: '90%' }} >
                        <View style={{ padding: 5 }} >
                            <TextInput
                                disabled={true}
                                mode='outlined'
                                label='Game'
                                value={"PUBG Mobile"}
                            />
                        </View>
                        <View style={{ padding: 5 }} >
                            <TextInput
                                mode='outlined'
                                label='Username*'
                                value={this.state.username}
                                onChangeText={username => this.setState({ username })}
                            />
                        </View>
                        <View style={{ padding: 5 }} >
                            <TextInput
                                mode='outlined'
                                label='Nickname'
                                value={this.state.nickName}
                                onChangeText={nickName => this.setState({ nickName })}
                            />
                        </View>
                        <View style={{ padding: 5 }} >
                            <Button
                                mode="contained"
                                onPress={() => this.creteProfile()}
                                style={{ justifyContent: 'center' }}
                            >
                                Create new game profile
                            </Button>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default CreateGameProfileScene;