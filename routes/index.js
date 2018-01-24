var express = require('express');
var router = express.Router();

const sportsmen = [
    {
        ID: getID(),
        lastName: 'Иванов',
        firstName: 'Иван',
        sportType: 'Велоспорт'
    },
    {
        ID: getID(),
        lastName: 'Петров',
        firstName: 'Петр',
        sportType: 'Бокс'
    },
    {
        ID: getID(),
        lastName: 'Глебов',
        firstName: 'Глеб',
        sportType: 'Конный'
    },
];

function getID() {
    return Math.random().toString(36).substr(2, 9);
}

function findSportsman(id) {
    let sportsmanIndex = -1;
    sportsmen.find(function (element, index) {
        if (element.ID === id) {
            sportsmanIndex = index;
        }
    });

    return sportsmanIndex;
}

router.get('/', function(req, res, next) {
  res.render('index', {
      sportsmen: sportsmen
  });
});

router.get('/add/', function(req, res) {
    res.render('addSportsman');
});

router.post('/add/', function(req, res) {
    const sportsman = req.body;
    sportsmen.push({
        ID: getID(),
        lastName: sportsman.lastName,
        firstName: sportsman.firstName,
        sportType: sportsman.sportType
    });
    res.redirect('/');
});

router.get('/delete/:sportsmanID', function (req, res) {
    const sportsmanID = req.params.sportsmanID;
    const sportsmanIndex = findSportsman(sportsmanID);
    if (sportsmanIndex !== -1) {
        sportsmen.splice(sportsmanIndex, 1);
    }
    res.redirect('/');
});

router.get('/edit/:sportsmanID', function (req, res) {
    const sportsmanID = req.params.sportsmanID;
    const sportsmanIndex = findSportsman(sportsmanID);
    res.render('editSportsman', {
        sportsman: sportsmen[sportsmanIndex],
    });
});

router.post('/edit/:sportsmanID', function (req, res) {
    const sportsman = req.body;
    const sportsmanID = req.params.sportsmanID;
    const sportsmanIndex = findSportsman(sportsmanID);
    sportsmen[sportsmanIndex] = {
        ID: sportsman.ID,
        lastName: sportsman.lastName,
        firstName: sportsman.firstName,
        sportType: sportsman.sportType
    };
    res.redirect('/');
});

module.exports = router;
