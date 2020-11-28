import { Platform } from 'react-native';

const globalStyles = {
  color: {
    white: '#E4F0F6',
    yellow: '#FFF627',
    background: '#022234',
  },
  text: {
    title: { fontFamily: 'sfProRoundedBold', fontSize: 80 },
    subTitle: { fontFamily: 'sfProRoundedBold', fontSize: 40, paddingTop: 30 },
    compact: { fontFamily: 'sfProCompactRegular', fontSize: 40 },
    default: { fontFamily: 'sfProRoundedRegular', fontSize: 22 },
  },
  spacer: {
    safePadding: { paddingTop: Platform.OS === 'android' ? 28 : 40 },
  },
};

export default globalStyles;
