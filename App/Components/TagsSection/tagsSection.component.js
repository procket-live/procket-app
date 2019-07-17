import React from 'react';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import Tag from '../Tag/tag.component';
import { TEXT_PRIMARY } from '../../Theme/colors';

const TagSection = ({ label, tags, newLine = false, containerStyle }) => (
    <View style={[styles.tagsContainer, containerStyle]} >
        <Text style={{ fontSize: 16, color: TEXT_PRIMARY, fontWeight: '300', marginBottom: 10 }} >{label}</Text>
        <FlatList
            horizontal={!newLine}
            data={tags}
            renderItem={({ item, index }) => <Tag key={index} label={item} />}
        />
    </View>
)

const styles = StyleSheet.create({
    tagsContainer: {
        marginTop: 10,
        marginBottom: 10
    },
})

export default TagSection;
