const {
  e,
  query,
  matchValue
} = require('./util');
const brands = require('./brands.json');
const cars = require('./cars.json');
const fs = require('fs');

function POST(req, res) {
  if (req.url === '/api/v1/brands') {
    query(req, data => {
      let obj = {
        Brand: data.Brand,
        id: brands.length + 1,
        Description: data.description ? data.description : null
      }
      if (obj.Brand) {
        let isCoincidence = matchValue(obj.Brand, brands, 'Brand');
        if (!isCoincidence) {
          brands.push(obj);
          fs.writeFile('./brands.json', JSON.stringify(brands), 
          err => { if (err) throw new Error(err) });
          e(res, { success: true, data: obj });
        }
        else e(res, { status: 500, error: 'Brand already exists' });
      } else {
        e(res, { status: 500, error: 'Brand is required' });
      }
    });
    
  } else if (req.url === '/api/v1/cars') {
    query(req, data => {
      let d = new Date();
      let obj = {
        id: cars.length + 1,
        name: data.name,
        brandid: +data.brandid,
        year: data.year,
        color: data.color,
        description: data.description ? data.description : null,
        date: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
      }
      if (obj.name && obj.brandid && obj.year && obj.color) {
        let isCoincidence = matchValue(obj.brandid, brands, 'id');
        if(isCoincidence) {
          cars.push(obj);
          fs.writeFile('./cars.json', JSON.stringify(cars), err => { if (err) throw new Error(err) });
          e(res, { success: true, data: obj });
        } else {
          e(res, { status: 500, error: 'There is no such brandID registered' });
        }
      } else {
        e(res, { status: 500, error: 'obj.name && obj.brandid && obj.year && obj.color are required'});
      }
    });
  } else e(res, { error: 'Brands not found', status: 404 });
}

module.exports = POST;
