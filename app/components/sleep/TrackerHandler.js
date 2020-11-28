import {Accelerometer} from 'expo-sensors';
import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import globalStyles from '../../styles';
import trackerTools from './trackerTools';

//Getting parameters and usable functions for TIMER loop
const { formatTime, timerInterval } = trackerTools;
const timerVars = {
  start: undefined,
  nextAt: undefined,
}

const { acceleroInterval } = trackerTools;
const acceleroVars = {
  start: undefined,
  nextAt: undefined,
};

//Getting parameters and usable functions for ACCELEROMETER loop

export default TrackerHandler = ({ active }) => {
  const [timer, setTimer] = React.useState(0);
  const [calculatedTimerInterval, setCalculatedTimerInterval] = React.useState(
    timerInterval
  );
  const [calculatedAcceleroInterval, setCalculatedAcceleroInterval] = React.useState(acceleroInterval);
  const date = new Date();


  /* --- TIMER --- */
  //Using react native's effect hook for timer
  React.useEffect(() => {
    //If tracker is active
    if (false) {
      /*
      Basic JS setTimeout/setInterval is not reliable in comparison to the actual real-life time
      After a while of running the setTimeout, the interval is drifted from the actual time (14:20 on the clock -> 14:14 in the app)
      Because of this, I came up with a solution that calculates the drift between 2 setTimeouts, based off of Date.milliseconds , which cancel each other out and removes the drift
      */
      const interval = setTimeout(() => {
        //When the setTimeout starts, the "start" variable is undefined
        if (!timerVars.start) {
          //The "start" variable gets set to current date, so does "nextAt". The "start" variable is here only for debugging purposes, this could be perfectly be achieved using the "nextAt" variable only
          timerVars.start = date.getTime();
          timerVars.nextAt = timerVars.start;
        }
        //The time of nextAt gets increased by the timerInterval (in this case: 1000), which explains to "I expect a new setTimeout at current date (date.getTime()) + the interval (1000)"
        timerVars.nextAt += timerInterval;

        //Here, the "start" variable gets used JUST for debugging purposes, so the amount of drift can be seen in the console (0 meaning no drift)
        // const drift = (date.getTime() - timerVars.start) % timerInterval;
        // console.log(drift);

        //The "timer" variable gets increased by 1
        setTimer(timer + timerInterval / 1000);

        //The "calculatedTimerInterval" state gets changed to the difference between the 'expected' NEXT time setTimeout will run (nextAt) and the current time, which eleminates the drift
        setCalculatedTimerInterval(timerVars.nextAt - date.getTime());
      }, calculatedTimerInterval);
      //clearInterval gets returned as cleanup function for React's useEffect. This prevents different setTimeouts from stacking
      return () => clearInterval(interval);
    } else {
      //If tracker is not active, set timer (back) to 0
      // setTimer(0);
      // //If tracker is not active, set start (back) to 0
      // timerVars.start = undefined;
      // //If tracker is not active, set interval back to standard interval
      // setCalculatedTimerInterval(timerInterval);
    }
  });


  /* --- ACCELEROMETER --- */
  //Using react native's effect hook for ACCELEROMETER
  React.useEffect(() => {
    //If tracker is active
    if (active) {
      Accelerometer.setUpdateInterval(calculatedAcceleroInterval);
      const interval = Accelerometer.addListener((accelerometerData) => {
        if (!acceleroVars.start) {
          acceleroVars.start = date.getTime();
          acceleroVars.nextAt = acceleroVars.start;
        }
        acceleroVars.nextAt += acceleroInterval;

        //For debugging purposes
        // const drift = (date.getTime() - acceleroVars.start) % acceleroInterval;
        // console.log(drift);
        
        setTimer(timer + calculatedAcceleroInterval / 1000);
        setCalculatedAcceleroInterval(acceleroVars.nextAt - date.getTime());
      });
      return () => interval.remove();
    } else {
      //If tracker is not active, set timer (back) to 0
      setTimer(0);
      //If tracker is not active, set start (back) to 0
      acceleroVars.start = undefined;
      //If tracker is not active, set interval back to standard interval
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
