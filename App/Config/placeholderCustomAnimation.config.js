import React from "react";
import { Animated } from "react-native";
import { BLACK, BLACK_LIGHT, TEXT_SECONDARY } from "../Theme/colors";

const PlaceholderCustomAnimation = ({ children, style = {} }) => {
    const animation = new Animated.Value(0);

    function start() {
        return Animated.timing(animation, {
            toValue: 100,
            duration: 1500
        }).start(e => {
            if (e.finished) {
                Animated.timing(animation, {
                    toValue: 0,
                    duration: 1500
                }).start((e) => {
                    if (e.finished) {
                        start();
                    }
                });
            }
        });
    }

    start();

    const backgroundColor = animation.interpolate({
        inputRange: [0, 50, 100],
        outputRange: [BLACK, BLACK_LIGHT, BLACK]
    });

    const newStyle = { ...style, backgroundColor, padding: 20 };

    return <Animated.View style={newStyle}>{children}</Animated.View>;
};

export default PlaceholderCustomAnimation;