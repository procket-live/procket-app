import React, { Component } from 'react';
import { Text, TouchableRipple } from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { BLUE, BLACK } from '../../Theme/colors';

const AnimatedTouchableRipple = Animatable.createAnimatableComponent(TouchableRipple);

class BottomStickButton extends Component {
    render() {
        return (
            <AnimatedTouchableRipple
                disabled={!!this.props.loading}
                animation="fadeInUpBig"
                rippleColor="rgba(0, 0, 0, .32)"
                {...this.props}
                style={{ ...styles.wrapper, ...this.props.style }}
            >
                {
                    this.props.loading ?
                        <ActivityIndicator size="large" color="#fff" /> :
                        <Text
                            style={{ ...styles.text }}
                        >
                            {this.props.children}
                        </Text>
                }
            </AnimatedTouchableRipple>
        )
    }
}

const styles = {
    wrapper: {
        width: wp('100%'),
        height: 50,
        backgroundColor: BLUE,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: BLACK,
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'center'
    }
}

export default BottomStickButton;