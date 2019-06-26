const qs = require('querystring');

function e(res, {success = false, error = null, data = null, status = 200}) {
  res.statusCode = status;
  res.end(JSON.stringify({
    success,
    error,
    data
  }));
}

function arrayToCSV(array) {
  let th = '"' + Object.keys(array[0]).join('","') + '"\n';
  let td = '';
  array.forEach(o => {
    td += '"' + Object.keys(o).map(k => o[k]).join('","') + '"\n';
  });
  return th + td;
}

function query(req, f) {
  let data = '';
  req
  .on('data', c => data += c)
  .on('end', () => {
    data = qs.parse(data);
    f(data);
  });
}

function matchValue(str, array, prop) {
  let coincidence = false;
  for (let i = 0; i < array.length; i++) {
    if (array[i][prop] == str) {
      coincidence = true;
      break;
    }
  }
  return coincidence;
}

function getUrlVar(req, key) {
  let reg = new RegExp(`\\??&?(${key})=(.+)&?`, 'g').exec(req.url.split('%20').join(' '));
  return reg ? reg[2].split('&')[0] : reg;
}

function weightStr(str) {
  const weights = str.split('').map((letter, i) => {
    return letter.charCodeAt() / (i + 1)**(i + 1);
  });
  const sum = weights.reduce((a, b) => a + b);
  return sum;
}

module.exports = {
  e,
  arrayToCSV,
  query,
  matchValue,
  getUrlVar,
  weightString
}