import { Platform } from 'react-native';

const globalStyles = {
  color: {
    white: '#E4F0F6',
    background: '#022234',
  },
  text: {
    title: { fontFamily: 'sfProRoundedBold', fontSize: 80 },
    subTitle: { fontFamily: 'sfProRoundedBold', fontSize: 50 },
    default: { fontFamily: 'sfProRoundedRegular', fontSize: 20 },
  },
  spacer: {
    safePadding: { paddingTop: Platform.OS === 'android' ? 28 : 40 },
  },
};

export default globalStyles;
