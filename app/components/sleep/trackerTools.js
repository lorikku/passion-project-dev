const trackerTools = {
  //Interval for fetching accelerometer data (in ms)
  acceleroInterval: 500,
  //Interval for analysing data (in ms)
  // analyseInterval:  6 /* m */ * 60 /* s */ * 1000 /* ms */, // equals to 6 minutes 
  analyseInterval:  3 /* m */ * 1 /* s */ * 1000 /* ms */, // equals to 3 seconds -> for debugging 

  //Analysis movement detection threshold
  movementThreshold: 0.0020, 
  // movementThreshold: 0.00105, //threshold too narrow
  // movementThreshold: 0.00095, //-> threshold too narrow, detects breathing too

  // deviationAmount: 5, //Amount of "noDeviations" required before assuming user is in a REM state
  deviationAmount: 3, //Amount of "noDeviations" required before assuming user is in a REM state -> for debugging

  //Formatting time
  formatTime: (time) => {
    const timeSec = time / 1000;
    const hrs = ~~(timeSec / 3600);
    const mins = ~~((timeSec % 3600) / 60);
    const secs = ~~timeSec % 60;

    let res = '';
    if (hrs > 0) {
      res += '0' + hrs + ':' + (mins < 10 ? '0' : '');
    }
    res += '' + mins + ':' + (secs < 10 ? '0' : '');
    res += '' + secs;
    return res;
  },

  generateFutureTime: (analyseInterval) => {
    let date = new Date();
    date.setTime(date.getTime() + analyseInterval);
    return date.getTime();
  },

  generateFileName: () => {
    const date = new Date();
    const fileName = 'tracking_' + date.getTime();
    return fileName;
  },
};

export default trackerTools;
