import React, { useState } from 'react';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import { EventEmitter } from 'fbemitter';
import { Text } from 'react-native';
import { Accelerometer } from 'expo-sensors';

/* THIS IS NOT USED ANYMORE */

const taskName = 'BACKGROUND_TEST';
const taskEventName = 'BACKGROUND_UPDATE';
const eventEmitter = new EventEmitter();

// Configuring Accelerometer
// Accelerometer.setUpdateInterval(16);
// Accelerometer.addListener((data) => {
//   acceleormeterData = data;
// });

TaskManager.defineTask(taskName, () => {
  let acceleormeterData;
  try {
    const listener = Accelerometer.addListener((data) => {
      acceleormeterData = data;
      const { x, y, z } = data;
      console.log('Data: ' + x + y + z);
      listener.remove();
      return acceleormeterData
        ? BackgroundFetch.Result.NewData
        : BackgroundFetch.Result.NoData;
    });
  } catch (err) {
    console.log(err);
    return BackgroundFetch.Result.Failed;
  }
});

const RegisterBackgroundTask = async () => {
  try {
    await BackgroundFetch.registerTaskAsync(taskName, {
      minimumInterval: 1, // seconds,
    });
    console.log('Task registered');
  } catch (err) {
    console.log('Task Register failed:', err);
  }
};

export default function TaskManagerExample() {
  const [taskData, setTaskData] = useState({ x: 0, y: 0, z: 0 });
  const [eventSubscription, setEventSubscription] = useState(null);
  const [mounted, setMounted] = useState(false);

  if (!mounted) {
    setMounted(true);
    RegisterBackgroundTask();
  }

  // For parsing the data to the DOM
  // useEffect(() => {
  //   const subscription = eventEmitter.addListener(taskEventName, (data) => {
  //     setTaskData(data);
  //   });
  //   setEventSubscription(subscription);

  //   if (eventSubscription) {
  //     return function cleanup() {
  //       eventSubscription.remove();
  //     };
  //   }
  // });

  return (
    <Text>
      x:{taskData.x} y:{taskData.y} z:{taskData.z}
    </Text>
  );
}
