import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Audio } from 'expo-av';

import { useDispatch, useSelector } from 'react-redux';
import { purgeTrackerData, selectTracker } from '../../store/trackerSlice';
import {
  addAnalysisDataToEntry,
  reportRemToEntry,
} from '../../store/diarySlice';

import { deviation as calcDeviation } from 'd3';

import globalStyles from '../../styles';
import trackerTools from './trackerTools';
import AcceleroHandler from './AcceleroHandler';

//Getting parameters and usable functions for analysing data
const {
  analyseInterval,
  movementThreshold,
  deviationAmount,
  formatTime,
  generateFutureTime,
} = trackerTools;

//COMPONENT
export default TrackerHandler = ({ active }) => {
  //Redux hooks
  const dispatch = useDispatch();
  const tracker = useSelector(selectTracker);

  //Accelerometer data pushing and timer handler states
  const [timer, setTimer] = React.useState(0);

  //Real-time analysis states
  const [noDeviation, setNoDeviation] = React.useState(0);
  const [nextAnalyse, setNextAnalyse] = React.useState(undefined);
  const [playbackObject, setPlaybackObject] = React.useState(undefined);

  //Analyse data function
  const analyseData = () => {
    ///1. Copy "to-be-purged" aka current acceleroData to "trackerData"
    const trackerData = tracker.acceleroData;

    ///2. Purge the current state
    dispatch(purgeTrackerData());

    ///3. Analyse the copied state
    //Filter all data values from data array
    const mappedData = trackerData.map((obj) => obj.data);

    //If movement deviation has been deteceted in the last amount of "analyseInterval", increment state
    const analysisDeviation = calcDeviation(mappedData);

    if (analysisDeviation) {
      //Add analysis data to diary entry for generating graph later on
      const analysisElapsedTime =
        trackerData[trackerData.length - 1].elapsedTime;
      dispatch(
        addAnalysisDataToEntry({
          elapsedTime: analysisElapsedTime,
          deviation: analysisDeviation,
        })
      );

      if (analysisDeviation < movementThreshold) {
        setNoDeviation((prevState) => prevState + 1);
      } else {
        console.log('movement detected :(', analysisDeviation);
        setNoDeviation(0);
      }
    }

    //Set next interval for analysing
    setNextAnalyse(generateFutureTime(analyseInterval));
  };

  //Handler on 'noDeviation' change
  React.useEffect(() => {
    switch (noDeviation) {
      case 0:
        break;

      case deviationAmount: //Amount of "noDeviations" required before assuming user is in a REM state
        console.log(
          'PERSON IS DEFINETELY PARALYZED -> REM PHASE! #' + noDeviation
        );
        // playbackObject.playFromPositionAsync(0);
        setNoDeviation(0);
        dispatch(reportRemToEntry(tracker.activeTracker));
        break;

      default:
        console.log('no, if barely any movement detected :o #' + noDeviation);
        break;
    }
  }, [noDeviation]);

  //Loading audio object
  React.useEffect(() => {
    if (!playbackObject) {
      const fetchAudioAsync = async () => {
        const res = await Audio.Sound.createAsync(
          require('../../assets/audio/sample.mp3'),
          { shouldPlay: false }
        );
        setPlaybackObject(res.sound);
      };
      fetchAudioAsync();
    }

    return () =>
      playbackObject &&
      playbackObject.unloadAsync().then(setPlaybackObject(undefined));
  }, []);

  //Timer component and accelerohandler which returns nothing
  return (
    <>
      <Text style={[styles.timer, { opacity: active ? 1 : 0.4 }]}>
        {active ? formatTime(timer) : '--:--:--'}
      </Text>
      <AcceleroHandler
        active={active}
        timer={timer}
        setTimer={setTimer}
        nextAnalyse={nextAnalyse}
        setNextAnalyse={setNextAnalyse}
        analyseData={analyseData}
        setNoDeviation={setNoDeviation}
      />
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
