var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', async function(req, res, next) {
  // TODO check response
  const response = await fetch('http://www.boredapi.com/api/activity/')
  const json = await response.json()
  console.log(json)

  var activity = {...(json), 
    accessibility: accessibility(json.accessibility),
    price: price(json.price)
  }

  res.send(activity)
});


// TODO schema checks
function accessibility(source) {
  switch (true) {
    case source > 0.75:
      return 'Low'
    case source > 0.25:
      return 'Medium'
    default:
      return 'High'
      // exception of the value is < 0?
  }
}

function price(source) {
  switch (true) {
    case source < 0:
      // exception?
    case source == 0:
      return 'Free'
    case source <= 0.5:
      return 'Low'
    default:
      return 'High'
  }
}

module.exports = router;
