import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { YELLOW, CLAY, TEXT_SECONDARY } from '../../Theme/colors';

const Tag = ({ label, tagStyle, textStyle }) => (
    <View
        style={[styles.container, tagStyle]}
    >
        <Text style={[styles.text, textStyle]} >{label}</Text>
    </View>
)

const styles = StyleSheet.create({
    container: {
        padding: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: CLAY,
        margin: 2,
        minWidth: 70,
        height: 30,
        marginRight: 10,
        padding: 5
    },
    text: {
        fontSize: 14,
        color: TEXT_SECONDARY,
        fontWeight: '300',
    }
})
export default Tag;