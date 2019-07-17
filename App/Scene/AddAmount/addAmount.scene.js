import React, { Component } from 'react';
import { View, Text, NativeModules } from 'react-native';

import { BLACK, TEXT_SECONDARY } from '../../Theme/colors';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { pop } from '../../Services/navigation.service';
import NotifyService from '../../Services/notify.service';
import { DisplayPrice, GetChecksum } from '../../Utils/common.utils';
import PrivateApi from '../../Api/private.api';
import AppConstans from '../../Constants/app.constants';
import { IsAmount } from '../../Utils/validator.utils';

class AddAmountScene extends Component {
    constructor(props) {
        super(props);
        this.state = {
            amount: 0,
            options: [10, 20, 50, 100],
            orderId: ''
        }
    }

    componentDidMount = () => {
        this.setState({ amount: this.props.navigation.getParam('amount') || 0 })
    }

    addAmount = async () => {
        const { amount } = this.state;

        if (!IsAmount(amount, `Please enter correct amount, Min ${DisplayPrice(10)} and Max ${DisplayPrice(999)}`)) {
            return;
        }

        const result = await PrivateApi.addAmount({ amount });
        if (result.success) {
            const orderId = result.response.order_id;
            const checksum = result.response.checksum;
            this.setState({ orderId });
            NativeModules.Paytm.init(orderId,
                AppConstans.USER._id,
                AppConstans.USER.mobile,
                AppConstans.USER.email,
                String(amount),
                checksum,
                this.paymentSuccess,
                (response) => {
                    pop();
                    NotifyService.notify({
                        title: "Transaction error",
                        message: ` `,
                        duration: 1000,
                        type: 'error'
                    })
                })
        }
    }

    paymentSuccess = async (response) => {
        const callback = this.props.navigation.getParam('callback');
        const checksum = GetChecksum(response);
        const result = await PrivateApi.verifyPayment({ checksum, order_id: this.state.orderId });
        if (result.success) {
            pop();
            NotifyService.notify({
                title: "Transaction success",
                message: ``,
                duration: 1000,
                type: 'success'
            })
            callback();
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: BLACK }} >
                <View style={{ flex: 1 }} />
                <View style={{ flex: 4, alignItems: 'center' }} >
                    <View style={{ width: '90%' }} >
                        <View style={{ padding: 5 }} >
                            <TextInput
                                mode='outlined'
                                label='Enter amount to add'
                                value={this.state.amount}
                                keyboardType="decimal-pad"
                                onChangeText={amount => this.setState({ amount })}
                            />
                        </View>
                        <View style={{ padding: 5 }} >
                            <Button
                                mode="contained"
                                onPress={() => this.addAmount()}
                                style={{ justifyContent: 'center' }}
                            >
                                PAY AND ADD CASH TO WALLET
                            </Button>
                        </View>
                        {
                            this.state.amount > 0 ?
                                <View style={{ padding: 5, alignItems: 'center' }} >
                                    <Text style={{ fontWeight: '300', color: TEXT_SECONDARY, fontSize: 18 }} >
                                        And you will get {DisplayPrice(this.state.amount)} in your wallet
                                    </Text>
                                </View> : null
                        }
                    </View>
                </View>
            </View>
        )
    }
}

export default AddAmountScene;