import React from 'react'
import { View, Image, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { TEXT_SECONDARY, BLUE, BLACK_LIGHT } from '../../Theme/colors';

const PlayerCard = ({ player = {}, index }) => {
    return (
        <View style={{ width: wp('100%'), flexDirection: 'row', backgroundColor: BLACK_LIGHT, padding: 10, margin: 5 }} >
            <View style={{ width: '30%', alignItems: 'center', justifyContent: 'center' }} >
                <Image
                    style={{ width: wp('15%'), height: wp('15%'), resizeMode: 'contain' }}
                    source={{ uri: 'https://www.shareicon.net/data/128x128/2016/08/18/809170_user_512x512.png' }}
                />
            </View>
            <View style={{ width: '70%', alignItems: 'flex-start', justifyContent: 'center' }} >
                <Text style={{ fontWeight: '400', fontSize: 16, color: TEXT_SECONDARY }} >
                    #{index} {player.name}
                </Text>
                <Text style={{ fontWeight: '300', fontSize: 16, color: BLUE }} >
                    • India
                </Text>
            </View>
        </View>
    )
}

export default PlayerCard;
