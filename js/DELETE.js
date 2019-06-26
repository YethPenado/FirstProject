const fs = require('fs');
const {
  e
} = require('./util');
let cars = require('./cars.json');

function DELETE(req, res) {
  if (req.url.indexOf('/api/v1/cars') > -1) {
    let id = +req.url.split('cars/')[1];
    cars.splice(id - 1, 1);
    cars = cars.map((o, i) => {
      o.id = i + 1;
      return o;
    });
    if(cars[id]) {
      fs.writeFile('./cars.json', JSON.stringify(cars), 
      err => { if (err) throw new Error(err) });
      e(res, { success: true, data: cars });
    } else e(res, { error: 'Not ID found', status: 404 });
    
  } else e(res, { error: 'Not resources found', status: 404 });
}

module.exports = DELETE;