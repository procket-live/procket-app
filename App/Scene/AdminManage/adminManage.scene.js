import React, { Component } from 'react';
import { List } from 'react-native-paper';
import { ScrollView, Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { BLACK, TEXT_PRIMARY, TEXT_SECONDARY, BLACK_LIGHT, BLUE } from '../../Theme/colors';
import { resetToScreen, navigate } from '../../Services/navigation.service';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { DisplayPrice } from '../../Utils/common.utils';
import PrivateApi from '../../Api/private.api';
import TournamentCard from '../../Components/TournamentCard/tournamentCard.component';
import HorizontalSection from '../../Components/HorizontalSection/horizontalSection.component';

class AdminManageScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            upcomingTournaments: []
        }
    }

    componentDidMount = () => {
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

    refresh = () => {

    }

    render() {
        return (
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainerStyle}
            >
                <HorizontalSection
                    minHeight={heightPercentageToDP('15%')}
                    title="UPCOMING TOURNAMENTS"
                    data={this.state.upcomingTournaments}
                    renderItem={this.RenderTournament}
                />
                <List.Section style={{ marginTop: 20 }} >
                    <TouchableOpacity
                        onPress={() => navigate('AddTournament', { callback: this.refresh })}
                    >
                        <List.Item
                            title="Add Tournament"
                            left={() => <List.Icon color={BLUE} icon="credit-card" />}
                        />
                    </TouchableOpacity>
                </List.Section>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BLACK
    },
    contentContainerStyle: {
    }
})

export default AdminManageScene;
