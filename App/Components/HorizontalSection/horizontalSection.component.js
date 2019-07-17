import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { TEXT_PRIMARY } from '../../Theme/colors';

const HorizontalSection = ({ title, data, renderItem, minHeight }) => {
    return (
        <View style={{ padding: 20 }} >
            <View style={{ paddingTop: 20, paddingBottom: 20 }} >
                <Text style={{ fontSize: 20, fontWeight: '500', color: TEXT_PRIMARY }} >
                    {title}
                </Text>
            </View>

            <FlatList
                style={{ minHeight }}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={data}
                renderItem={renderItem}
            />
        </View>
    )
}

export default HorizontalSection;
