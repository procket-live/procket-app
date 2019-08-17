import React from 'react';
import { Appbar } from 'react-native-paper';
import { BLACK, BLACK_LIGHT, BLUE } from '../../Theme/colors';

const AppNavbar = () => (
    <Appbar.Header
        style={{ backgroundColor: BLUE, alignItems: 'center' }}
    >
        <Appbar.Content
            titleStyle={{ color: BLACK, fontWeight: '500', fontSize: 20 }}
            style={{ alignItems: 'center' }}
            title="Procket - Mobile Gaming"
        />
    </Appbar.Header>
)

export default AppNavbar;
