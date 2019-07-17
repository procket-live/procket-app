
import React, { PureComponent } from 'react';
import { View, FlatList, Text, Image, StyleSheet, NativeModules } from 'react-native';
import PrivateApi from '../../Api/private.api';
import { BLACK, BLACK_LIGHT, TEXT_PRIMARY, TEXT_SECONDARY, BLUE } from '../../Theme/colors';
import ApiConstants from '../../Constants/app.constants';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { FAB } from 'react-native-paper';
import { navigate, pop } from '../../Services/navigation.service';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomStickButton from '../../Components/BottomStickButton/bottomStickButton.component';

class GameProfilesScene extends PureComponent {
    constructor(props) {
        super(props);
        const selectMode = props.navigation.getParam('selectMode') || false;
        const gameId = props.navigation.getParam('gameId') || null;
        this.state = {
            profiles: [],
            selectMode,
            gameId,
            profileId: null
        }
    }

    componentDidMount = () => {
        this.fetchData()
    }

    makePayment = async () => {
        const body = {
            tournament_id: this.props.navigation.getParam('tournamentId'),
            profile_id: this.state.profileId,
        }

        const result = await PrivateApi.participateTournament(body);
        console.log('result', result);
        if (result.success) {
            console.log('naviiigation');
            navigate('ReviewParticipation', { participation: result.response });
        }
    }

    fetchData = async () => {
        const result = await PrivateApi.getGameProfiles();
        if (result.success) {
            const profiles = this.filterProfiles(result.response);
            if (profiles.length == 0) {
                this.createNewProfile();
            }

            if (profiles.length == 1 && this.state.selectMode) {
                this.setState({ profileId: profiles[0]['_id'] })
            }

            this.setState({ profiles })
        }
    }

    filterProfiles = (profiles) => {
        const { gameId } = this.state;
        if (!gameId) {
            return profiles;
        }

        return profiles.filter((profile) => profile.game._id == gameId);
    }

    onGameProfileAdd = () => {
        pop();
        this.fetchData();
    }

    createNewProfile = () => navigate('CreateGameProfile', { callback: this.onGameProfileAdd })

    selectProfile = (profileId) => {
        this.setState({ profileId: (this.state.profileId == profileId) ? null : profileId });
    }

    getCardCss = (profileId) => {
        const css = { width: widthPercentageToDP('95%'), flexDirection: 'row', borderRadius: 5, backgroundColor: BLACK_LIGHT, marginBottom: 10 };

        if (profileId == this.state.profileId) {
            css['borderWidth'] = 2;
            css['borderColor'] = BLUE;
        }

        return css;
    }

    RenderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={this.getCardCss(item._id)}
                onPress={() => {
                    if (this.state.selectMode) {
                        this.selectProfile(item._id);
                    }
                }}
            >
                <View style={{ width: widthPercentageToDP('30%') }} >
                    <Image
                        source={{ uri: item.game.image_url }}
                        style={{ width: widthPercentageToDP('30%'), height: 100, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}
                    />
                </View>
                <View style={{ width: widthPercentageToDP('65%'), padding: 10 }} >
                    <Text style={{ fontSize: 18, color: TEXT_PRIMARY, fontWeight: '500' }} >{item.game.name}</Text>
                    <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >
                        Username: {item.username}
                    </Text>
                    <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >
                        Nick name: {item.nick_name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <React.Fragment>
                {
                    this.state.selectMode ?
                        <Text style={{ backgroundColor: BLACK, padding: 20, fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >
                            Select a game profile to proceed. Please keep in mind that once payment is done you cannot update these details.
                        </Text> : null
                }
                <FlatList
                    style={{ flex: 1, backgroundColor: BLACK }}
                    contentContainerStyle={{ alignItems: 'center' }}
                    data={this.state.profiles}
                    renderItem={this.RenderItem}
                />
                {
                    !this.state.selectMode ?
                        <FAB
                            style={styles.fab}
                            icon="add"
                            onPress={this.createNewProfile}
                        /> : null
                }
                {
                    (this.state.selectMode && this.state.profileId) ?
                        <BottomStickButton
                            onPress={() => this.makePayment()}
                        >
                            PROCEED
                        </BottomStickButton> : null
                }
            </React.Fragment>

        )
    }
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})


export default GameProfilesScene;
