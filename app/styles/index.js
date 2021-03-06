import { Platform } from 'react-native';

const globalStyles = {
  color: {
    white: '#E4F0F6',
    yellow: '#FFF627',
    background: '#022234',
    darkBackground: '#001927',
    gray: '#D8D8D8',
    blue: '#0C3953',
    lightblue: "#5BA4CF",
    red: "#CF5B5B"
  },
  text: {
    title: { fontFamily: 'sfProRoundedBold', fontSize: 80 },
    subTitle: { fontFamily: 'sfProRoundedBold', fontSize: 40, marginBottom: Platform.OS === 'ios' ? 10 :  -5},
    compact: { fontFamily: 'sfProCompactRegular' },
    default: { fontFamily: 'sfProRoundedRegular' },
  },
  spacer: {
    safePadding: { paddingTop: Platform.OS === 'android' ? 40 : 65 },
  },
};

export default globalStyles;
