import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Listing from '../Listing/listing.scene';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BLACK } from '../../Theme/colors';
import PrivateApi from '../../Api/private.api';
import PlayerCard from '../../Components/PlayerCard/playerCard.component';

class LeaderboardScene extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            leaderboard: []
        }
    }

    componentDidMount = () => {
        this.fetchLeaderboard();
    }

    fetchLeaderboard = async () => {
        const result = await PrivateApi.getLeaderboard();
        if (result.success) {
            this.setState({ leaderboard: result.response });
        }
    }

    render() {
        return (
            <Listing
                style={{ flex: 1, backgroundColor: BLACK }}
                data={this.state.leaderboard}
                renderItem={({ item, index }) => {
                    return (
                        <View key={index} style={{ marginBottom: 5 }} >
                            <PlayerCard
                                index={index + 1}
                                player={item}
                                width={wp('95%')}
                            />
                        </View>
                    )
                }}
            />
        )
    }
}

export default LeaderboardScene;