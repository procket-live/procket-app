import React from 'react';
import { Appbar } from 'react-native-paper';
import { BLACK, BLACK_LIGHT, BLUE } from '../../Theme/colors';

const AppNavbar = () => (
    <Appbar.Header
        style={{ backgroundColor: BLACK, alignItems: 'center', borderBottomColor: BLACK_LIGHT, borderBottomWidth: 1 }}
    >
        <Appbar.Content
            titleStyle={{ color: BLUE, fontWeight: '500', fontSize: 20 }}
            style={{ alignItems: 'center' }}
            title="Game Town"
        />
    </Appbar.Header>
)

export default AppNavbar;
