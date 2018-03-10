const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//网络请求
function request(action = "", parameters = "", success, method = "GET", header = {}) {
  var url = "http://192.168.1.207:9002/" + action + (method == "GET" ? "?" : "") + parameters;
  console.log(url);
  wx.request({
    url: url,
    data: {},
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: header ? header : "application/json", // 设置请求的 header
    success: function (res) {
      console.log(res);
      success(res);
    },
    fail: function () {
      // fail
    },
    complete: function () {
      // complete
    }
  })
}
function getTimeS(argument) {
  var timeS = argument;
  timeS = timeS.replace(/[年月]/g, '/').replace(/[日]/, '');
  return new Date().getTime() - new Date(timeS).getTime() - 1000; //有一秒的误差  

}
function getTimeText(argument) {
  var timeS = argument;
  var todayT = ''; //  
  var yestodayT = '';
  var timeCha = this.getTimeS(timeS);
  timeS = timeS.slice(11);
  todayT = new Date().getHours() * 60 * 60 * 1000 + new Date().getMinutes() * 60 * 1000 + new Date().getSeconds() * 1000;
  yestodayT = todayT + 24 * 60 * 60 * 1000;
  if (timeCha > yestodayT) {
    return argument.slice(0, 10);
  }
  if (timeCha > todayT && timeCha < yestodayT) {
    return '昨天 ' + timeS.slice(0, 5);
  }
  if (timeCha < todayT) {
    return timeS.slice(0, 2) >= 12 ? '下午' + (timeS.slice(0, 2) == 12 ? 12 : timeS.slice(0, 2) - 12) + timeS.slice(2, 5) : '上午' + timeS.slice(0, 5);
  }

}
module.exports = {
  formatTime: formatTime,
  request: request,
  getTimeText: getTimeText,
  getTimeS: getTimeS,
}
