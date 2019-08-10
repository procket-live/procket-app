import React, { Component } from 'react';
import { List } from 'react-native-paper';
import { ScrollView, Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { BLACK, TEXT_PRIMARY, TEXT_SECONDARY, BLACK_LIGHT, BLUE } from '../../Theme/colors';
import { resetToScreen, navigate } from '../../Services/navigation.service';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import AppConstants from '../../Constants/app.constants';

class AccountScene extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    logout = async (token) => {
        try {
            await AsyncStorage.removeItem('@token');
            resetToScreen('Login');
        } catch (e) {
        }
    }

    render() {
        const user = AppConstants.USER;
        return (
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainerStyle}
            >
                <View style={{ height: heightPercentageToDP('35%'), width: widthPercentageToDP('100%'), alignItems: 'center', marginTop: 20, marginEnd: 20 }} >
                    <Image
                        style={{
                            width: widthPercentageToDP('40%'),
                            height: widthPercentageToDP('40%'),
                            resizeMode: 'contain',
                            borderRadius: widthPercentageToDP('20%')
                        }}
                        source={{ uri: 'https://www.shareicon.net/data/128x128/2016/08/18/809170_user_512x512.png' }}
                    />
                    <View style={{ marginTop: 20, marginBottom: 20, alignItems: 'center' }} >
                        <Text style={{ fontWeight: '500', color: TEXT_PRIMARY, fontSize: 24 }} >{user.name}</Text>
                        <Text style={{ fontWeight: '500', color: TEXT_SECONDARY, fontSize: 18 }} >{user.mobile}</Text>
                        <Text style={{ fontWeight: '500', color: TEXT_SECONDARY, fontSize: 16 }} >{user.email}</Text>
                    </View>
                </View>
                <View style={{ height: 80, flexDirection: 'row', backgroundColor: BLACK_LIGHT, marginTop: 20, marginEnd: 20, width: widthPercentageToDP('100%') }} >
                    <View style={{ flex: 1 }} >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}  >
                            <Text style={{ fontWeight: '400', color: TEXT_PRIMARY, fontSize: 18 }} >Rank</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}  >
                            <Text style={{ fontWeight: '300', color: TEXT_SECONDARY, fontSize: 18 }} >...</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}  >
                            <Text style={{ fontWeight: '400', color: TEXT_PRIMARY, fontSize: 18 }} >Tournaments Joined</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}  >
                            <Text style={{ fontWeight: '300', color: TEXT_SECONDARY, fontSize: 18 }} >{user.tournaments_joined}</Text>
                        </View>
                    </View>
                </View>
                <List.Section style={{ marginTop: 20 }} >
                    <TouchableOpacity
                        onPress={() => navigate('GameProfiles')}
                    >
                        <List.Item
                            title="Game Profiles"
                            left={() => <List.Icon color={BLUE} icon="face" />}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                    >
                        <List.Item
                            title="About us"
                            left={() => <List.Icon color={BLUE} icon="info" />}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                    >
                        <List.Item
                            title="Terms and Conditions"
                            left={() => <List.Icon color={BLUE} icon="apps" />}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.logout}
                    >
                        <List.Item
                            title="Logout"
                            left={() => <List.Icon color={BLUE} icon="clear" />}
                        />
                    </TouchableOpacity>
                </List.Section>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BLACK
    },
    contentContainerStyle: {
    }
})

export default AccountScene;
