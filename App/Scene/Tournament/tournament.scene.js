import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BLACK, TEXT_PRIMARY, TEXT_SECONDARY, YELLOW, GREEN, RED, CLAY } from '../../Theme/colors';
import BottomStickButton from '../../Components/BottomStickButton/bottomStickButton.component';
import { ScrollView } from 'react-native-gesture-handler';
import { navigate } from '../../Services/navigation.service';
import PrivateApi from '../../Api/private.api';

class TournamentScene extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tournament: {
                game: {}
            }
        }
    }

    componentDidMount = () => {
        this.fetchTournament();
    }

    fetchTournament = async () => {
        const tournamentId = this.props.navigation.getParam('tournamentId');
        const result = await PrivateApi.getTournamentDetail(tournamentId);
        if (result.success) {
            this.setState({ tournament: result.response });
        }
    }

    join = () => {
        const { tournament } = this.state;
        navigate('GameProfiles', {
            tournamentId: tournament._id,
            selectMode: true,
            gameId: tournament.game._id
        })
    }

    isLive = (startTime) => {
        return moment().isAfter(moment(startTime, 'YYYY-MM-DD'));
    }

    isOpen = (startTime) => {
        return moment().isBefore(moment(startTime, 'YYYY-MM-DD'))
    }

    RenderStatus = ({ startTime, completed }) => {
        let text, color;

        if (completed) {
            text = 'COMPLETED';
            color = GREEN;
        } else if (this.isLive(startTime)) {
            text = 'LIVE';
            color = RED;
        } else if (this.isOpen(startTime)) {
            text = 'OPEN';
            color = YELLOW;
        }

        return (
            <View style={{ marginTop: 5, marginBottom: 5, flexDirection: 'row', width: wp('50%'), borderWidth: 1, borderColor: color, borderRadius: 10 }} >
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: color, borderTopLeftRadius: 10, borderBottomLeftRadius: 9 }} >
                    <MaterialIcons
                        name={'check'}
                        size={15}
                        iconStyle='outline'
                        color={'#fff'}
                    />
                </View>
                <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }} >
                    <Text style={{ fontWeight: '500', fontSize: 18, color }} >
                        {text}
                    </Text>
                </View>
            </View>
        )
    }

    render() {
        const { tournament } = this.state;
        const startTime = tournament.start_time;

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
                        <View style={{ alignItems: 'center', marginBottom: 20 }} >
                            <Text style={{ fontSize: 24, color: TEXT_PRIMARY, fontWeight: '500' }} >{tournament.game.name}</Text>
                            <View style={{ marginTop: 20 }} >
                                <this.RenderStatus
                                    startTime={tournament.start_time}
                                    completed={tournament.completed}
                                />
                            </View>
                        </View>
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
                                        <Text style={{ fontSize: 16, color: TEXT_PRIMARY, fontWeight: '300' }} >{segment[0].key}</Text>
                                        <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >{segment[0].value}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                        <Text style={{ fontSize: 16, color: TEXT_PRIMARY, fontWeight: '300' }} >{segment[1].key}</Text>
                                        <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >{segment[1].value}</Text>
                                    </View>
                                    <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                                        <Text style={{ fontSize: 16, color: TEXT_PRIMARY, fontWeight: '300' }} >{segment[2].key}</Text>
                                        <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >{segment[2].value}</Text>
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
                {
                    this.isOpen(startTime) ?
                        <BottomStickButton
                            style={{ backgroundColor: YELLOW }}
                            onPress={this.join}
                        >
                            JOIN
                </BottomStickButton> : null
                }
            </View>
        )
    }
}

export default TournamentScene;

