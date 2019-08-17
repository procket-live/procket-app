import React, { Component } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker'

import { BLACK } from '../../Theme/colors';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import NotifyService from '../../Services/notify.service';
import PrivateApi from '../../Api/private.api';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ScrollView } from 'react-native-gesture-handler';
import { resetToScreen } from '../../Services/navigation.service';

const gameMetaMap = ['Win', 'Kill', 'Join Fee', 'Map', 'Device']

class AddTournamentScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            selectedGameId: '',
            startTime: '',
            participationEndTime: '',
            max: '100',
            min: '0',
            priceDetail: '',
            tournamentDetail: '',
            tnc: '',
            gameMeta: {},
            isDateTimePickerVisible: false
        }
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.hideDateTimePicker();
    };

    componentDidMount = () => {
        this.fetchGame();
    }

    fetchGame = async () => {
        const result = await PrivateApi.getGames();
        if (result.success) {
            this.setState({ games: this.processGame(result.response) })
        }
    }

    processGame = (games) => games.map((game) => ({ label: game.name, value: game._id }))


    addTournament = async () => {
        const { gameMeta } = this.state;

        const params = {
            game_id: this.state.selectedGameId,
            game_meta: Object.keys(gameMeta).map((key) => ({ key, value: gameMeta[key] })),
            start_time: this.state.startTime,
            closing_time: this.state.participationEndTime,
            max_people: this.state.max,
            min_people: this.state.min,
            price_detail: this.state.priceDetail,
            tournament_description: this.state.tournamentDetail,
            terms_and_condition: this.state.tnc,
        }

        const result = await PrivateApi.createTournament(params);
        console.log('result', result);
        if (result.success) {
            resetToScreen('Root');
        }
    }

    selectGame = (value) => {
        this.setState({ selectedGameId: value })
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: BLACK, alignItems: 'center' }} >
                <ScrollView style={{ width: '90%' }} >
                    <View style={{ padding: 5 }} >
                        <Dropdown
                            label='Select Game'
                            data={this.state.games}
                            onChangeText={this.selectGame}
                        />
                    </View>
                    <View style={{ padding: 5 }} >
                        <DatePicker
                            style={{ width: widthPercentageToDP(80) }}
                            date={this.state.startTime}
                            mode="datetime"
                            placeholder="Start Date Time"
                            format="YYYY-MM-DD HH:mm"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => { this.setState({ startTime: date }) }}
                        />
                    </View>
                    <View style={{ padding: 5 }} >
                        <DatePicker
                            style={{ width: widthPercentageToDP(80) }}
                            date={this.state.participationEndTime}
                            mode="datetime"
                            placeholder="Participation End Time"
                            format="YYYY-MM-DD HH:mm"
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36
                                }
                            }}
                            onDateChange={(date) => { this.setState({ participationEndTime: date }) }}
                        />
                    </View>
                    {
                        gameMetaMap.map((gameMeta) => (
                            <View style={{ padding: 5 }} >
                                <TextInput
                                    mode='outlined'
                                    label={gameMeta}
                                    value={this.state.gameMeta[gameMeta]}
                                    multiline
                                    onChangeText={(text) => this.setState({ gameMeta: { ...this.state.gameMeta, [gameMeta]: text } })}
                                />
                            </View>
                        ))
                    }
                    <View style={{ padding: 5 }} >
                        <TextInput
                            mode='outlined'
                            label='Price Detail'
                            value={this.state.priceDetail}
                            multiline
                            onChangeText={(text) => this.setState({ priceDetail: text })}
                        />
                    </View>
                    <View style={{ padding: 5 }} >
                        <TextInput
                            mode='outlined'
                            label='Tournament Detail'
                            value={this.state.tournamentDetail}
                            multiline
                            onChangeText={(text) => this.setState({ tournamentDetail: text })}
                        />
                    </View>
                    <View style={{ padding: 5 }} >
                        <TextInput
                            mode='outlined'
                            label='TNC Detail'
                            value={this.state.tnc}
                            multiline
                            onChangeText={(text) => this.setState({ tnc: text })}
                        />
                    </View>
                    <View style={{ padding: 5 }} >
                        <Button
                            mode="contained"
                            onPress={() => this.addTournament()}
                            style={{ justifyContent: 'center' }}
                        >
                            Add Tournament
                            </Button>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default AddTournamentScene;