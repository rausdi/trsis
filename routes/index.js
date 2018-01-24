var express = require('express');
var router = express.Router();

const sportsmen = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Add a sportsman',
      sportsmen: sportsmen
  });
});

router.post('/', function(req, res) {
  const sportsman = req.body;
  sportsmen.push({
      ID: Math.random().toString(36).substr(2, 9),
      lastName: sportsman.lastName,
      firstName: sportsman.firstName,
      sportType: sportsman.sportType
  });
  res.render('index', {
    title: 'Data added',
    sportsmen: sportsmen
  })
});

module.exports = router;
