const trackerTools = {
  //Interval for fetching accelerometer data (in ms)
  acceleroInterval: 500,
  //Interval for analysing data (in ms)
  analyseInterval: 4 /* s */ * 1000 /* ms */ /* equals to 10 seconds */,

  //Analysis movement detection threshold
  movementThreshold: 0.0011, //threshold good enough, accepts even heavy breathing but not the slightest movement
  //movementThreshold: 0.00099, -> threshold too narrow, detects breathing too

  //Formatting time
  formatTime: (time) => {
    const timeSec = time / 1000;
    const hrs = ~~(timeSec / 3600);
    const mins = ~~((timeSec % 3600) / 60);
    const secs = ~~timeSec % 60;

    let res = '';
    if (hrs < 0) {
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
