import React from 'react';
import { Image, TouchableOpacity, Text } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { navigate } from '../../Services/navigation.service';
import { BLUE } from '../../Theme/colors';

const GameCard = ({ game = {} }) => (
    <TouchableOpacity
        style={{ alignItems: 'center', paddingLeft: 5, paddingRight: 5 }}
        onPress={() => navigate('Game', { gameId: game._id })}
    >
        <Image
            style={{ width: 100, height: hp('15%'), resizeMode: 'contain', borderRadius: 10, marginRight: 10 }}
            source={{ uri: game.image_url }}
        />
        <Text style={{ fontSize: 16, fontWeight: '500', color: BLUE }} >{game.name}</Text>
    </TouchableOpacity>
)

export default GameCard;
