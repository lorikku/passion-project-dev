import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch} from 'react-redux';
import BackIcon from '../../components/svg/elements/BackIcon';
import {addRealityCheck} from '../../store/checkerSlice';
import globalStyles from '../../styles';
import {Picker} from '@react-native-community/picker';

export default RealityCheckInput = ({navigation}) => {
  const [body, setBody] = React.useState('');
  const [freq, setFreq] = React.useState('low');
  const dispatch = useDispatch();

  const onAddRealityCheck = () => {
    if(body !== ''){
      dispatch(
        addRealityCheck({
          body,
          freq,
        })
      );
      setBody('');
      setFreq('');
      navigateBack();
    }
  }

  const navigateBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
          <BackIcon />
        </TouchableOpacity>
        <Text style={styles.subtitle}>Add check</Text>
        <View style={{ opacity: 0 }}>
          <BackIcon />
        </View>
      </View>
      <View style={styles.contentWrapper}>
        <Text/>
        <View>
          <TextInput
            style={styles.inputText}
            placeholder={'Count your fingers '}
            placeholderTextColor={'rgba(216, 216, 216, 0.4)'}
            value={body}
            onChangeText={(text) => setBody(text)}
          />
          <View style={styles.pickerWrapper}>
            <Picker
              style={styles.inputPicker}
              selectedValue={freq}
              onValueChange={(value) => setFreq(value)}
            >
              <Picker.Item label={'Low Frequency'} value={'low'} />
              <Picker.Item label={'Medium Frequency'} value={'medium'} />
              <Picker.Item label={'High Frequency'} value={'high'} />
            </Picker>
            <Text style={styles.pickerDropdown}>v</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.addButton} onPress={onAddRealityCheck}>
          <Text style={styles.addButtonText}>Add reality check</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: globalStyles.color.background,
    ...globalStyles.spacer.safePadding,
    alignItems: 'center',
  },
  headerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  subtitle: {
    ...globalStyles.text.subTitle,
    color: globalStyles.color.white,
    textAlign: "center",
  },
  backButton: {
    marginTop: 20,
    marginLeft: 20
  },
  contentWrapper: {
    flex: 1,
    backgroundColor: globalStyles.color.darkBackground,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    ...globalStyles.text.compact,
    color: globalStyles.color.white,
    fontSize: 22,
    fontWeight: 'bold',
    padding: 10,
    borderBottomColor: globalStyles.color.white,
    borderBottomWidth: 2
  },
  pickerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputPicker: {
    height: 100,
    width: 200,
    color: globalStyles.color.white,
    fontSize: 20
  },
  pickerDropdown: {
    color: globalStyles.color.white,
    ...globalStyles.text.compact,
    fontWeight: 'bold',
    fontSize: 18
  },
  addButton: {
    backgroundColor: globalStyles.color.lightblue,
    flexDirection: 'row',
    alignItems: 'center',

    marginBottom: 30,
    borderRadius: 30,
    paddingHorizontal: 30,
    paddingVertical: 20
  },
  addButtonText:{
    color: globalStyles.color.background,
    ...globalStyles.text.compact,
    fontSize: 18,
    fontWeight: 'bold'
  }
});