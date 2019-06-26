const brands = require('./brands.json');
const cars = require('./cars.json');
const itemsPage = 10;
const {
  e,
  arrayToCSV,
  getUrlVar,
  weightString
} = require('./util');

function GET(req, res) {
  if(req.url === '/api/v1/brands') {
    e(res, {success: true, data: brands});
  } else if(req.url === '/api/v1/cars/report') {
    res.setHeader('Content-Type', 'text/csv');
    res.end(arrayToCSV(brands));

  } else if(req.url.indexOf('/api/v1/cars') > -1) {
    const search = getUrlVar(req, 'search');
    const sortBy = getUrlVar(req, 'sortBy');
    const page = getUrlVar(req, 'page');
    let paginatedCars = []
      .concat(cars)
      .splice((Math.abs(page ? +page : 0) - 1) * itemsPage, itemsPage);
    if(search) {
      let array = [];
      paginatedCars.forEach(obj => {
        for(const key in obj) {
          if((obj[key] + '').toLowerCase()
          .indexOf(search.toLowerCase()) > -1) {
            return array.push(obj);
          }
        }
      });
      paginatedCars = array;
    }
    if(paginatedCars[0][sortBy]) {
      paginatedCars =
      paginatedCars.sort((a, b) => 
        weightString(a[sortBy] + '') - weightString(b[sortBy] + ''));
    }
    e(res, {success: true, data: paginatedCars});
  } else {
    e(res, {error: 'Brands not found', status: 404});
  }
}

module.exports = GET;
