import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Audio } from 'expo-av';

import { useDispatch, useSelector } from 'react-redux';
import { purgeTrackerData, selectTracker } from '../../store/trackerSlice';

import * as d3 from 'd3';

import globalStyles from '../../styles';
import trackerTools from './trackerTools';
import AcceleroHandler from './AcceleroHandler';

//Getting parameters and usable functions for analysing data
const {
  analyseInterval,
  formatTime,
  generateFutureTime,
} = trackerTools;

//COMPONENT
export default TrackerHandler = ({ active }) => {
  //Redux hooks
  const dispatch = useDispatch();
  const trackerData = useSelector(selectTracker)

  //Accelerometer data pushing and timer handler states
  const [timer, setTimer] = React.useState(0);

  //Real-time analysis states
  const [nextAnalyse, setNextAnalyse] = React.useState();
  const [noDeviation, setNoDeviation] = React.useState(0);
  const [playbackObject, setPlaybackObject] = React.useState();

  const analyseData = () => {
    //Copy to-be-purged" aka current state to "data"
    const data = trackerData.data;
    //Purge the current state
    dispatch(purgeTrackerData());

    //Analyse the copied state
    const filteredData = data.map(obj => obj.data);

    if(d3.deviation(filteredData) < 0.0009) {
      setNoDeviation(prevState => prevState + 1);
    } else {
      console.log('deviation :(', d3.deviation(filteredData))
    }

    //Set next interval for analysing
    setNextAnalyse(generateFutureTime(analyseInterval));
  };

  //Handler on 'noDeviation' change
  React.useEffect(() => {
    console.log('no deviation :o', '#' + noDeviation);

    if(noDeviation === 3) {
      playbackObject.playAsync();
    }

  }, [noDeviation])

  //Loading audio object
  React.useEffect(() => {
    const fetchAudioAsync = async () => {
      const res = await Audio.Sound.createAsync(
        { uri: 'https://freesound.org/data/previews/547/547162_1973065-lq.ogg'},
        { shouldPlay: false }
      );
      setPlaybackObject(() => res.sound);
    }
    fetchAudioAsync();
  }, []);
  

  return (
    <>
      <Text style={[styles.timer, { opacity: active ? 1 : 0.4 }]}>
        {active ? formatTime(timer) : '--:--:--'}
      </Text>
      <AcceleroHandler active={active} timer={timer} setTimer={setTimer} nextAnalyse={nextAnalyse} setNextAnalyse={setNextAnalyse} analyseData={analyseData}/>
    </>
  );
};

const styles = StyleSheet.create({
  timer: {
    ...globalStyles.text.compact,
    color: globalStyles.color.yellow,
    fontSize: 40,
  },
});
