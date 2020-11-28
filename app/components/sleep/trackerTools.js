const trackerTools = {
  //Interval for fetching accelerometer data
  acceleroInterval: 300,
  
  //Formatting time
  formatTime: (time) => {
    const hrs = ~~(time / 3600);
    const mins = ~~((time % 3600) / 60);
    const secs = ~~time % 60;

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
