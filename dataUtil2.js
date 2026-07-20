(function (global) {
  var pad = function (num) {
    return num < 10 ? '0' + num : '' + num;
  };

  function formatDate(date, format) {
    if (date == null) return '';
    if (typeof date === 'number' || typeof date === 'string') {
      date = new Date(date);
    }
    if (!(date instanceof Date) || isNaN(date.getTime())) return '';

    format = format || 'YYYY-MM-DD HH:mm:ss';

    var map = {
      YYYY: date.getFullYear(),
      MM: pad(date.getMonth() + 1),
      DD: pad(date.getDate()),
      HH: pad(date.getHours()),
      mm: pad(date.getMinutes()),
      ss: pad(date.getSeconds())
    };

    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, function (match) {
      return map[match];
    });
  }

  var dataUtil2 = {
    formatDate: formatDate
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = dataUtil2;
  }
  if (typeof global !== 'undefined') {
    global.dataUtil2 = dataUtil2;
  }
})(typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this));
