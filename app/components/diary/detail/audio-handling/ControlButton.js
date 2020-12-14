import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Edit from '../../../svg/elements/Edit';
import Play from '../../../svg/elements/Play';
import Stop from '../../../svg/elements/Stop';
import Trash from '../../../svg/elements/Trash';

import globalStyles from '../../../../styles';

export default ControlButton = ({ name, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      {name === 'play' && <Play />}
      {name === 'stop' && <Stop />}
      {name === 'edit' && <Edit />}
      {name === 'delete' && <Trash />}
      <Text style={styles.buttonText}>{name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    ...globalStyles.text.compact,
    color: globalStyles.color.white,
    fontSize: 18,
    marginLeft: 10,
    textTransform: 'capitalize',
  },
});
