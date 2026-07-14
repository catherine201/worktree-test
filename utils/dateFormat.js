/**
 * 日期格式化工具
 * 支持占位符: YYYY(年) MM(月) DD(日) HH(时) mm(分) ss(秒) SSS(毫秒)
 * @param {Date|string|number} date - 日期对象/时间戳/日期字符串
 * @param {string} format - 格式模板，默认 'YYYY-MM-DD HH:mm:ss'
 * @returns {string} 格式化后的日期字符串
 */
function formatDate(date, format) {
  format = format || 'YYYY-MM-DD HH:mm:ss';

  var d;
  if (date instanceof Date) {
    d = date;
  } else if (typeof date === 'number') {
    d = new Date(date);
  } else if (typeof date === 'string') {
    d = new Date(date.replace(/-/g, '/'));
  } else {
    return '';
  }

  if (isNaN(d.getTime())) {
    return '';
  }

  var pad = function(n, len) {
    len = len || 2;
    var s = String(n);
    while (s.length < len) {
      s = '0' + s;
    }
    return s;
  };

  var map = {
    'YYYY': d.getFullYear(),
    'MM': pad(d.getMonth() + 1),
    'DD': pad(d.getDate()),
    'HH': pad(d.getHours()),
    'mm': pad(d.getMinutes()),
    'ss': pad(d.getSeconds()),
    'SSS': pad(d.getMilliseconds(), 3)
  };

  var result = format;
  for (var key in map) {
    if (map.hasOwnProperty(key)) {
      result = result.replace(new RegExp(key, 'g'), map[key]);
    }
  }

  return result;
}
