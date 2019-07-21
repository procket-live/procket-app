import React from 'react';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { BLUE, BLACK, CLAY, BLACK_LIGHT, TEXT_PRIMARY } from '../Theme/colors';

//Tabs Scene
import PlayScene from '../Scene/Play/play.scene';
import AccountScene from '../Scene/Account/account.scene';
import OnBoardingScene from '../Scene/OnBoarding/onBoarding.scene';
import LoginScene from '../Scene/Login/login.scene';
import RegisterScene from '../Scene/Register/register.scene';
import AppScene from '../Scene/App/app.scene';
import TournamentTabs from '../Scene/TournamentTabs/tournamentTabs.scene';
import GameScene from '../Scene/Game/game.scene';
import TournamentListScene from '../Scene/TournamentList/tournamentList.scene';
import TournamentScene from '../Scene/Tournament/tournament.scene';
import GameProfilesScene from '../Scene/GameProfiles/gameProfiles.scene';
import CreateGameProfileScene from '../Scene/CreateGameProfile/createGameProfile.scene';
import ValidateMobileScene from '../Scene/ValidateMobile/validateMobile.scene';
import WalletScene from '../Scene/Wallet/wallet.scene';
import AddAmountScene from '../Scene/AddAmount/addAmount.scene';
import TransactionsScene from '../Scene/Tansactions/transactions.scene';
import ReviewParticipationScene from '../Scene/ReviewParticipation/reviewParticipation.scene';

const RootTabs = createBottomTabNavigator(
    {
        Play: { screen: PlayScene },
        Tournaments: { screen: TournamentTabs },
        Wallet: { screen: WalletScene },
        Account: { screen: AccountScene },
    },
    {
        initialRouteName: 'Play',
        order: ['Play', 'Tournaments', 'Wallet', 'Account'],
        backBehavior: 'initialRoute',
        lazy: true,
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let icon;
                switch (routeName) {
                    case 'Play':
                        icon = 'gamepad';
                        break;
                    case 'Tournaments':
                        icon = 'whatshot';
                        break;
                    case 'Wallet':
                        icon = 'blur-circular';
                        break;
                    case 'Account':
                        icon = 'person'
                        break;
                }

                return (
                    <MaterialIcons
                        name={icon}
                        size={25}
                        iconStyle='outline'
                        color={tintColor}
                    />
                );
            },
        }),
        tabBarOptions: {
            activeTintColor: BLUE,
            inactiveTintColor: CLAY,
            allowFontScaling: false,
            // showLabel: false,
            style: {
                paddingTop: 5,
                paddingBottom: 5,
                height: 60,
                backgroundColor: BLACK_LIGHT,
                // borderTopWidth: 1,
                // borderTopColor: CLAY,r
                elevation: 2,
            }
        },
    }
);

const RootNavigator = createStackNavigator(
    {
        App: {
            screen: AppScene,
            navigationOptions: {
                header: null,
            }
        },
        Root: {
            screen: RootTabs,
            navigationOptions: {
                header: null,
            }
        },
        OnBoarding: {
            screen: OnBoardingScene,
            navigationOptions: {
                header: null,
            }
        },
        Login: {
            screen: LoginScene,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: BLACK,
                    zIndex: 0,
                    elevation: 0
                },
                title: 'Procket - Login',
                headerTintColor: TEXT_PRIMARY,
            }
        },
        Register: {
            screen: RegisterScene,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: BLACK,
                    zIndex: 0,
                    elevation: 0
                },
                title: 'Procket - Create new account',
                headerTintColor: TEXT_PRIMARY,
            }
        },
        Game: {
            screen: GameScene,
            navigationOptions: {
                header: null,
            }
        },
        TournamentList: {
            screen: TournamentListScene,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: BLACK,
                    zIndex: 0,
                    elevation: 0
                },
                title: 'PUBG Mobile: Tournaments',
                headerTintColor: TEXT_PRIMARY,
            }
        },
        Tournament: {
            screen: TournamentScene,
            navigationOptions: {
                header: null,
            }
        },
        GameProfiles: {
            screen: GameProfilesScene,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: BLACK,
                    zIndex: 0,
                    elevation: 0
                },
                title: 'Game profiles',
                headerTintColor: TEXT_PRIMARY,
            }
        },
        CreateGameProfile: {
            screen: CreateGameProfileScene,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: BLACK,
                    zIndex: 0,
                    elevation: 0
                },
                title: 'Create new game profile',
                headerTintColor: TEXT_PRIMARY,
            }
        },
        ValidateMobile: {
            screen: ValidateMobileScene,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: BLACK,
                    zIndex: 0,
                    elevation: 0
                },
                title: 'Verify mobile number',
                headerTintColor: TEXT_PRIMARY,
            }
        },
        AddAmount: {
            screen: AddAmountScene,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: BLACK,
                    zIndex: 0,
                    elevation: 0
                },
                title: 'Add cash',
                headerTintColor: TEXT_PRIMARY,
            }
        },
        Transactions: {
            screen: TransactionsScene,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: BLACK,
                    zIndex: 0,
                    elevation: 0
                },
                title: 'Transactions',
                headerTintColor: TEXT_PRIMARY,
            }
        },
        ReviewParticipation: {
            screen: ReviewParticipationScene,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: BLACK,
                    zIndex: 0,
                    elevation: 0
                },
                title: 'Review',
                headerTintColor: TEXT_PRIMARY,
            }
        }
    },
    {
        initialRouteName: 'App'
    }
)

export default createAppContainer(RootNavigator);