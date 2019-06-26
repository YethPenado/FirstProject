const brands = require('./brands.json');
const cars = require('./cars.json');
const fs = require('fs');
const {
  e,
  query,
  matchValue
} = require('./util');

function PUT(req, res) {
  if (req.url.indexOf('/api/v1/cars') > -1) {
    let id = +req.url.split('cars/')[1];

    query(req, data => {
      let d = new Date();
      let obj = {
        id,
        name: data.name,
        brandid: +data.brandid,
        year: data.year,
        color: data.color,
        description: data.description ? data.description : null,
        date: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
      }
      if (obj.name && obj.brandid && obj.year && obj.color) {
        let isCoincidence = matchValue(obj.brandid, brands, 'id');
        if (isCoincidence && cars[id - 1]) {
          cars.splice(id - 1, 1, obj);
          fs.writeFile('./cars.json', JSON.stringify(cars), 
          err => { if (err) throw new Error(err) });
          e(res, { success: true, data: obj });
        } else {
          e(res, { status: 500, error: 'There is no such brandID registered' });
        }
      } else {
        e(res, { status: 500, error: 'obj.name && obj.brandid && obj.year && obj.color are required' });
      }
    });
  } else e(res, { error: 'Endpoint not found', status: 404 });
}

module.exports = PUT;
