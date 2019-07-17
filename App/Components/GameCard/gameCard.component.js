import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { navigate } from '../../Services/navigation.service';

const GameCard = ({ game = {} }) => (
    <TouchableOpacity
        onPress={() => navigate('Game', { gameId: game._id })}
    >
        <Image
            style={{ width: 100, height: hp('15%'), resizeMode: 'contain', borderRadius: 10, marginRight: 10 }}
            source={{ uri: game.image_url }}
        />
    </TouchableOpacity>
)

export default GameCard;
