import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default Home = ({ navigation, props }) => {
  return (
    <View style={styles.container}>
      <Text>Home text</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 30,
  },
});
