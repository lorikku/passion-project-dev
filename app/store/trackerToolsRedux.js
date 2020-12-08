const trackerToolsRedux = {
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

export default trackerToolsRedux;
