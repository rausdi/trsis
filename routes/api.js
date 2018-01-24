var express = require('express');
var router = express.Router();

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

// GET: Получить список спортсменов
router.get('/sportsmen', (req, res) => {
    res.json(JSON.stringify(sportsmen));
});

// GET: Получить спортсмена по ID
router.get('/sportsmen/:ID', (req, res) => {
    const sportsmanID = req.params.ID;
    const sportsmanIndex = findSportsman(sportsmanID);
    res.json(JSON.stringify(sportsmen[sportsmanIndex]));
});

// POST: Добавление нового спортсмена
router.post('/sportsmen/add', (req, res) => {
    const body = req.body;
    const sportsman = {
        ID: getID(),
        lastName: body.lastName,
        firstName: body.firstName,
        sportType: body.sportType
    };
    sportsmen.push(sportsman);
    res.json(JSON.stringify(sportsmen));
});

// GET: Удаление спортсмена по ID
router.get('sportsmen/delete/:ID', (req, res) => {
    const sportsmanID = req.params.ID;
    const sportsmanIndex = findSportsman(sportsmanID);
    if (sportsmanIndex !== -1) {
        sportsmen.splice(sportsmanIndex, 1);
    }
    res.json(JSON.stringify(sportsmen));
});

// POST: Редактирование информации о спортсмене
router.post('/sportsmen/edit/:ID', (req, res) => {
    const sportsman = req.body;
    const sportsmanID = req.params.ID;
    const sportsmanIndex = findSportsman(sportsmanID);
    sportsmen[sportsmanIndex] = {
        ID: sportsman.ID,
        lastName: sportsman.lastName,
        firstName: sportsman.firstName,
        sportType: sportsman.sportType
    };
    res.json(JSON.stringify(sportsmen));
});

module.exports = router;
