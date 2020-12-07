import * as React from 'react';
import { Accelerometer } from 'expo-sensors';

import {useDispatch} from 'react-redux';
import { addTrackerData } from '../../store/trackerSlice';
import trackerTools from './trackerTools';


//Getting parameters and usable functions for ACCELEROMETER loop
const {
  analyseInterval,
  acceleroInterval,
  generateFutureTime,
} = trackerTools;
//Variables for Accelerometer listener
let start;
let nextAt;

//COMPONENT
export default AcceleroHandler = ({ active, timer, setTimer, nextAnalyse, setNextAnalyse, analyseData}) => {
  //Redux hooks
  const dispatch = useDispatch();

  //Accelerometer data pushing and timer handler states
  const [calculatedAcceleroInterval, setCalculatedAcceleroInterval] = React.useState(acceleroInterval);
  
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
        setTimer(prevState => prevState + calculatedAcceleroInterval);
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

  return null;
};