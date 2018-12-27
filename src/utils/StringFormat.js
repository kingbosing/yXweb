export function getStringFormat(query, param) {
  console.log(query)
  if (query.length == 0) return this
  // var param = query;
  var s = query
  if (typeof (param) == 'object') {
    for (var key in param) { s = s.replace(new RegExp('\\{' + key + '\\}', 'g'), param[key]) }
    return s
  } else {
    for (var i = 0; i < query.length; i++) { s = s.replace(new RegExp('\\{' + i + '\\}', 'g'), query[i]) }
    return s
  }
}
