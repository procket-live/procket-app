import React, { PureComponent } from 'react';
import { View } from 'react-native';
import Listing from '../Listing/listing.scene';
import TournamentCard from '../../Components/TournamentCard/tournamentCard.component';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { BLACK } from '../../Theme/colors';
import PrivateApi from '../../Api/private.api';

class TournamentListScene extends PureComponent {
    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.title}`,
    });

    constructor(props) {
        super(props);
        this.state = {
            tournaments: []
        }
    }

    componentDidMount = () => {
        this.fetchTournaments();
    }

    fetchTournaments = async () => {
        const { completed } = this.props;
        const gameId = this.props.navigation ? this.props.navigation.getParam('gameId') : null;
        const result = await PrivateApi.getUpcomingTournaments(gameId, false, completed);
        if (result.success) {
            this.setState({ tournaments: result.response });
        }
    }

    render() {
        return (
            <Listing
                style={{ flex: 1, backgroundColor: BLACK }}
                data={this.state.tournaments}
                renderItem={({ item }) => {
                    return (
                        <TournamentCard
                            tournament={item}
                            width={wp('88%')}
                        />
                    )
                }}
            />
        )
    }
}

export default TournamentListScene;