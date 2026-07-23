(function (global) {
  function formatThousands(value) {
    if (value === null || value === undefined || value === '') return '';
    var num = Number(value);
    if (isNaN(num)) return '';
    var str = String(num);
    var neg = str.charAt(0) === '-';
    if (neg) str = str.slice(1);
    var dotIndex = str.indexOf('.');
    var intPart = dotIndex === -1 ? str : str.slice(0, dotIndex);
    var decPart = dotIndex === -1 ? '' : str.slice(dotIndex);
    var seg = [];
    var count = 0;
    for (var i = intPart.length - 1; i >= 0; i--) {
      seg.unshift(intPart.charAt(i));
      count++;
      if (count % 3 === 0 && i !== 0) {
        seg.unshift(',');
      }
    }
    return (neg ? '-' : '') + seg.join('') + decPart;
  }

  var numberUtil9 = {
    formatThousands: formatThousands
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = numberUtil9;
  }
  if (typeof global !== 'undefined') {
    global.numberUtil9 = numberUtil9;
  }
})(typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this));
