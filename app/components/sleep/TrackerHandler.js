import {Accelerometer} from 'expo-sensors';
import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import globalStyles from '../../styles';
import trackerTools from './trackerTools';

//Getting parameters and usable functions for ACCELEROMETER loop
const { formatTime, acceleroInterval } = trackerTools;
let start;
let nextAt;

export default TrackerHandler = ({ active }) => {
  const [timer, setTimer] = React.useState(0);
  const [calculatedAcceleroInterval, setCalculatedAcceleroInterval] = React.useState(acceleroInterval);
  const date = new Date();

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
          start = date.getTime();
          nextAt = start;
        }
        //The date of nextAt gets increased by the acceleroInterval, which explains to "I expect a new listener at current date + the interval"
        nextAt += acceleroInterval;

        //Here, the "start" variable gets used JUST for debugging purposes, so the amount of drift can be seen in the console (0 meaning no drift)
        // const drift = (date.getTime() - start) % acceleroInterval;
        // console.log(drift);
        
        //The "timer" variable gets increased by the calculated acceleroInterval (compensating for the drift) (in milliseconds)
        setTimer(timer + calculatedAcceleroInterval);
        console.log({
          data: accelerometerData,
          timespan: timer
        })

        //The "calculatedAcceleroInterval" state gets changed to the difference between the 'expected' NEXT time listener will run (nextAt) AND the current time, which eleminates the drift
        setCalculatedAcceleroInterval(nextAt - date.getTime());
      });
      //interval.remove() gets returned as cleanup function for React's useEffect. This prevents different listeners from stacking
      return () => interval.remove();
    } else {
      //If tracker is not active, set timer (back) to 0
      setTimer(0);
      //If tracker is not active, set "start" (back) to 0
      start = undefined;
      //If tracker is not active, set "calculatedAcceleroInterval" back to standard interval
      setCalculatedAcceleroInterval(acceleroInterval);
    }
  });


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
  },
});
