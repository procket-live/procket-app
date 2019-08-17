import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import StarRating from 'react-native-star-rating';
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { BLACK, TEXT_PRIMARY, TEXT_SECONDARY } from '../../Theme/colors';
import BottomStickButton from '../../Components/BottomStickButton/bottomStickButton.component';
import TagSection from '../../Components/TagsSection/tagsSection.component';
import { ScrollView } from 'react-native-gesture-handler';
import HorizontalSection from '../../Components/HorizontalSection/horizontalSection.component';
import TournamentCard from '../../Components/TournamentCard/tournamentCard.component';
import GameCard from '../../Components/GameCard/gameCard.component';
import { navigate } from '../../Services/navigation.service';
import PrivateApi from '../../Api/private.api';
import NotifyService from '../../Services/notify.service';
import { AccessNestedObject } from '../../Utils/common.utils';

class GameScene extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            game: {},
        }
    }

    componentDidMount = () => {
        this.fetchGameDetail();
    }

    fetchGameDetail = async () => {
        const gameId = this.props.navigation.getParam('gameId');
        const result = await PrivateApi.getGameDetail(gameId);
        if (result.success) {
            this.setState({ game: result.response });
        }
    }

    RenderGame = ({ item }) => {
        return (
            <GameCard imageUrl={item} />
        )
    }

    RenderTournament = ({ item }) => {
        return (
            <View style={{ marginRight: 15 }}>
                <TournamentCard />
            </View>
        );
    }

    render() {
        const { game } = this.state;
        const gameId = this.props.navigation.getParam('gameId');
        const gameName = AccessNestedObject(game, 'name');

        return (
            <View style={{ flex: 1 }} >
                <ScrollView
                    style={{ flex: 1, backgroundColor: BLACK }}
                    contentContainerStyle={{ paddingBottom: 100 }}
                >
                    <Image
                        style={{ width: wp('100%'), height: hp('30%'), resizeMode: 'contain' }}
                        source={{ uri: game.wallpaper_url }}
                    />
                    <View style={{ padding: 10 }} >
                        <View style={{}} >
                            <Text style={{ fontSize: 24, color: TEXT_PRIMARY, fontWeight: '500' }} >{game.name}</Text>
                        </View>
                        <StarRating
                            containerStyle={{ width: wp('40%') }}
                            disabled={false}
                            maxStars={5}
                            rating={game.stars}
                            emptyStarColor={TEXT_SECONDARY}
                            fullStarColor={TEXT_SECONDARY}
                            halfStarColor={TEXT_SECONDARY}
                        />
                        <View style={{}} >
                            <Text style={{ fontSize: 18, color: TEXT_PRIMARY, fontWeight: '500' }} >Overview</Text>
                            <Text style={{ fontSize: 14, color: TEXT_SECONDARY, fontWeight: '300', textAlign: 'left' }} >
                                {game.overview}
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', height: 40, marginTop: 10 }} >
                            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16, color: TEXT_PRIMARY, fontWeight: '300' }} >Platform</Text>
                                <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >{game.platform}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16, color: TEXT_PRIMARY, fontWeight: '300' }} >Rating</Text>
                                <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >{game.rating}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16, color: TEXT_PRIMARY, fontWeight: '300' }} >Developer</Text>
                                <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >{game.developer}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', height: 40, marginTop: 10 }} >
                            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16, color: TEXT_PRIMARY, fontWeight: '300' }} >Release date</Text>
                                <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >{moment(game.release_date, 'YYYY-MM-DD').format('MMM DD, YYYY')}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16, color: TEXT_PRIMARY, fontWeight: '300' }} >Publisher</Text>
                                <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >{game.publisher}</Text>
                            </View>
                            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16, color: TEXT_PRIMARY, fontWeight: '300' }} >Age Rating</Text>
                                <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >{game.min_age}</Text>
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', height: 40, marginTop: 10 }} >
                            <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16, color: TEXT_PRIMARY, fontWeight: '300' }} >Website</Text>
                                <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >{game.website_url}</Text>
                            </View>
                        </View>
                        <TagSection
                            label="Genre"
                            tags={game.genre}
                        />
                        <TagSection
                            label="Tags"
                            tags={game.tags}
                        />
                        {/* <HorizontalSection
                            title="UPCOMING TOURNAMENTS"
                            data={[1, 2, 3, 4, 5, 6]}
                            renderItem={this.RenderTournament}
                        />
                        <HorizontalSection
                            title="SIMILAR GAMES"
                            data={this.state.games}
                            renderItem={this.RenderGame}
                        /> */}
                    </View>
                </ScrollView>
                <BottomStickButton
                    onPress={() => {
                        if (game.active) {
                            navigate('TournamentList', { gameId, title: gameName })
                        } else {
                            NotifyService.notify({
                                title: 'Coming Soon!!!',
                                message: 'We are working hard to get this game on platrom, please wait for a while',
                                type: 'info',
                                duration: 1000
                            })
                        }
                    }}
                >
                    {game.active ? 'PLAY' : 'COMING SOON'}
                </BottomStickButton>
            </View>
        )
    }
}

export default GameScene;

