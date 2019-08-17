import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';

import { BLACK } from '../../Theme/colors';
import AppNavbar from '../../Components/AppNavbar/appNavbar.component';
import ImageCarousel from '../../Components/ImageCarousel/imageCarousel.component';
import TournamentCard from '../../Components/TournamentCard/tournamentCard.component';
import GameCard from '../../Components/GameCard/gameCard.component';
import HorizontalSection from '../../Components/HorizontalSection/horizontalSection.component';
import PrivateApi from '../../Api/private.api';
import { heightPercentageToDP } from 'react-native-responsive-screen';

class PlayScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loadingOffers: true,
            offers: [],
            loadingGames: true,
            games: [],
            loadingTournament: true,
            tournaments: []
        }
    }

    componentDidMount = () => {
        this.fetchOffers();
        this.fetchGame();
        this.fetchTournament();
    }
    

    fetchOffers = async () => {
        const result = await PrivateApi.offers();
        if (result.success) {
            this.setState({ offers: result.response, loadingOffers: false });
        }
    }

    fetchGame = async () => {
        const result = await PrivateApi.getGames();
        if (result.success) {
            this.setState({ games: result.response, loadingGames: false })
        }
    }

    fetchTournament = async () => {
        const result = await PrivateApi.getUpcomingTournaments(null, true);
        if (result.success) {
            this.setState({ tournaments: result.response, loadingTournament: false })
        }
    }

    RenderGame = ({ item }) => {
        return (
            <GameCard
                game={item}
            />
        )
    }

    RenderTournament = ({ item }) => {
        return (
            <View style={{ marginRight: 10 }} >
                <TournamentCard
                    tournament={item}
                />
            </View>
        );
    }


    render() {
        return (
            <ScrollView
                style={{ flex: 1, backgroundColor: BLACK }}
                contentContainerStyle={{ paddingBottom: 50 }}
            >
                <AppNavbar />
                <ImageCarousel
                    images={this.state.offers}
                    loading={this.state.loadingOffers}
                />
                <HorizontalSection
                    minHeight={heightPercentageToDP('10%')}
                    title="TRENDING GAMES"
                    data={this.state.games}
                    renderItem={this.RenderGame}
                />
                <HorizontalSection
                    minHeight={heightPercentageToDP('15%')}
                    title="UPCOMING TOURNAMENTS"
                    data={this.state.tournaments}
                    renderItem={this.RenderTournament}
                />
            </ScrollView>
        )
    }
}

export default PlayScene;