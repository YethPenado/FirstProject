const http = require('http');
const m = {
  PUT: require('./PUT'),
  POST: require('./POST'),
  GET: require('./GET'),
  DELETE: require('./DELETE')
};
const {
  e
} = require('./util');

http.createServer(server).listen(1234);

function server(req, res){
  if(m[req.method]) {
    m[req.method](req, res);
  } else e(res, {error: 'Method not available'});
};
