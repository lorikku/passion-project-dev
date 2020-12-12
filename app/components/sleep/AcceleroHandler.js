import * as React from 'react';
import { Accelerometer } from 'expo-sensors';

import { useDispatch } from 'react-redux';
import { addTrackerData } from '../../store/trackerSlice';

import setSelfAdjustingInterval from 'self-adjusting-interval';
import trackerTools from './trackerTools';

//Getting parameters and usable functions for accelerometer loop
const { analyseInterval, acceleroInterval, generateFutureTime } = trackerTools;
//Variables for accelerometer loop
Accelerometer.setUpdateInterval(200);

//COMPONENT
export default AcceleroHandler = ({
  active,
  timer,
  setTimer,
  nextAnalyse,
  setNextAnalyse,
  analyseData,
  setNoDeviation,
}) => {
  //Redux hooks
  const dispatch = useDispatch();

  //Component states
  const [dataX, setDataX] = React.useState(0);
  let start;

  /* VERSION 4 */
  React.useEffect(() => {
    //If tracker is active
    if (active) {
      /*
      Basic JS setTimeout/setInterval or any other types of interval-based-functions/listeners are not reliable in comparison to the actual real-life time
      After a while of running the listeners (based off of an interval), the interval is drifted from the actual time (14:20 on the clock -> 14:14 in the app)
      Because of this, we use an self-adjusting-interval to do the job instead
      */
      const acceleroListener = Accelerometer.addListener((accelerometerData) =>
        setDataX(accelerometerData.x)
      );

      const stopInterval = setSelfAdjustingInterval(() => {
        //When the listener starts, the "start" variable is false
        if (!start) {
          //The "start" variable gets set to true
          start = true;
          //If new tracker instance started => set "nextAnalyse"
          setNextAnalyse(generateFutureTime(analyseInterval));
        }

        //The "timer" variable gets increased by the acceleroInterval (in milliseconds)
        setTimer((prevState) => prevState + acceleroInterval);
      }, acceleroInterval);
      //acceleroListener.remove() and stopInterval() get returned in a cleanup function for React's useEffect. This prevents multiple listeners from stacking
      return () => {
        acceleroListener.remove();
        stopInterval();
      };
    } else {
      //If another analyse was planned, but activeTracker is undefined => tracking got probably cancelled => run one more last analyse
      nextAnalyse && analyseData();
      setNextAnalyse(undefined);
      //If tracker is not active, set "start" (back) to false
      start = false;
      //If tracker is not active, set timer (back) to 0
      setTimer(0);
      //If tracker is not active, set "noDeviation" back to 0
      setNoDeviation(0);
    }
  }, [active]);

  /* useEffect which will dispatch tracker data every time the timer increases
  I did this in a seperate useEffect so that the "timer" wouldn't restart the useEffect containing the listener, thus drifting the time */
  React.useEffect(() => {
    if (active) {
      dispatch(
        addTrackerData({
          data: dataX,
          elapsedTime: timer,
        })
      );

      //Analyse of tracked data gets called once every interval (specified in analyseInterval in trackerTools)
      Date.now() > nextAnalyse && analyseData();
    }
  }, [timer]);

  return null;
};
