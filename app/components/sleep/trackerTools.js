const trackerTools = {
  //Interval for fetching accelerometer data
  acceleroInterval: 300,
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

};

export default trackerTools;
