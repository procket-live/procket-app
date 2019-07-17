import { DefaultTheme } from 'react-native-paper';
import { BLACK_LIGHT, YELLOW, BLACK, RED, TEXT_PRIMARY, CLAY, TEXT_SECONDARY } from './colors';

const theme = {
  ...DefaultTheme,
  colors: {
    background: BLACK,
    surface: BLACK_LIGHT,
    accent: YELLOW,
    error: RED,
    text: TEXT_PRIMARY,
    disabled: CLAY,
    placeholder: TEXT_SECONDARY,
    backdrop: CLAY,
    primary: '#fff',
  },
};

export default theme;