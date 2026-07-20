function formatThousands(num) {
  if (num === null || num === undefined || isNaN(num)) {
    return '';
  }
  var parts = String(num).split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

module.exports = formatThousands;
