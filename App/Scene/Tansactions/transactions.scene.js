
import React, { PureComponent } from 'react';
import { View, FlatList, Text, Image, StyleSheet, NativeModules } from 'react-native';
import PrivateApi from '../../Api/private.api';
import { BLACK, TEXT_PRIMARY, TEXT_SECONDARY, BLUE, BLACK_LIGHT, YELLOW, GREEN } from '../../Theme/colors';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DisplayPrice } from '../../Utils/common.utils';

class TransactionsScene extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            transactions: [],
        }
    }

    componentDidMount = () => {
        this.fetchData()
    }

    fetchData = async () => {
        const result = await PrivateApi.getTransactions();
        console.log('result', result);
        if (result.success) {
            this.setState({ transactions: result.response });
        }
    }

    renderStatus = (status) => {
        if (status == 'pending' || status == 'PENDING') {
            return (
                <Text style={{ fontSize: 16, color: YELLOW, fontWeight: '300' }} >
                    Status: PENDING
                </Text>
            )
        }

        if (status == 'TXN_SUCCESS') {
            return (
                <Text style={{ fontSize: 16, color: GREEN, fontWeight: '300' }} >
                    Status: SUCCESS
                </Text>
            )
        }
    }

    RenderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={{ width: widthPercentageToDP('95%'), borderRadius: 5, backgroundColor: BLACK_LIGHT, marginBottom: 10, padding: 15 }}
            >
                <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >
                    Transaction Id: #{item._id}
                </Text>
                <Text style={{ fontSize: 16, color: TEXT_SECONDARY, fontWeight: '300' }} >
                    Amount: {DisplayPrice(item.amount)}
                </Text>
                {this.renderStatus(item.status)}
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <React.Fragment>
                <FlatList
                    style={{ flex: 1, backgroundColor: BLACK }}
                    contentContainerStyle={{ alignItems: 'center' }}
                    data={this.state.transactions.reverse()}
                    renderItem={this.RenderItem}
                />
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


export default TransactionsScene;
