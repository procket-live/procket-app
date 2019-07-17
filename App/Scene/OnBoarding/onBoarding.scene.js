import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

import { BLACK, BLACK_LIGHT, BLUE, YELLOW, CLAY, TEXT_COLOR, TEXT_SECONDARY, TEXT_PRIMARY } from '../../Theme/colors';
import { resetToScreen } from '../../Services/navigation.service';


class OnBoardingScene extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    proceed = () => {
        resetToScreen('Login');
    }

    render() {
        return (
            <Onboarding
                style={{ flex: 1 }}
                bottomBarColor={BLACK}
                bottomBarHighlight={YELLOW}
                controlStatusBar
                allowFontScaling={false}
                titleStyles={{
                    color: TEXT_PRIMARY
                }}
                subTitleStyles={{
                    color: TEXT_SECONDARY
                }}
                pages={[
                    {
                        backgroundColor: BLACK_LIGHT,
                        title: 'TOURNAMENTS',
                        subtitle: 'Play and win matches and get exciting rewards!',
                    },
                    {
                        backgroundColor: BLACK_LIGHT,
                        title: 'LEADERBOARDS',
                        subtitle: 'Win matches and tournaments and reach the top of ladder',
                    },
                    {
                        backgroundColor: BLACK_LIGHT,
                        title: 'READ GAMING INFORMATION AND NEWS',
                        subtitle: 'Be up-to-date about the world of gaming and technology.',
                    },
                    {
                        backgroundColor: BLACK_LIGHT,
                        title: 'WATCH LIVESTREAM',
                        subtitle: 'Watch live stream of each tournament.',
                    },
                ]}
                onSkip={this.proceed}
                onDone={this.proceed}
            />
        )
    }
}

export default OnBoardingScene;