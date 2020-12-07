import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { Audio } from 'expo-av';

import { useDispatch, useSelector } from 'react-redux';
import { addTrackerData, purgeTrackerData, selectTracker } from '../../store/trackerSlice';

import * as d3 from 'd3';

import globalStyles from '../../styles';
import trackerTools from './trackerTools';

//Getting parameters and usable functions for ACCELEROMETER loop
const {
  analyseInterval,
  acceleroInterval,
  formatTime,
  generateFutureTime,
} = trackerTools;
//Variables for Accelerometer listener
let start;
let nextAt;

//COMPONENT
export default TrackerHandler = ({ active }) => {
  //Redux hooks
  const dispatch = useDispatch();
  const trackerData = useSelector(selectTracker)

  //Accelerometer data pushing and timer handler states
  const [timer, setTimer] = React.useState(0);
  const [calculatedAcceleroInterval, setCalculatedAcceleroInterval] = React.useState(acceleroInterval);

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
  
  /* --- ACCELEROMETER --- */
  //Using react native's effect hook for ACCELEROMETER
  React.useEffect(() => {
    //If tracker is active
    if (active) {
      /*
      Basic JS setTimeout/setInterval or any other types of interval-based-functions/listeners are not reliable in comparison to the actual real-life time
      After a while of running the listeners (based off of an interval), the interval is drifted from the actual time (14:20 on the clock -> 14:14 in the app)
      Because of this, I came up with a solution that calculates the drift between 2 listeners, based off of Date.milliseconds , which cancel each other out and removes the drift
      */
      Accelerometer.setUpdateInterval(calculatedAcceleroInterval);
      const interval = Accelerometer.addListener((accelerometerData) => {
        //When the listener starts, the "start" variable is undefined
        if (!start) {
          //The "start" variable gets set to current date, so does "nextAt". The "start" variable is here only for debugging purposes, this could be perfectly be achieved using the "nextAt" variable only
          start = new Date().getTime();
          setNextAnalyse(generateFutureTime(analyseInterval));
          nextAt = start;
        }
        //The date of nextAt gets increased by the acceleroInterval, which explains to "I expect a new listener at current date + the interval"
        nextAt += acceleroInterval;

        //Here, the "start" variable gets used JUST for debugging purposes, so the amount of drift can be seen in the console (0 meaning no drift)
        // const drift = (date.getTime() - start) % acceleroInterval;
        // console.log(drift);

        //The "timer" variable gets increased by the calculated acceleroInterval (compensating for the drift) (in milliseconds)
        setTimer(timer + calculatedAcceleroInterval);
        dispatch(
          addTrackerData({
            data: accelerometerData.x,
            elapsedTime: timer,
          })
        );

        //Analyse data for every interval
        (new Date().getTime() > nextAnalyse) && analyseData();

        //The "calculatedAcceleroInterval" state gets changed to the difference between the 'expected' NEXT time listener will run (nextAt) AND the current time, which eleminates the drift
        setCalculatedAcceleroInterval(nextAt - new Date().getTime());
      });
      //interval.remove() gets returned in a cleanup function for React's useEffect. This prevents multiple listeners from stacking
      return () => interval.remove();
    } else {
      //If tracker is not active, set timer (back) to 0
      setTimer(0);
      //If tracker is not active, set "start" (back) to 0
      start = undefined;
      //If tracker is not active, set "calculatedAcceleroInterval" back to standard interval
      setCalculatedAcceleroInterval(acceleroInterval);
    }
  }, [active, calculatedAcceleroInterval]);

  return (
    <Text style={[styles.timer, { opacity: active ? 1 : 0.4 }]}>
      {active ? formatTime(timer) : '--:--:--'}
    </Text>
  );
};

const styles = StyleSheet.create({
  timer: {
    ...globalStyles.text.compact,
    color: globalStyles.color.yellow,
    fontSize: 40,
  },
});
