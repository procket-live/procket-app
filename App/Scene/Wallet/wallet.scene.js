import React, { Component } from 'react';
import { List } from 'react-native-paper';
import { ScrollView, Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { BLACK, TEXT_PRIMARY, TEXT_SECONDARY, BLACK_LIGHT, BLUE } from '../../Theme/colors';
import { resetToScreen, navigate } from '../../Services/navigation.service';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { DisplayPrice } from '../../Utils/common.utils';
import PrivateApi from '../../Api/private.api';

class WalletScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wallet: {}
        }
    }

    componentDidMount = () => {
        this.loadWallet();
    }

    loadWallet = async () => {
        const result = await PrivateApi.getWallet();
        if (result.success) {
            this.setState({ wallet: result.response });
        }
    }

    render() {
        return (
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainerStyle}
            >
                <View style={{ width: widthPercentageToDP('100%'), height: 80, flexDirection: 'row', backgroundColor: BLACK_LIGHT, marginTop: 20, marginEnd: 20 }} >
                    <View style={{ flex: 1 }} >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}  >
                            <Text style={{ fontWeight: '400', color: TEXT_PRIMARY, fontSize: 18 }} >Wallet balance</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}  >
                            <Text style={{ fontWeight: '300', color: TEXT_SECONDARY, fontSize: 18 }} >{DisplayPrice(this.state.wallet.cash_balance)}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} >
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}  >
                            <Text style={{ fontWeight: '400', color: TEXT_PRIMARY, fontSize: 18 }} >Token</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}  >
                            <Text style={{ fontWeight: '300', color: TEXT_SECONDARY, fontSize: 18 }} >{this.state.wallet.token}</Text>
                        </View>
                    </View>
                </View>
                <List.Section style={{ marginTop: 20 }} >
                    <TouchableOpacity
                        onPress={() => navigate('AddAmount', { callback: this.loadWallet })}
                    >
                        <List.Item
                            title="Add Amount"
                            left={() => <List.Icon color={BLUE} icon="credit-card" />}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigate('Transactions')}
                    >
                        <List.Item
                            title="Transactions"
                            left={() => <List.Icon color={BLUE} icon="list" />}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                    >
                        <List.Item
                            title="FAQ"
                            left={() => <List.Icon color={BLUE} icon="face" />}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                    >
                        <List.Item
                            title="Leagal"
                            left={() => <List.Icon color={BLUE} icon="info" />}
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

export default WalletScene;
