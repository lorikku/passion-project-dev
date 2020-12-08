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
    const d = new Date();
    const year = d.getFullYear();

    let month = d.getMonth() + 1;
    if (month.toString().length == 1) {
      month = '0' + month;
    }

    let day = d.getDate();
    if (day.toString().length == 1) {
      day = '0' + day;
    }

    let hour = d.getHours();
    if (hour.toString().length == 1) {
      hour = '0' + hour;
    }

    let minutes = d.getMinutes();
    if (minutes.toString().length == 1) {
      minutes = '0' + minutes;
    }

    let seconds = d.getSeconds();
    if (seconds.toString().length == 1) {
      seconds = '0' + seconds;
    }

    const fileName =
      'tracking-' + year + month + day + hour + minutes + seconds;
    return fileName;
  },
};

export default trackerTools;
