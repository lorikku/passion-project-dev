import * as React from 'react';
import { Alert, Dimensions, StyleSheet, Text, View } from 'react-native';
import {
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native-gesture-handler';

import { useDispatch } from 'react-redux';
import {
  deleteRealityCheckAsync,
  toggleRealityCheckAsync,
} from '../../store/checkerSlice';

import globalStyles from '../../styles';

export default CheckerList = ({ data }) => {
  const dispatch = useDispatch();

  const handleDeletion = (check) => {
    Alert.alert(
      'Delete Check?',
      'Are you sure you want to delete this reality check?',
      [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: () => dispatch(deleteRealityCheckAsync(check)),
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.listContainer}>
      {data.map((check) => (
        <TouchableOpacity
          key={check.id}
          onLongPress={() => handleDeletion(check)}
        >
          <View style={styles.container}>
            <View>
              <Text style={styles.headerText}>{check.content.body}</Text>
              <Text style={styles.bodyText}>{`${check.freq} frequency`}</Text>
            </View>
            <Switch
              value={check.active}
              onValueChange={() => dispatch(toggleRealityCheckAsync(check))}
            />
          </View>
        </TouchableOpacity>
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
    width: Dimensions.get('window').width - 50,

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
    textTransform: 'capitalize',
  },
});
