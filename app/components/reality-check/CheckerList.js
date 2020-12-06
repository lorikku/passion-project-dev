import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView, Switch} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import {toggleRealityCheck} from '../../store/checkerSlice';
import globalStyles from '../../styles';

export default CheckerList = ({navigation, data}) => {
  const dispatch = useDispatch();
  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      {data.map((check) => (
        <View key={check.id} style={styles.container}>
          <View>
            <Text style={styles.headerText}>{check.content.body}</Text>
            <Text style={styles.bodyText}>{`${check.freq} frequency`}</Text>
          </View>
          <Switch 
          value={check.active}
          onValueChange={() => dispatch(toggleRealityCheck(check))}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: { alignItems: 'center' },
  container: {
    backgroundColor: globalStyles.color.blue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',

    marginBottom: 15,
    borderRadius: 30,
    padding: 20,
  },
  headerText: {
    ...globalStyles.text.compact,
    color: globalStyles.color.white,
    fontSize: 20,
    maxWidth: 200,
  },
  bodyText: {
    ...globalStyles.text.default,
    color: globalStyles.color.gray,
    fontSize: 14,
    textTransform: 'capitalize'
  },
});