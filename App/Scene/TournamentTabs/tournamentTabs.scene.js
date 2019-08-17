import React, { Component } from 'react';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import { Appbar } from 'react-native-paper';
import { BLACK, BLUE, BLACK_LIGHT, TEXT_SECONDARY } from '../../Theme/colors';
import TournamentListScene from '../TournamentList/tournamentList.scene';
import LeaderboardScene from '../Leaderboard/leaderboard.scene';
import AppNavbar from '../../Components/AppNavbar/appNavbar.component';

class TournamentTabs extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <React.Fragment>
                <AppNavbar />
                <ScrollableTabView
                    tabBarActiveTextColor={BLUE}
                    tabBarInactiveTextColor={TEXT_SECONDARY}
                    tabBarUnderlineStyle={{
                        backgroundColor: BLUE
                    }}
                    style={{ flex: 1, backgroundColor: BLACK }}
                >
                    <TournamentListScene tabLabel="Upcoming Live" />
                    <TournamentListScene tabLabel="Completed" completed={1} />
                </ScrollableTabView>
            </React.Fragment>
        )
    }
}

export default TournamentTabs;
