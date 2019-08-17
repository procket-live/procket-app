import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BLACK, TEXT_PRIMARY, TEXT_SECONDARY, YELLOW, GREEN, BLACK_LIGHT } from '../../Theme/colors';
import BottomStickButton from '../../Components/BottomStickButton/bottomStickButton.component';
import { ScrollView } from 'react-native-gesture-handler';
import { navigate, resetToScreen } from '../../Services/navigation.service';
import PrivateApi from '../../Api/private.api';
import { DisplayPrice, AccessNestedObject } from '../../Utils/common.utils';

class ReviewParticipationScene extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            joined: false,
            participation: props.navigation.getParam('participation') || { user: { wallet: {} }, tournament: { game: {} }, profile: {} }
        }
    }

    componentDidMount = () => {
        this.fetchData();
    }

    fetchData = async () => {
        const participationId = this.props.navigation.getParam('participation_id')
        if (!participationId) {
            return;
        }
        const result = await PrivateApi.getParticipation(participationId);
        if (result.success) {
            this.setState({ participation: result.response, joined: true });
        }
    }

    refresh = async () => {
        const { participation } = this.state;

        const result = await PrivateApi.getParticipation(participation._id);
        if (result.success) {
            this.setState({ participation: result.response });
        }
    }

    join = async () => {
        const { participation } = this.state;
        const id = participation._id;
        const result = await PrivateApi.completeParticipation(id);
        if (result.success) {
            resetToScreen('Root');
        }
    }

    RenderButton = () => {
        const { participation, joined } = this.state;

        if (joined) {
            return null;
        }

        const { user, amount } = participation;
        const wallet = user.wallet;
        const cashBalance = wallet.cash_balance;
        const requiredMore = Math.abs(cashBalance - amount);

        if (amount <= cashBalance) {
            return (
                <BottomStickButton
                    style={{ backgroundColor: GREEN }}
                    onPress={this.join}
                >
                    JOIN
                </BottomStickButton>
            )
        } else {
            return (
                <BottomStickButton
                    style={{ backgroundColor: YELLOW }}
                    onPress={() => navigate('AddAmount', { callback: this.refresh, amount: requiredMore })}
                >
                    Low on wallet balance. Add money?
                </BottomStickButton>
            )
        }


    }

    render() {
        const { participation, joined } = this.state;
        const { tournament, profile, amount } = participation;

        return (
            <View style={{ flex: 1 }} >
                <ScrollView
                    style={{ flex: 1, backgroundColor: BLACK }}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    <Image
                        style={{ width: wp('100%'), height: hp('30%'), resizeMode: 'contain' }}
                        source={{ uri: tournament.game.wallpaper_url }}
                    />
                    <View style={{ padding: 10 }} >
                        <View style={{ alignItems: 'center', marginBottom: 5 }} >
                            <Text style={{ fontSize: 24, color: TEXT_PRIMARY, fontWeight: '500' }} >{tournament.game.name}</Text>
                        </View>
                        {
                            joined ?
                                <View style={{ padding: 5, alignItems: 'center' }} >
                                    <View style={{ marginTop: 5, marginBottom: 5, flexDirection: 'row', width: wp('50%'), borderWidth: 1, borderColor: GREEN, borderRadius: 10 }} >
                                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: GREEN, borderTopLeftRadius: 10, borderBottomLeftRadius: 9 }} >
                                            <MaterialIcons
                                                name={'check'}
                                                size={15}
                                                iconStyle='outline'
                                                color={'#fff'}
                                            />
                                        </View>
                                        <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }} >
                                            <Text style={{ fontWeight: '500', fontSize: 18, color: GREEN }} >
                                                JOINED
                                            </Text>
                                        </View>
                                    </View>
                                </View> : null
                        }
                        <View
                            style={{ width: wp('95%'), flexDirection: 'row', borderRadius: 5, backgroundColor: BLACK_LIGHT, marginBottom: 10, borderWidth: 1, borderColor: GREEN }}
                        >
                            <View style={{ width: wp('100%'), padding: 10 }} >
                                <Text style={{ fontSize: 18, color: TEXT_PRIMARY, fontWeight: '500' }} >Gaming profile - </Text>
                                <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >
                                    Username: {profile.username}
                                </Text>
                                <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >
                                    Nick name: {profile.nick_name}
                                </Text>
                            </View>
                        </View>
                        {
                            joined ?
                                <View style={{ marginTop: 20, marginBottom: 20 }} >
                                    <Text style={{ fontSize: 18, color: TEXT_PRIMARY, fontWeight: '500' }} >Payment details - </Text>
                                    <Text style={{ fontSize: 14, color: TEXT_SECONDARY, fontWeight: '300', textAlign: 'left' }} >
                                        Paid amount: {DisplayPrice(amount)}
                                    </Text>
                                    <Text style={{ fontSize: 14, color: TEXT_SECONDARY, fontWeight: '300', textAlign: 'left' }} >
                                        Payment mode: Paytm
                                    </Text>
                                </View> : null
                        }
                        <View style={{ marginTop: 20, marginBottom: 20 }} >
                            <Text style={{ fontSize: 18, color: TEXT_PRIMARY, fontWeight: '500' }} >Tournament Description</Text>
                            <Text style={{ fontSize: 14, color: TEXT_SECONDARY, fontWeight: '300', textAlign: 'left' }} >
                                {tournament.tournament_description}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', height: 40, marginTop: 10 }} >
                            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16, color: TEXT_PRIMARY, fontWeight: '300' }} >Platform</Text>
                                <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >{tournament.game.platform}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16, color: TEXT_PRIMARY, fontWeight: '300' }} >Date & Time</Text>
                                <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >{moment(tournament.start_time, 'YYYY-MM-DD').format('MMM DD, YYYY')}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16, color: TEXT_PRIMARY, fontWeight: '300' }} >Players</Text>
                                <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >{tournament.max_people}</Text>
                            </View>
                        </View>
                        {
                            _.chunk(tournament.game_meta, 3).map((segment) => (
                                <View style={{ flexDirection: 'row', height: 40, marginTop: 10 }} >
                                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                        <Text style={{ fontSize: 16, color: TEXT_PRIMARY, fontWeight: '300' }} >{AccessNestedObject(segment, `${0}.key`)}</Text>
                                        <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >{AccessNestedObject(segment, `${0}.value`)}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                        <Text style={{ fontSize: 16, color: TEXT_PRIMARY, fontWeight: '300' }} >{AccessNestedObject(segment, `${1}.key`)}</Text>
                                        <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >{AccessNestedObject(segment, `${1}.value`)}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                                        <Text style={{ fontSize: 16, color: TEXT_PRIMARY, fontWeight: '300' }} >{AccessNestedObject(segment, `${2}.key`)}</Text>
                                        <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >{AccessNestedObject(segment, `${2}.value`)}</Text>
                                    </View>
                                </View>
                            ))
                        }
                        <View style={{ marginTop: 20, marginBottom: 20 }} >
                            <Text style={{ fontSize: 18, color: TEXT_PRIMARY, fontWeight: '500', marginBottom: 20 }} >Price Details</Text>
                            {(String(tournament.price_detail)).split('#').map((line) => (
                                <Text style={{ fontSize: 14, color: TEXT_SECONDARY, fontWeight: '300', textAlign: 'left' }} >
                                    {line}
                                </Text>
                            ))}
                        </View>
                        <View style={{ marginTop: 20, marginBottom: 20 }} >
                            <Text style={{ fontSize: 18, color: TEXT_PRIMARY, fontWeight: '500', marginBottom: 20 }} >Terms and Conditions</Text>
                            {(String(tournament.terms_and_condition)).split('#').map((line) => (
                                <Text style={{ fontSize: 14, color: TEXT_SECONDARY, fontWeight: '300', textAlign: 'left' }} >
                                    * {line}
                                </Text>
                            ))}
                        </View>
                    </View>
                </ScrollView>
                {this.RenderButton()}
            </View>
        )
    }
}

export default ReviewParticipationScene;

