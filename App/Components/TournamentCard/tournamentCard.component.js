import React from 'react'
import { View, Image, Text } from 'react-native';
import { Button } from 'react-native-paper';
import _ from 'lodash';
import { YELLOW, TEXT_SECONDARY, BLUE, BLACK_LIGHT, TEXT_PRIMARY, GREEN } from '../../Theme/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { navigate } from '../../Services/navigation.service';
import moment from 'moment';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { AccessNestedObject } from '../../Utils/common.utils';

function isLive(startTime, completed) {
    return moment().isAfter(moment(startTime, 'YYYY-MM-DD')) && !completed
}

function isOpen(startTime, completed) {
    return moment().isBefore(moment(startTime, 'YYYY-MM-DD')) && !completed
}


const TournamentCard = ({ tournament = { game: {} }, width }) => {
    const WIDTH = width || widthPercentageToDP('88%');
    const startTime = tournament.start_time;
    const completed = tournament.completed;
    const joined = tournament.is_participated;

    return (
        <TouchableOpacity
            onPress={() => {
                if (joined) {
                    navigate('ReviewParticipation', { participation_id: tournament.user_participation_id })
                } else {
                    navigate('Tournament', { tournamentId: tournament._id })
                }
            }}
        >
            <View style={{ width: WIDTH, justifyContent: 'flex-start', backgroundColor: BLACK_LIGHT }} >
                <Image
                    style={{ width: WIDTH, height: 160, resizeMode: 'cover' }}
                    source={{ uri: AccessNestedObject(tournament, 'game.wallpaper_url') }}
                />
                <View style={{ padding: 15 }} >
                    <View style={{ flexDirection: 'row', height: 35, alignItems: 'center' }} >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }} >
                            <Text style={{ fontWeight: '500', fontSize: 18, color: TEXT_PRIMARY }} >
                                {tournament.game.name}
                            </Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }} >
                            {
                                isLive(startTime, completed) ?
                                    <Text style={{ fontWeight: '300', fontSize: 16, color: BLUE }} >
                                        • LIVE
                                </Text>
                                    : null
                            }
                        </View>
                    </View>
                    {
                        _.chunk(tournament.game_meta, 2).map((section) => (
                            <View style={{ flexDirection: 'row', width }} >
                                {
                                    section.map((item, index) => (
                                        <View style={{ flex: 1, justifyContent: index == 0 ? "flex-start" : "flex-end", flexDirection: 'row', height: 35 }} >
                                            <Text>
                                                <Text style={{ fontWeight: '400', fontSize: 16, color: TEXT_PRIMARY }} >
                                                    {item.key}:
                                            </Text>
                                                <Text style={{ fontWeight: '300', fontSize: 16, color: TEXT_SECONDARY }} >
                                                    {` ${item.value}`}
                                                </Text>
                                            </Text>
                                        </View>
                                    ))
                                }
                            </View>
                        ))
                    }
                    <View style={{ flexDirection: 'row', height: 35, alignItems: 'center' }} >
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }} >
                            <Text style={{ fontWeight: '300', fontSize: 16, color: TEXT_SECONDARY }} >
                                {moment(startTime, 'YYYY-MM-DD').format('lll')}
                            </Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }} >
                            {
                                isOpen(startTime, completed) ?
                                    <Button
                                        mode="contained"
                                        color={joined ? GREEN : YELLOW}
                                        onPress={() => navigate('Tournament', { tournamentId: tournament._id })}
                                    >
                                        {joined ? 'PARTICIPATED' : 'JOIN'}
                                    </Button> : null
                            }
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default TournamentCard;
